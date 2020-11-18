import { SELECT } from './actionNames';
export const selectProduct = (id) => ({
  type: SELECT,
  payload: { id }
});