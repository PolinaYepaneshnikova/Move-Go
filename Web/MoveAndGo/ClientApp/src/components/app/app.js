import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartPage from '../startPage/startPage';
import LoginPage from '../loginPage/loginPage';
import HomePage from '../homePage/homePage';
import RegistrationPage from '../registrationPage/registrationPage';
import './app.scss';

const App = () => {
  return (
    <Router>
      <div className='app'>
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;