import React from 'react';
import './skeleton.scss';

const Skeleton = () => {
  return (
    <li className='skeleton'>
      <div className='pulse skeleton-title'></div>
      <div className='pulse skeleton-video'></div>
      <div className='pulse skeleton__btns'></div>
      <div className='pulse skeleton__filter'></div>
      <div className='pulse skeleton-desc'></div>
      <div className='pulse skeleton__info'></div>
    </li>
  );
}

export default Skeleton;