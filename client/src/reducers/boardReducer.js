import { INIT } from '../actions/actionNames';

const initialState = {
  isLoggedIn: false,
  serverError: false,
  username: "_not_set_",
}

const boardReducer = function (state = initialState, action) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
      };

      default:
        return state;
  }
}

export default boardReducer;