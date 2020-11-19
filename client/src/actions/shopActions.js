import { INIT, SELECT, SET_PAYMENT_STATUS, SET_EMAIL, SET_EMAIL_AGAIN } from './actionNames';

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