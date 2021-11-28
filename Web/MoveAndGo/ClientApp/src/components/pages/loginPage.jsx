import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import postRequest from '../../services/postRequest';
import { ErrorMessage, LoadingMessage, SuccessMessage } from "../messages";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const onSuccess = (data) => {
    setSuccess(true);
    setLoading(false);
    localStorage.setItem('logged', true);
    localStorage.setItem('nickname', data.userName);
    document.location.href = '/';
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    onLoading();
    postRequest('/api/account/login', data)
      .then(onSuccess)
      .catch(onError)
      .finally(event.target.reset())
  }

  const onShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  }

  const onReset = () => {
    setError(false);
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const loadingMessage = loading ? <LoadingMessage /> : null;
  const result = !(loading || error) && success ? <SuccessMessage /> : null;

  return (
    <div className="form-body">
      <form className="form" onSubmit={onSubmit}>
        <h1 className="form-title">Log in</h1>
        {errorMessage}
        {loadingMessage}
        {result}
        <div className="form-block">
          <span className="form-label">Nickname</span>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type="text"
            name="nickname"
            tabIndex="1"
            required
          />
        </div>
        <div className="form-block">
          <div className="form-forget">
            <span className="form-label">Password</span>
            <Link tabIndex="2" className="form-forget-link" to="/login">Forget password?</Link>
          </div>
          <input
            minLength="4"
            maxLength="32"
            className="form-input"
            type={showPassword ? "text" : "password"}
            name="password"
            tabIndex="3"
            required
          />
          <div className="form-check">
            <input tabIndex="4" type="checkbox" onClick={onShowPassword} className="form-check-input" />
            <span className="form-check-title">Show password</span>
          </div>
        </div>
        <button onClick={onReset} className="form-btn" tabIndex="5">Log In</button>
        <p className="form-signup"><span className="form-signup-title">Don't have account?</span> <Link tabIndex="6" className="form-signup-link" to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default LoginPage;