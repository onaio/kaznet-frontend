// Main index file
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import registerServiceWorker from "./registerServiceWorker";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { ConnectedRouter } from "connected-react-router";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import * as reducers from "./store/reducers";
export const history = createBrowserHistory();

const options = {
  position: "top right",
  timeout: 5000,
  offset: "30px",
  transition: "scale"
};

const store = createStore(
  connectRouter(history)(combineReducers(reducers)),
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
  document.getElementById("kaznet-root")
);

registerServiceWorker();
