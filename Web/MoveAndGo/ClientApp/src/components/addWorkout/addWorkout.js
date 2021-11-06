import React from 'react';
import './addWorkoutPage.scss';

export default function AddWorkout() {
  return (
    <div className="addWorkoutForm-body">
      <form className="addWorkoutForm">
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
            minLength="4"
            maxLength="32"
            className="addWorkoutForm-input"
            type="email"
            name="type"
            tabIndex="3"
            required
          />
        </div>
        <div className="addWorkoutForm-block">
          <span className="addWorkoutForm-label">Level</span>
          <input
            minLength="4"
            maxLength="32"
            className="addWorkoutForm-input"
            type="text"
            name="level"
            tabIndex="4"
            required
          />
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