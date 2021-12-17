import React from 'react';
import { Link } from 'react-router-dom';

import { userComplaint, adminDeletePost, blockUser, favoriteCard } from "./cardArticleFunc";

import noAvatar from '../../img/profile-no-photo.png';

export default function CardArticle({ article }) {
  const renderItem = (arr) => {
    const items = arr.map(item => {
      return (
        <li className='card' key={item.id}>
          <h2 className='card-title'>{item?.title}</h2>
          <img className='card-video' src={item?.image} alt={item?.title} />
          <div className='card__btns'>
            <i
              className="far fa-star card__btns-btn"
              onClick={() => favoriteCard(item.id)}
            ></i>
            {
              localStorage.getItem('nickname') !== 'admin' ?
                <i
                  onClick={() => userComplaint(item.id)}
                  className="far fa-flag card__btns-btn"></i> :
                <>
                  <i
                    onClick={() => adminDeletePost(item.id)}
                    className="far fa-trash-alt card__btns-btn"></i>
                  <i
                    onClick={() => blockUser(item?.author)}
                    className="fas fa-user-lock card__btns-btn"></i>
                </>
            }
          </div>
          <div className='card__filter'>
            <span className='card__filter-span'>Type: {item?.typeId}</span>
          </div>
          <p className='card-desc'>{item?.text}</p>
          <div className='card__info'>
            <Link to={`/profile/${item?.author}`} className='card__info-link'><img
              className='card__info-img' src={item?.authorAvatar ?? noAvatar} alt="avatar" /> <span
                className='card__info-nickname'>{item?.author}</span></Link>
            <span className='card__info-time'>{new Date(item?.datetime).toLocaleString()}</span>
          </div>
        </li>
      );
    });
    return items;
  }

  const items = renderItem(article);
  return (
    <>
      {items}
    </>
  );
}