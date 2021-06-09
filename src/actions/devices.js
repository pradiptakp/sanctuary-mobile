import * as types from "./actionTypes";

export const indexDevices = (payload, onSuccess, onFailure) => {
  const type = types.DEVICES.INDEX_DEVICES;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const switchDevices = (payload, onSuccess, onFailure) => {
  const type = types.DEVICES.SWITCH_DEVICES;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const viewDevices = (payload, onSuccess, onFailure) => {
  const type = types.DEVICES.VIEW_DEVICES;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const updateDevices = (payload, onSuccess, onFailure) => {
  const type = types.DEVICES.UPDATE_DEVICES;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const storeDevices = (payload, onSuccess, onFailure) => {
  const type = types.DEVICES.STORE_DEVICES;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};

export const deleteDevices = (payload, onSuccess, onFailure) => {
  const type = types.DEVICES.DELETE_DEVICES;
  return {
    type,
    payload,
    onSuccess,
    onFailure,
  };
};
