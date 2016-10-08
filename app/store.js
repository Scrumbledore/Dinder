import navReducer from './navReducer.js';
import { createStore } from 'redux';

export default function configureStore() {
  return createStore(navReducer);
};