import React, { Component } from 'react';
import postRequest from '../../services/postRequest';
import Success from '../success/success';
import Loading from '../loading/loading';
import Error from '../error/error';
import './registrationLoginPage.scss';
import { Redirect } from 'react-router-dom';

export default class RegistrationPage extends Component {
  state = {
    success: false,
    error: false,
    loading: false
  }

  onSuccess = () => {
    this.setState({
      success: true,
      loading: false
    });
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    });
  }

  onLoading = () => {
    this.setState({
      loading: true
    });
  }

  onReset = () => {
    this.setState({
      error: false
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    this.onLoading();
    postRequest('/api/account/registration', data)
      .then(this.onSuccess)
      .catch(this.onError)
      .finally(event.target.reset())
  }

  render() {
    const { success, error, loading } = this.state;
    const errorMessage = error ? <Error /> : null;
    const loadingMessage = loading ? <Loading /> : null;
    const successMessage = success ? <Redirect from='/signup' to='/login' /> : null;
    const result = !(loading || error) ? successMessage : null;
    return (
      <div className="form-body">
        <form className="form" onSubmit={this.onSubmit}>
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
          <button onClick={this.onReset} className="form-btn" tabIndex="6">Sign Up</button>
          <p className="form-signup"><span className="form-signup-title">Do have account?</span> <a className="form-signup-link" href="/login">Log In</a></p>
        </form>
      </div>
    );
  }
}