import * as types from "./actionTypes";

export const indexRooms = (payload, onSuccess, onFailure) => {
  const type = types.ROOMS.INDEX_ROOMS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const viewRooms = (payload, onSuccess, onFailure) => {
  const type = types.ROOMS.VIEW_ROOMS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const updateRooms = (payload, onSuccess, onFailure) => {
  const type = types.ROOMS.UPDATE_ROOMS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const storeRooms = (payload, onSuccess, onFailure) => {
  const type = types.ROOMS.STORE_ROOMS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const deleteRooms = (payload, onSuccess, onFailure) => {
  const type = types.ROOMS.DELETE_ROOMS;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};
