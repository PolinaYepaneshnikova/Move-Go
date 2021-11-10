import React from 'react';
import './complaintPage.scss';

export default function ComplaintPage() {
  return (
    <div className='complaint'>
      <ul className='complaint__list'>
        <li className='complaint__list-item'>
          <span className='complaint__list-item__text'><b>URL</b></span>
          <a href='/complaints' className='complaint__list-item__link'>https://localhost:44346/complaints</a>
          <span className='complaint__list-item__text'><b>Text</b></span>
          <span className='complaint__list-item__text'>disgusting content</span>
        </li>
        <li className='complaint__list-item'>
          <span className='complaint__list-item__text'><b>URL</b></span>
          <a href='/complaints' className='complaint__list-item__link'>https://localhost:44346/complaints</a>
          <span className='complaint__list-item__text'><b>Text</b></span>
          <span className='complaint__list-item__text'>disgusting content</span>
        </li>
        <li className='complaint__list-item'>
          <span className='complaint__list-item__text'><b>URL</b></span>
          <a href='/complaints' className='complaint__list-item__link'>https://localhost:44346/complaints</a>
          <span className='complaint__list-item__text'><b>Text</b></span>
          <span className='complaint__list-item__text'>disgusting content</span>
        </li>
      </ul>
    </div>
  );
}