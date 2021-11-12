import React, { useState, useEffect } from 'react';
import './complaintPage.scss';
import getRequest from '../../services/getRequest';

export default function ComplaintPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    complaintData();
  }, []);

  const onSuccess = (data) => {
    setData(data);
  }

  const complaintData = () => {
    getRequest("/api/admin/getadminnotifications")
      .then(onSuccess);
  }

  return (
    <div className='complaint'>
      <ul className='complaint__list'>
        {
          data.map(item => {
            return (
              <li className='complaint__list-item' key={item?.id}>
                <span className='complaint__list-item__text'><b>URL</b></span>
                <a href={`/api${item?.itemLink}`} className='complaint__list-item__link'>{`https://localhost:5001/api${item?.itemLink}`}</a>
                <span className='complaint__list-item__text'><b>Text</b></span>
                <span className='complaint__list-item__text'>{item?.text ?? ""}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}