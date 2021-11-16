import React, { useState, useEffect } from 'react';
import './addWorkoutPage.scss';
import getRequest from '../../services/getRequest';

export default function AddWorkout() {
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
    <div className="addWorkoutForm-body">
      <form className="addWorkoutForm" encType="multipart/form-data" accesskeymethod="Post" action="/api/workout/post" method="post">
        <h1 className="addWorkoutForm-title">Workout</h1>
        <div className="addWorkoutForm-block">
          <span className="addWorkoutForm-label">Title</span>
          <input
            minLength="4"
            maxLength="32"
            className="addWorkoutForm-input"
            type="text"
            name="title"
            tabIndex="1"
            required
          />
        </div>
        <div className="addWorkoutForm-block">
          <span className="addWorkoutForm-label ">Video</span>
          <input
            className="addWorkoutForm-input addWorkoutForm-video"
            type="file"
            name="video"
            tabIndex="2"
            required
          />
        </div>
        <div className="addWorkoutForm-block">
          <span className="addWorkoutForm-label">Type</span>
          <input
            className='addWorkoutForm-input'
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
        <div className="addWorkoutForm-block">
          <span className="addWorkoutForm-label">Level</span>
          <select
            name="level"
            className="addWorkoutForm-input"
            tabIndex="4"
            required
          >
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </select>
        </div>
        <div className="addWorkoutForm-block">
          <span className="addWorkoutForm-label">Description</span>
          <textarea
            minLength="4"
            maxLength="200"
            className="addWorkoutForm-input addWorkoutForm-textarea"
            type="text"
            name="description"
            tabIndex="5"
            required
          ></textarea>
        </div>
        <button className="addWorkoutForm-btn" tabIndex="6">Submit</button>
      </form>
    </div>
  );
}