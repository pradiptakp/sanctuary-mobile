import {APP} from '../actions/actionTypes';

const initialState = {
  count: 0,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP.UPDATE_STORE_STATE:
      return Object.assign({}, initialState, state);
    case APP.UPDATE_COUNT:
      return {...state, count: action.payload};

    default:
      return state;
  }
};

export default appReducer;
