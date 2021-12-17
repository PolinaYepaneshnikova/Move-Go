import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './appUpHeader.scss';
import noAvatar from '../../img/profile-no-photo.png';
import getRequest from '../../services/getRequest';


const AppUpHeader = () => {
    const [data, setData] = useState(null);

    const onSuccess = (data) => {
        setData(data);
    }

    const avatarUser = () => {
        getRequest('/api/account/currentuser')
            .then(onSuccess)
    }

    useEffect(() => avatarUser(), [avatarUser]);

    const exit = () => {
        getRequest('/api/account/logout')
            .then(() => {
                localStorage.clear();
                document.location.href = '/';
            })
    }

    const onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        getRequest(`/api/Search/Users?${new URLSearchParams(data)}`)
            .then(user => {
                document.location.href = `/profile/${user[0].userName}`;
            })
            .catch(() => window.alert("No such user found!"));
    }

    return (
        <header className="appUpHeader">
            <Link to='/' className='appUpHeader-title'>{"Move&GO"}</Link>
            <form onSubmit={onsubmit} className="appUpHeader-form">
                <input type='text' name="keyWords" className='appUpHeader-input' placeholder='Search user...' />
                <button className="appUpHeader-btn"><i className="fas fa-search"></i></button>
            </form>
            <div className='appUpHeader__menu'>
                <NavLink to='/' className='appUpHeader__menu-link'><i
                    className="fas fa-home appUpHeader__menu-link"></i></NavLink>
                <NavLink to='/add' className='appUpHeader__menu-link'><i
                    className="far fa-plus-square appUpHeader__menu-link"></i></NavLink>
                {
                    localStorage.getItem('nickname') === 'admin' ?
                        <NavLink to='/complaints' className='appUpHeader__menu-link'><i
                            className="fas fa-flag appUpHeader__menu-link"></i></NavLink> :
                        null
                }
                <NavLink to={`/profile/${data?.userName}`} className='appUpHeader__menu-link'><img
                    src={data?.avatar ?? noAvatar} alt="photo_user" className='appUpHeader__menu-photo' /></NavLink>
                <i onClick={() => exit()} className="fas fa-sign-out-alt appUpHeader__menu-link"></i>
            </div>
        </header>
    );
}

export default AppUpHeader;