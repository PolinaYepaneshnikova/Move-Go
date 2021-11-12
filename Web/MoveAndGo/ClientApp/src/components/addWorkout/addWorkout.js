import React, { useState } from 'react';
import './addWorkoutPage.scss';
import formRequest from '../../services/formRequest';
import Error from '../error/error';
import Loading from '../loading/loading';
import Success from '../success/success';

export default function AddWorkout() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
    setLoading(false);
  }

  const onLoading = () => {
    setLoading(true);
  }

  const onSuccess = () => {
    setSuccess(true);
    setLoading(false);
    document.location.href = '/';
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    onLoading();
    formRequest('/api/workout', data)
      .then(onSuccess)
      .catch(onError);
  }

  const errorMessage = error ? <Error /> : null;
  const loadingMessage = loading ? <Loading /> : null;
  const result = !(loading || error) && success ? <Success /> : null;

  return (
    <div className="addWorkoutForm-body">
      <form className="addWorkoutForm" encType="multipart/form-data" accesskeymethod="Post" action="/api/workout" method="post">
        <h1 className="addWorkoutForm-title">Workout</h1>
        {errorMessage}
        {loadingMessage}
        {result}
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
            type="text"
            name="type"
            tabIndex="3"
            required
          />
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