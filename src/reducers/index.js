import { combineReducers } from 'redux';

const array = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_ARRAY':
      return [...state, 1];
    default:
      return state;
  }
};

export default combineReducers({
  array
});
