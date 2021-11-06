import React, { useState } from "react";
import './profilePage.scss';
import { Link } from "react-router-dom";
import avatar from '../../img/profile-no-photo.png';

export default function ProfilePage() {
  const [active, setActive] = useState(1);

  const tabItem = [
    {
      id: 1,
      title: 'Posts',
      content: 1
    },
    {
      id: 2,
      title: 'Saved',
      content: 2
    }
  ];

  const content = tabItem.map(({ id, content }) => {
    return active === id ? content : null;
  });

  const tabs = tabItem.map(({ id, title }) => {
    let className = active === id ? 'profile__posts-tabItem active' : 'profile__posts-tabItem';
    return (
      <span
        key={id}
        title={title}
        className={className}
        onClick={() => setActive(id)}
      >
        {title}
      </span>
    );
  })

  return (
    <div className='profile'>
      <div className='profile__person'>
        <div className='profile__person-photo'>
          <img src={avatar} alt="avatar" className='profile__person-photo__avatar' />
        </div>
        <div className='profile__person-info'>
          <div className='profile__person-info__nickname'>
            <span className='profile__person-info__nickname-nick'>{localStorage.getItem('nickname')}</span>
            <Link to='/edit' className='profile__person-info__nickname-edit'>Edit Profile</Link>
          </div>
          <div className='profile__person-info__count'>
            <span className='profile__person-info__count-span'>0 posts</span>
            <span className='profile__person-info__count-span'>0 followers</span>
            <span className='profile__person-info__count-span'>0 following</span>
          </div>
        </div>
      </div>
      <div className='profile__posts'>
        <div className='profile__posts-tabs'>
          {tabs}
        </div>
        <ul className='profile__posts-content'>
          {content}
        </ul>
      </div>
    </div>
  );
}