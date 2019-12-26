import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { GameContainer } from './containers';
import configureStore from './store';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <GameContainer />
  </Provider>,
  document.getElementById('root')
);
