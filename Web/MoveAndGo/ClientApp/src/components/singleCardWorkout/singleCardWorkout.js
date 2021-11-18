import React, { useState, useEffect } from 'react';
import noAvatar from '../../img/profile-no-photo.png';
import { Link, useParams } from 'react-router-dom';
import '../cardWorkout/cardWorkout.scss';
import getRequest from '../../services/getRequest';
import deleteRequest from '../../services/deleteRequest';

const SingleCardWorkout = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => complaintCard(), [id]);

  const onSuccess = (data) => {
    setData(data);
  }

  const complaintCard = () => {
    getRequest(`/api/workout/get1/${id}`)
      .then(onSuccess);
  }

  const deletePost = (id) => {
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

  return (
    <div className='card'>
      <h2 className='card-title'>{data?.title}</h2>
      <video className='card-video' controls="controls" width='inherit' height='300px'>
        <source src={data?.video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
      </video>
      <div className='card__btns'>
        <i className="far fa-star card__btns-btn"></i>
        <i
          onClick={() => deletePost(data?.id)}
          className="far fa-trash-alt card__btns-btn"></i>
      </div>
      <div className='card__filter'>
        <span className='card__filter-span'>Type: {data?.typeId}</span>
        <span className='card__filter-span'>Level: {data?.intensity}</span>
      </div>
      <p className='card-desc'>{data?.text}</p>
      <div className='card__info'>
        <Link to={`/profile/${data?.author}`} className='card__info-link'><img className='card__info-img' src={data?.authorAvatar ?? noAvatar} alt="avatar" /> <span className='card__info-nickname'>{data?.author}</span></Link>
        <span className='card__info-time'>{new Date(data?.datetime).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default SingleCardWorkout;