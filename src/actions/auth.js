import * as types from "./actionTypes";

export const postLogin = (payload, onSuccess, onFailure) => {
  const type = types.AUTH.POST_LOGIN;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const postLogout = (onSuccess, onFailure) => {
  const type = types.AUTH.POST_LOGOUT;
  return {
    type,
    onSuccess,
    onFailure,
  };
};

export const saveUserData = (payload) => {
  const type = types.AUTH.SAVE_USER_DATA;
  return {
    type,
    payload,
  };
};
