import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import shopReducer from './reducers/shopReducer';
import boardReducer from './reducers/boardReducer';
import {  } from './actions/shopActions';
import {  } from './actions/boardActions';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';

// Combining the reducers
const reducer = combineReducers({
  shop: shopReducer,
  board: boardReducer
});

// This is for the Redux Dev Tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Creating the Redux store (with dev tools)
let store = createStore(reducer, /* preloadedState, */ composeEnhancers( applyMiddleware(thunk)));

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
