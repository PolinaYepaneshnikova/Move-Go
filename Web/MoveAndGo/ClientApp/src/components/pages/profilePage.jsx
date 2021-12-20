import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SavedCard from "../savedCard/savedCard";
import { followUser, blockUser } from "../user/user";
import noAvatar from '../../img/profile-no-photo.png';

import getRequest from '../../services/getRequest';

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const [data, setData] = useState(null);
  const { nickname } = useParams();
  const [workout, setWorkout] = useState([]);
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getWorkoutsUser();
    getArticlessUser();
  }, [])

  const onSuccess = (data) => {
    setData(data);
  }

  const currentData = () => {
    getRequest(`/api/account/getuser/${nickname}`)
      .then(onSuccess)
  }

  const getWorkoutsUser = () => {
    getRequest("/api/article/get")
      .then(res => {
        setArticle(res);
        console.log(res);
      })
  }

  const getArticlessUser = () => {
    getRequest("/api/workout/get")
      .then(res => {
        setWorkout(res);
        console.log(res);
      })
  }

  useEffect(() => {
    currentData();
  }, [nickname, currentData]);

  const tabItem = [
    {
      id: 1,
      title: 'Posts',
      content: workout.length === 0 && article.length === 0 ?
        <div key={1}>You have no posts.</div> :
        <div key={1} style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", padding: "30px 10px" }}>
          {
            workout.map(item => {
              if (item?.author === nickname) {
                return (
                  <div className='card' key={item.id}>
                    <video className='card-video' controls="controls" width='inherit' height='300px'>
                      <source src={item?.video} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
                    </video>
                  </div>
                )
              }
            })
          }
          {
            article.map(item => {
              if (item?.author === nickname) {
                return (
                  <div className='card' key={item.id}>
                    <img src={item?.image} alt={item?.author} className='card-video' />
                  </div>
                )
              }
            })
          }
        </div>
    },
    {
      id: 2,
      title: 'Saved',
      content: <SavedCard nickname={nickname} key={2} />
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
              localStorage.getItem('nickname') === nickname ?
                <Link to='/edit' className='profile__person-info__nickname-edit'>Edit Profile</Link> :
                <span
                  onClick={() => followUser(data?.userName)}
                  className='profile__person-info__nickname-edit'>Follow</span>
            }
            {
              localStorage.getItem("nickname") === "admin" ?
                !data?.isBlocked ?
                  <span
                    onClick={() => blockUser(data?.userName)}
                    className='profile__person-info__nickname-edit'>Block</span> :
                  <span
                    style={{ "color": "red" }}
                    onClick={() => blockUser(data?.userName)}
                    className='profile__person-info__nickname-edit'>Unblock</span> :
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

export default ProfilePage;