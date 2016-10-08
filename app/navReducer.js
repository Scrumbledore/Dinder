import { ActionConst, Actions } from 'react-native-router-flux';

export default function reducer(state = {}, action = {}) {

  if (action.type === ActionConst.JUMP) {

    console.warn(action.key)

    switch (action.key) {

      // case 'favorites':

      // case 'food':

      // case 'recs':

      // case 'menu':

      default:
        return state;
    }

  }
  return state;
}