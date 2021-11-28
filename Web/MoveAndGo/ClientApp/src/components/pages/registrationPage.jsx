import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import postRequest from '../../services/postRequest';
import { ErrorMessage, LoadingMessage, SuccessMessage } from "../messages";

const RegistrationPage = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSuccess = () => {
    setSuccess(true);
    setLoading(false);
    document.location.href = '/login';
  }

  const onError = () => {
    setError(true);
    setLoading(false);
  }

  const onLoading = () => {
    setLoading(true);
  }

  const onReset = () => {
    setError(false);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    onLoading();
    postRequest('/api/account/registration', data)
      .then(onSuccess)
      .catch(onError)
      .finally(event.target.reset())
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingMessage = loading ? <LoadingMessage /> : null;
  const result = !(loading || error) && success ? <SuccessMessage /> : null;
  return (
    <div className="form-body">
      <form className="form" onSubmit={onSubmit}>
        <h1 className="form-title">Sign Up</h1>
        {errorMessage}
        {loadingMessage}
        {result}
        <div className="form-block">
          <span className="form-label">Fullname</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="text"
            name="fullname"
            tabIndex="1"
            required
          />
        </div>
        <div className="form-block">
          <span className="form-label">Nickname</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="text"
            name="nickname"
            tabIndex="2"
            required
          />
        </div>
        <div className="form-block">
          <span className="form-label">Email</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="email"
            name="email"
            tabIndex="3"
            required
          />
        </div>
        <div className="form-block">
          <span className="form-label">Password</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="text"
            name="password"
            tabIndex="4"
            required
          />
        </div>
        <div className="form-block">
          <span className="form-label">Confirm Password</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="text"
            name="confirmpassword"
            tabIndex="5"
            required
          />
        </div>
        <button onClick={onReset} className="form-btn" tabIndex="6">Sign Up</button>
        <p className="form-signup"><span className="form-signup-title">Do have account?</span> <Link className="form-signup-link" to="/login">Log In</Link></p>
      </form>
    </div>
  );
}

export default RegistrationPage;