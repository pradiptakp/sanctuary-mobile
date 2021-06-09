import { APP } from "../actions/actionTypes";

const initialState = {
  user: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP.UPDATE_STORE_STATE:
      return Object.assign({}, initialState, state);
    case APP.SAVE_USER_DATA:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default appReducer;
