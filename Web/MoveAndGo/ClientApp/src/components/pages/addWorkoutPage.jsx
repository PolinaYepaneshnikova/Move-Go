import React, { useState, useEffect } from 'react';

import getRequest from '../../services/getRequest';

const AddWorkoutPage = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => typesWorkout(), []);

  const onSuccess = (data) => {
    setTypes(data);
  }

  const typesWorkout = () => {
    getRequest('/api/workout/getposttypes')
      .then(onSuccess);
  }

  return (
    <div className="form-body">
      <form className="form" encType="multipart/form-data" accesskeymethod="Post" action="/api/workout/post" method="post">
        <h1 className="form-title">Workout</h1>
        <div className="form-block">
          <span className="form-label">Title</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="text"
            name="title"
            tabIndex="1"
            required
          />
        </div>
        <div className="form-block">
          <span className="form-label ">Video</span>
          <input
            className="form-input form-video"
            type="file"
            name="video"
            tabIndex="2"
            required
          />
        </div>
        <div className="form-block">
          <span className="form-label">Type</span>
          <input
            className='form-input'
            type='text'
            list='types'
            name='type'
            tabIndex='3'
            required
          />
          <datalist
            id='types'
          >
            {
              types.map((item, i) => {
                return (
                  <option key={i} value={item?.type ?? ""}>{item?.type ?? ""}</option>
                );
              })
            }
          </datalist>
        </div>
        <div className="form-block">
          <span className="form-label">Level</span>
          <select
            name="level"
            className="form-input"
            tabIndex="4"
            required
          >
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>
        </div>
        <div className="form-block">
          <span className="form-label">Description</span>
          <textarea
            minLength="4"
            maxLength="200"
            className="form-input form-textarea"
            type="text"
            name="description"
            tabIndex="5"
            required
          ></textarea>
        </div>
        <button className="form-btn" tabIndex="6">Submit</button>
      </form>
    </div>
  );
}

export default AddWorkoutPage;