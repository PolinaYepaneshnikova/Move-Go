import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './appUpHeader.scss';
import avatar from '../../img/profile-no-photo.png';

export default function AppUpHeader() {
  return (
    <header className="appUpHeader">
      <Link to='/' className='appUpHeader-title'>{"Move&GO"}</Link>
      <input type='text' className='appUpHeader-input' placeholder='Search' />
      <ul className='appUpHeader__menu'>
        <NavLink to='/' className='appUpHeader__menu-link'><i className="fas fa-home appUpHeader__menu-link"></i></NavLink>
        <NavLink to='/add' className='appUpHeader__menu-link'><i className="fas fa-plus-square appUpHeader__menu-link"></i></NavLink>
        <NavLink to='/profile' className='appUpHeader__menu-link'><img src={avatar} alt="photo_user" className='appUpHeader__menu-photo' /></NavLink>
      </ul>
    </header>
  );
}