import React from 'react';
import './cardWorkout.scss';
import { Link } from 'react-router-dom';

export default function CardWorkout({
  title,
  video,
  type,
  level,
  desc,
  user,
  data
}) {
  return (
    <li className='card'>
      <h2 className='card-title'>{title}</h2>
      <video className='card-video'>
        <source src={video} />
      </video>
      <div className='card__btns'>
        <i className="far fa-star card__btns-btn"></i>
        <i className="far fa-flag card__btns-btn"></i>
      </div>
      <div className='card__filter'>
        <span className='card__filter-span'>Type: {type}</span>
        <span className='card__filter-span'>Level: {level}</span>
      </div>
      <p className='card-desc'>{desc}</p>
      <div className='card__info'>
        <Link to='/' className='card__info-link'><img className='card__info-img' src={user} alt="avatar" /></Link>
        <span className='card__info-time'>{data}</span>
      </div>
    </li>
  );
}