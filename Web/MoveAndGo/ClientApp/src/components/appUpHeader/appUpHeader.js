import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './appUpHeader.scss';
import noAvatar from '../../img/profile-no-photo.png';
import getRequest from '../../services/getRequest';

export default function AppUpHeader() {
  const [data, setData] = useState(null);

  useEffect(() => avatarUser(), []);

  const onSuccess = (data) => {
    setData(data);
    console.log(data);
  }

  const avatarUser = () => {
    getRequest('/api/account/currentuser')
      .then(onSuccess)
  }

  const exit = () => {
    getRequest('/api/account/logout')
      .then(() => {
        localStorage.clear();
        document.location.href = '/';
      })
  }

  return (
    <header className="appUpHeader">
      <Link to='/' className='appUpHeader-title'>{"Move&GO"}</Link>
      <input type='text' className='appUpHeader-input' placeholder='Search' />
      <div className='appUpHeader__menu'>
        <NavLink to='/' className='appUpHeader__menu-link'><i className="fas fa-home appUpHeader__menu-link"></i></NavLink>
        <NavLink to='/add' className='appUpHeader__menu-link'><i className="far fa-plus-square appUpHeader__menu-link"></i></NavLink>
        {
          localStorage.getItem('nickname') === 'admin' ?
            <NavLink to='/complaints' className='appUpHeader__menu-link'><i className="fas fa-flag appUpHeader__menu-link"></i></NavLink> :
            null
        }
        <NavLink to='/profile' className='appUpHeader__menu-link'><img src={data?.avatar ?? noAvatar} alt="photo_user" className='appUpHeader__menu-photo' /></NavLink>
        <i onClick={() => exit()} className="fas fa-sign-out-alt appUpHeader__menu-link"></i>
      </div>
    </header>
  );
}