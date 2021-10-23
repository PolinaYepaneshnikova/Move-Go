//style
import './style.scss';
import 'bootstrap/dist/css/bootstrap.css';
//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//Component
import App from './components/app/app';

ReactDOM.render(
  <BrowserRouter basename={document.getElementsByTagName('base')[0].getAttribute('href')}>
    <App />
  </BrowserRouter>,
  document.getElementById('wrapper'));

