import React, { useState, useEffect } from 'react';
import './cardWorkout.scss';
import { Link } from 'react-router-dom';
import Error from '../error/error';
import getRequest from '../../services/getRequest';
import Skeleton from '../skeleton/skeleton';
import noAvatar from '../../img/profile-no-photo.png';
import postRequest from '../../services/postRequest';
import deleteRequest from '../../services/deleteRequest';

export default function CardWorkout() {
  const [dataWorkout, setDataWorkout] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateWorkout();
  }, []);

  const onLoadedData = (data) => {
    setDataWorkout(data);
    setLoading(false);
  }

  const onError = () => {
    setError(true);
    setLoading(false);
  }

  const onLoading = () => {
    setLoading(true);
  }

  const updateWorkout = () => {
    onLoading();
    getRequest('/api/workout/get')
      .then(onLoadedData)
      .catch(onError);
  }

  const userComplaint = (id) => {
    let ask = window.confirm('Do you want to report this post?');
    if (ask) {
      let complaint = prompt('What is the reason for the complaint?', '');
      let data = { itemLink: `/workout/${id}`, text: complaint };
      postRequest("/api/admin/complain", data)
        .then(() => alert('Your complaint has been sent for consideration by the administration!'))
        .catch(() => alert('Sorry, there was an error submitting your complaint!'))
    }
    else {
      alert("Post complaint has been canceled!");
    }
  }

  const adminDeletePost = (id) => {
    let ask = window.confirm('Are you sure you want to delete the post?');
    if (ask) {
      let data = { link: `/workout/${id}` };
      deleteRequest("/api/admin/delete", data)
        .then(() => {
          alert('The post has been successfully deleted!');
          document.location.href = '/';
        })
        .catch(() => alert('An error has occurred!'));
    }
    else {
      alert("Post deletion has been canceled!");
    }
  }

  const renderItem = (arr) => {
    const items = arr.map(item => {
      return (
        <li className='card' key={item.id}>
          <h2 className='card-title'>{item?.title}</h2>
          <video className='card-video' controls="controls" width='inherit' height='300px'>
            <source src={item?.video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
          </video>
          <div className='card__btns'>
            <i className="far fa-star card__btns-btn"></i>
            {
              localStorage.getItem('nickname') !== 'admin' ?
                <i
                  onClick={() => userComplaint(item.id)}
                  className="far fa-flag card__btns-btn"></i> :
                null
            }
            {
              localStorage.getItem('nickname') === 'admin' ?
                <i
                  onClick={() => adminDeletePost(item.id)}
                  className="far fa-trash-alt card__btns-btn"></i> :
                null
            }
          </div>
          <div className='card__filter'>
            <span className='card__filter-span'>Type: {item?.typeId}</span>
            <span className='card__filter-span'>Level: {item?.intensity}</span>
          </div>
          <p className='card-desc'>{item?.text}</p>
          <div className='card__info'>
            <Link to='/' className='card__info-link'><img className='card__info-img' src={item?.authorAvatar ?? noAvatar} alt="avatar" /> <span className='card__info-nickname'>{item?.author}</span></Link>
            <span className='card__info-time'>{new Date(item?.datetime).toLocaleString()}</span>
          </div>
        </li>
      );
    });
    return items;
  }

  const items = renderItem(dataWorkout);
  const errorMessage = error ? <Error /> : null;
  const loadingMessage = loading ? <Skeleton /> : null;
  const content = !(loading || errorMessage) ? items : null;
  return (
    <>
      {errorMessage}
      {loadingMessage}
      {content}
    </>
  );
}