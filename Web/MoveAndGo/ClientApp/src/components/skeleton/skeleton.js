import React from 'react';
import './skeleton.scss';

export default function Skeleton() {
  return (
    <li className='skeleton'>
      <div className='pulse skeleton-title'></div>
      <div className='pulse skeleton-video'></div>
      <div className='pulse skeleton__btns'></div>
      <div className='pulse skeleton__filter'></div>
      <div className='pulse skeleton-desc'></div>
      <div className='pulseskeleton__info'></div>
    </li>
  );
}