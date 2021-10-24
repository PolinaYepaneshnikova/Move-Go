import React, { Component } from 'react';
import './registrationLoginPage.scss';

export default class LoginPage extends Component {
  state = {
    showPassword: false
  }

  onShowPassword = () => {
    this.setState(({ showPassword }) => ({
      showPassword: !showPassword
    }));
  }

  render() {
    const { showPassword } = this.state;
    return (
      <div className="form-body">
        <form className="form">
          <h1 className="form-title">Log in</h1>
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
          <button className="form-btn" tabIndex="5">Log In</button>
          <p className="form-signup"><span className="form-signup-title">Don't have account?</span> <a tabIndex="6" className="form-signup-link" href="/signup">Sign Up</a></p>
        </form>
      </div>
    );
  }
}