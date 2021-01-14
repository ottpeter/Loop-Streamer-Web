import { INIT, SELECT, SET_PAYMENT_STATUS, SET_EMAIL, SET_EMAIL_AGAIN, SET_USERDATA_ERROR, SET_USERNAME, SET_PASSWORD, SET_PASSWORD_AGAIN, USER_ACTIVATED, CODE_INVALID } from '../actions/actionNames';

const initialState = {
  init: null,
  serverError: false,
  paymentSuccessful: false,
  paymentStatus: null,
  selectedProduct: "empty",
  email: null,
  email_again: null,
  password: null,
  password_again: null,
  userdata_error: false,
  username: null,
  user_activated: false,
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
    
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload.username
      }

    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      }

    case SET_PASSWORD_AGAIN:
      return {
        ...state,
        password_again: action.payload.password_again
      }

    case SET_USERDATA_ERROR:
      return {
        ...state,
        userdata_error: action.payload.isError
      }

    case USER_ACTIVATED:
      return {
        ...state,
        user_activated: true
      }

    case CODE_INVALID:
      return {
        ...state,
        user_activated: false
      }

      default:
        return state;
  }
}

export default shopReducer;