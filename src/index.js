/* eslint-disable react/jsx-filename-extension */
// Main index file
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import * as reducers from './store/reducers';

// eslint-disable-next-line import/prefer-default-export
export const history = createBrowserHistory();

const options = {
  position: 'top right',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
};

const store = createStore(
  connectRouter(history)(combineReducers(reducers)),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, routerMiddleware(history))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('kaznet-root')
);

registerServiceWorker();
