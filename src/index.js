import 'babel-polyfill';
import 'font-awesome/css/font-awesome.css';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import store from './store';
import Routes from './routes';
import './styles/defaults.base.styles';

ReactDOM.render(
  <Routes store={store} history={browserHistory} />,
  document.getElementById('root'),
);
