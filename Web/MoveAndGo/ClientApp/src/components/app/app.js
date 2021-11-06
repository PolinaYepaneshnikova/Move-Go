import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartPage from '../startPage/startPage';
import LoginPage from '../loginPage/loginPage';
import HomePage from '../homePage/homePage';
import AddPage from '../addPage/addPage';
import AddWorkout from '../addWorkout/addWorkout';
import RegistrationPage from '../registrationPage/registrationPage';
import './app.scss';
import AppUpHeader from '../appUpHeader/appUpHeader';
import ProfilePage from '../profilePage/profilePage';

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
            <AddWorkout />
          </Route>
          <Route exact path='/profile'>
            <ProfilePage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;