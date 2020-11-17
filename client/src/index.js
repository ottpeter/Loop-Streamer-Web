import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { INIT } from './actions/actions';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';

const initialState = {
  init: null,
  isLoggedIn: false,
  serverError: false,
  username: "_not_set_",
}

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        init: "init"
      };

      default:
        return state;
  }
}

let store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
