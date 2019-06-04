import { combineReducers } from 'redux';

const signInStatus = (state = null, action) => {
  switch (action.type) {
    case 'SIGN_IN' || 'SIGN_OUT':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  signInStatus
});
