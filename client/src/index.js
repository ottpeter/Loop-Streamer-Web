import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import shopReducer from './reducers/shopReducer';
import boardReducer from './reducers/boardReducer';
import {  } from './actions/shopActions';
import {  } from './actions/boardActions';
import thunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';


const reducer = combineReducers({
  shop: shopReducer,
  board: boardReducer
});

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
