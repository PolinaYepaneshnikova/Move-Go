import React, { useState, useEffect } from "react";
import './profilePage.scss';
import { Link, useParams } from "react-router-dom";
import noAvatar from '../../img/profile-no-photo.png';
import getRequest from '../../services/getRequest';

export default function ProfilePage() {
  const [active, setActive] = useState(1);
  const [data, setData] = useState(null);
  const { nickname } = useParams();

  useEffect(() => currentData(), [nickname]);

  const onSuccess = (data) => {
    setData(data);
  }

  const currentData = () => {
    getRequest(`/api/account/getuser/${nickname}`)
      .then(onSuccess)
  }

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
          <img src={data?.avatar ?? noAvatar} alt="avatar" className='profile__person-photo__avatar' />
        </div>
        <div className='profile__person-info'>
          <div className='profile__person-info__nickname'>
            <span className='profile__person-info__nickname-nick'>{data?.userName}</span>
            {
              localStorage.getItem('nickname') == nickname ?
                <Link to='/edit' className='profile__person-info__nickname-edit'>Edit Profile</Link> :
                null
            }
          </div>
          <div className='profile__person-info__count'>
            <span className='profile__person-info__count-span'>0 posts</span>
            <span className='profile__person-info__count-span'>0 followers</span>
            <span className='profile__person-info__count-span'>0 following</span>
          </div>
          <span className='profile__person-info__fullName'>{data?.fullName ?? ""}</span>
          <div className='profile__person-info__emailNumber'>
            <span className='profile__person-info__emailNumber-email'>{data?.email}</span>
            <span className='profile__person-info__emailNumber-number'>{data?.phoneNumber ?? ""}</span>
          </div>
          <span className='profile__person-info__bio'>{data?.biographi ?? ""}</span>
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