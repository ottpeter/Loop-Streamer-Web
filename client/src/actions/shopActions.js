import { INIT, SELECT, SET_PAYMENT_STATUS, SET_EMAIL, SET_EMAIL_AGAIN, SET_USERDATA_ERROR, SET_USERNAME, SET_PASSWORD, SET_PASSWORD_AGAIN } from './actionNames';
// Server URL is stored in .env
// With REACT_APP_ prefix we don't need dotenv, because we use create-react-app
//require('dotenv').config();

// Load products to Redux store
export const init = () => ({
  type: INIT
});

// Select a product
export const selectProduct = (id) => ({
  type: SELECT,
  payload: { id }
});

// Set payment status
export const setStatus = (status, success) => ({
  type: SET_PAYMENT_STATUS,
  payload: { status, success }
});

// Set e-mail
export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: { email }
});

// Set e-mail again
export const setEmailAgain = (email_again) => ({
  type: SET_EMAIL_AGAIN,
  payload: { email_again }
});

// Set username
export const setUsername = (username) => ({
  type: SET_USERNAME,
  payload: { username }
});

// Set password
export const setPassword = (password) => ({
  type: SET_PASSWORD,
  payload: { password }
});

// Set password-again
export const setPasswordAgain = (password_again) => ({
  type: SET_PASSWORD_AGAIN,
  payload: { password_again }
});

// Set userdata_error
export const setUserError = (isError) => ({
  type: SET_USERDATA_ERROR,
  payload: { isError }
});

// Create new user account (non-admin user)
export const createAccount = (email, username, password) => async (dispatch) => {
  try {
      // Send API request here
      // We should test if username exist before sending API request.
      // Send out API request
      console.log(process.env.REACT_APP_SERVER_PORT)
      const reqBody = { 
        username: username, 
        email: email, 
        password: password
      }
      const response = await fetch(process.env.REACT_APP_SERVER_URL + ":" + process.env.REACT_APP_SERVER_PORT + "/users/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(reqBody)
      });
      // Analyze the response
      const parseRes = await response.json();
      console.log(parseRes);
  } catch (err) {
      console.error(err.message);
  }
}