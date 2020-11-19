import { INIT, SELECT, SET_PAYMENT_STATUS, SET_EMAIL, SET_EMAIL_AGAIN } from '../actions/actionNames';

const initialState = {
  init: null,
  serverError: false,
  paymentSuccessful: false,
  paymentStatus: null,
  selectedProduct: null,
  email: null,
  email_again: null,
  products: [],
}

const shopReducer = function (state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        init: "init",
        products: require('../products.json').products,
      };

    case SELECT:
      return {
        ...state,
        selectedProduct: action.payload.id
      };

    case SET_PAYMENT_STATUS:
      return {
        ...state,
        paymentSuccessful: action.payload.success,
        paymentStatus: action.payload.status
      };

    case SET_EMAIL:
      return {
        ...state,
        email: action.payload.email
      };

    case SET_EMAIL_AGAIN:
      return {
        ...state,
        email_again: action.payload.email_again
      }

      default:
        return state;
  }
}

export default shopReducer;