import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from '../layout/layout';
import HomePage from '../homePage/homePage';
import LoginPage from '../loginPage/loginPage';
import RegistrationPage from '../registrationPage/registrationPage';

export default class App extends Component {

  render() {
    return (
      <Layout>
        <Route exact path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={RegistrationPage} />
      </Layout>
    );
  }
}
