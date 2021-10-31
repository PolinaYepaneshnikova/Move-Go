import React, { useState, useEffect } from 'react';
import './cardWorkout.scss';
import { Link } from 'react-router-dom';
import Error from '../error/error';
import getRequest from '../../services/getRequest';
import Skeleton from '../skeleton/skeleton';

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
    getRequest('/api/workout')
      .then(onLoadedData)
      .catch(onError);
  }

  const renderItem = (arr) => {
    const items = arr.map(item => {
      const { id, title, video, typeId, intensity, text, author, authorAvatar } = item;
      return (
        <li className='card' key={id}>
          <h2 className='card-title'>{title}</h2>
          <video className='card-video' controls="controls" width='inherit' height='300px'>
            <source src={`/api/media/video/${video}`} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
          </video>
          <div className='card__btns'>
            <i className="far fa-star card__btns-btn"></i>
            <i className="far fa-flag card__btns-btn"></i>
          </div>
          <div className='card__filter'>
            <span className='card__filter-span'>Type: {typeId}</span>
            <span className='card__filter-span'>Level: {intensity}</span>
          </div>
          <p className='card-desc'>{text}</p>
          <div className='card__info'>
            <Link to='/' className='card__info-link'><img className='card__info-img' src={`/api/media/avatar/${authorAvatar}`} alt="avatar" /> <span className='card__info-nickname'>{author}</span></Link>
            <span className='card__info-time'>{new Date().toLocaleString()}</span>
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