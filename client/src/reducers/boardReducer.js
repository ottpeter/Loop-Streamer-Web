import { INIT, SET_LOGINNAME_FIELD, SET_PASSWORD_FIELD } from '../actions/actionNames';

const initialState = {
  isLoggedIn: false,
  serverError: false,
  username: "_not_set_",
  loginPassword: null,
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

    default:
      return state;
  }
}

export default boardReducer;