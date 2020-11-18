import { INIT, SELECT } from './actionNames';

// Load products to Redux store
export const init = () => ({
  type: INIT
});

// Select a product
export const selectProduct = (id) => ({
  type: SELECT,
  payload: { id }
});

