import {AUTH} from "../actions/actionTypes";

const initialState = {
  user: null,
};

export const bearerToken = (state) => state.persist.auth.user?.access_token;
export const keyrockToken = (state) => state.persist.auth.user?.keyrockToken;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.SAVE_USER_DATA:
      return {...state, user: action.payload};
    default:
      return state;
  }
};

export default authReducer;
