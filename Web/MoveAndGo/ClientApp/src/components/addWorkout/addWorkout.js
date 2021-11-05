import React from 'react';

export default function AddWorkout() {
  return (
    <div className="form-body">
      <form className="form">
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
            className="form-input"
            type="file"
            name="video"
            tabIndex="2"
            style={{ border: 'none' }}
            required
          />
        </div>
        <div className="form-block">
          <span className="form-label">Type</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="email"
            name="type"
            tabIndex="3"
            required
          />
        </div>
        <div className="form-block">
          <span className="form-label">Level</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="text"
            name="level"
            tabIndex="4"
            required
          />
        </div>
        <div className="form-block">
          <span className="form-label">Description</span>
          <textarea
            minLength="4"
            maxLength="200"
            className="form-input"
            type="text"
            name="description"
            tabIndex="5"
            style={{ resize: 'none', height: '100px' }}
            required
          ></textarea>
        </div>
        <button className="form-btn" tabIndex="6">Submit</button>
      </form>
    </div>
  );
}