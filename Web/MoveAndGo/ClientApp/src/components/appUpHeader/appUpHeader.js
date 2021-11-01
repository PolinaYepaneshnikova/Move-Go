import React from 'react';
import { Link } from 'react-router-dom';
import './appUpHeader.scss';
import avatar from '../../img/profile-no-photo.png';

export default function AppUpHeader() {
  return (
    <header className="appUpHeader">
      <Link to='/' className='appUpHeader-title'>{"Move&GO"}</Link>
      <div className='appUpHeader__block'>
        <input type='text' className='appUpHeader__block-input' placeholder='Search' />
        <Link to='/' className='appUpHeader__block-link'><img src={avatar} alt="photo_user" className='appUpHeader__block-photo' /></Link>
      </div>
    </header>
  );
}