import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './app.scss';

import AppUpHeader from '../appUpHeader/appUpHeader';
import {
  AddPage,
  ComplaintPage,
  EditPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegistrationPage,
  SingleCardWorkoutPage,
  StartPage,
  AddWorkoutPage
} from "../pages";

const App = () => {
  return (
    <Router>
      {localStorage.getItem('logged') ? <AppUpHeader /> : null}
      <main className='app'>
        <Switch>
          <Route exact path='/'>
            {localStorage.getItem('logged') ? <HomePage /> : <StartPage />}
          </Route>
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <Route exact path='/signup'>
            <RegistrationPage />
          </Route>
          <Route exact path='/add'>
            <AddPage />
          </Route>
          <Route exact path='/addWorkout'>
            <AddWorkoutPage />
          </Route>
          <Route exact path='/edit'>
            <EditPage />
          </Route>
          <Route exact path='/profile/:nickname'>
            <ProfilePage />
          </Route>
          <Route exact path='/complaints'>
            <ComplaintPage />
          </Route>
          <Route exact path='/workout/:id'>
            <SingleCardWorkoutPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;