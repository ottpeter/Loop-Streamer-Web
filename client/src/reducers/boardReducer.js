import { INIT, LOGIN, LOGOUT, SET_LOGINNAME_FIELD, SET_PASSWORD_FIELD } from '../actions/actionNames';

const initialState = {
  isLoggedIn: false,
  serverError: false,
  username: "_not_set_",
  loginPassword: null,
  uploads: [],
  arrayLength: 0,
}

const boardReducer = function (state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
      };
    case SET_LOGINNAME_FIELD:
      return {
        ...state,
        username: action.payload.username
      };

    case SET_PASSWORD_FIELD:
      return {
        ...state,
        loginPassword: action.payload.password
      }
    
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        loginPassword: null,
        isLoggedIn: true
      }

    case LOGOUT:
      return {
        ...state,
        loginPassword: null,
        isLoggedIn: false,
      }

    default:
      return state;
  }
}

export default boardReducer;