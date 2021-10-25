import React, { Component } from 'react';
import postRequest from '../../services/postRequest';
import Error from '../error/error';
import Success from '../success/success';
import Loading from '../loading/loading';
import './registrationLoginPage.scss';
import { Redirect } from 'react-router-dom';

export default class LoginPage extends Component {
  state = {
    showPassword: false,
    success: false,
    error: false,
    loading: false
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

  onSuccess = () => {
    this.setState({
      success: true,
      loading: false
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    this.onLoading();
    postRequest('/api/account/login', data)
      .then(this.onSuccess)
      .catch(this.onError)
      .finally(event.target.reset())
  }

  onShowPassword = () => {
    this.setState(({ showPassword }) => ({
      showPassword: !showPassword
    }));
  }

  onReset = () => {
    this.setState({
      error: false,
      success: false
    });
  }

  render() {
    const { showPassword, error, success, loading } = this.state;
    const errorMessage = error ? <Error /> : null;
    const loadingMessage = loading ? <Loading /> : null;
    const successMessage = success ? <Redirect from='/login' to='/home' /> : null;
    const result = !(loading || error) ? successMessage : null;
    return (
      <div className="form-body">
        <form className="form" onSubmit={this.onSubmit}>
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
              <a tabIndex="2" className="form-forget-link" href="#">Forget password?</a>
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
              <input tabIndex="4" type="checkbox" onClick={this.onShowPassword} className="form-check-input" />
              <span className="form-check-title">Show password</span>
            </div>
          </div>
          <button onClick={this.onReset} className="form-btn" tabIndex="5">Log In</button>
          <p className="form-signup"><span className="form-signup-title">Don't have account?</span> <a tabIndex="6" className="form-signup-link" href="/signup">Sign Up</a></p>
        </form>
      </div>
    );
  }
}