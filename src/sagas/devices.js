import {takeLatest, select} from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import {
  DELETE_DEVICE,
  INDEX_DEVICE,
  UPDATE_DEVICE,
  STORE_DEVICE,
  SWITCH_DEVICE,
} from "../constants/urls";
import axios from "axios";
import {bearerToken} from "../reducers/auth";

function* indexDevices(action) {
  try {
    const authKey = yield select(bearerToken);
    console.log(authKey);
    const res = yield axios
      .get(INDEX_DEVICE, {
        headers: {"X-Auth-Token": `${authKey}`},
      })
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* deleteDevices(action) {
  try {
    const authKey = yield select(bearerToken);
    console.log(authKey);
    const res = yield axios
      .delete(DELETE_DEVICE + action.payload, {
        headers: {"X-Auth-Token": `${authKey}`},
      })
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* storeDevices(action) {
  try {
    const authKey = yield select(bearerToken);
    console.log(authKey);
    const res = yield axios
      .post(STORE_DEVICE, action.payload, {
        headers: {"X-Auth-Token": `${authKey}`},
      })
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* updateDevices(action) {
  try {
    const authKey = yield select(bearerToken);
    console.log(authKey);
    console.log(action.payload.data);
    const res = yield axios
      .post(UPDATE_DEVICE + action.payload.id, action.payload.data, {
        headers: {"X-Auth-Token": `${authKey}`},
      })
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* switchDevices(action) {
  try {
    const authKey = yield select(bearerToken);
    console.log(authKey);
    console.log(action.payload);
    const res = yield axios
      .post(SWITCH_DEVICE, action.payload, {
        headers: {"X-Auth-Token": `${authKey}`},
      })
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

export default function* root() {
  yield takeLatest(types.DEVICES.INDEX_DEVICES, indexDevices);
  yield takeLatest(types.DEVICES.STORE_DEVICES, storeDevices);
  yield takeLatest(types.DEVICES.UPDATE_DEVICES, updateDevices);
  yield takeLatest(types.DEVICES.DELETE_DEVICES, deleteDevices);
  yield takeLatest(types.DEVICES.SWITCH_DEVICES, switchDevices);
}
