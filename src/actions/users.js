import * as types from "./actionTypes";

export const indexUsers = (payload, onSuccess, onFailure) => {
  const type = types.USERS.INDEX_USERS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const viewUsers = (payload, onSuccess, onFailure) => {
  const type = types.USERS.VIEW_USERS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const updateUsers = (payload, onSuccess, onFailure) => {
  const type = types.USERS.UPDATE_USERS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const storeUsers = (payload, onSuccess, onFailure) => {
  const type = types.USERS.STORE_USERS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const deleteUsers = (payload, onSuccess, onFailure) => {
  const type = types.USERS.DELETE_USERS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};
