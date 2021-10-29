import React from 'react';
import './cardWorkout.scss';
import { Link } from 'react-router-dom';
import avatar from '../../img/profile-no-photo.png';

export default function CardWorkout() {
  return (
    <div className='card'>
      <h2 className='card-title'>Title</h2>
      <video className='card-video'>
        <source src="" />
      </video>
      <div className='card__btns'>
        <i className="far fa-star card__btns-btn"></i>
        <i className="far fa-flag card__btns-btn"></i>
      </div>
      <div className='card__filter'>
        <span className='card__filter-span'>Type: workout</span>
        <span className='card__filter-span'>Level: hard</span>
      </div>
      <p className='card-desc'>Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World</p>
      <div className='card__info'>
        <Link to='/' className='card__info-link'><img className='card__info-img' src={avatar} alt="avatar" /></Link>
        <span className='card__info-time'>2021-10-29</span>
      </div>
    </div>
  );
}