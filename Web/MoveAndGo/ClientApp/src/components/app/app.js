import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StartPage from '../startPage/startPage';
import LoginPage from '../loginPage/loginPage';
import HomePage from '../homePage/homePage';
import RegistrationPage from '../registrationPage/registrationPage';
import './app.scss';
import video from '../../img/profile-no-photo.png';

const App = () => {
  const data = [
    { id: 1, title: 'Hello', video, isStar: false, isFlag: false, type: 'workout', level: 'Hard', desc: 'Hello World', user: video, data: '2021-10-29' },
    { id: 2, title: 'Hello', video, isStar: false, isFlag: false, type: 'workout', level: 'Hard', desc: 'Hello World', user: video, data: '2021-10-29' },
    { id: 3, title: 'Hello', video, isStar: false, isFlag: false, type: 'workout', level: 'Hard', desc: 'Hello World', user: video, data: '2021-10-29' }
  ];
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            {localStorage.getItem('logged') ? <HomePage data={data} /> : <StartPage />}
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