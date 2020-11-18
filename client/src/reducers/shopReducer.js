import { INIT, SELECT } from '../actions/actionNames';

const initialState = {
  init: null,
  serverError: false,
  selectedProduct: null,
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

      default:
        return state;
  }
}

export default shopReducer;