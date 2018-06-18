import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { ConnectedRouter } from 'connected-react-router';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import * as reducers from './store/reducers';

export const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(combineReducers(reducers)),
  applyMiddleware(
    thunk,
    routerMiddleware(history),
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('kaznet-root')
);

registerServiceWorker();