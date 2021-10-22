import React, { Component } from 'react';
import { Route } from 'react-router';
import HomePage from '../homePage/homePage';
import LoginPage from '../loginPage/loginPage';
import RegistrationPage from '../registrationPage/registrationPage';

import './app.scss'

export default class App extends Component {

  render() {
    return (
      <main className="app">
        <Route exact path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/registration' component={RegistrationPage} />
      </main>
    );
  }
}
