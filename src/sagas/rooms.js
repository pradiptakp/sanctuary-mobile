import axios from "axios";
import { select, takeLatest } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import { INDEX_ROOM, STORE_ROOM, UPDATE_ROOM, DELETE_ROOM } from "../constants/urls";
import { bearerToken } from "../reducers/auth";

function* indexRooms(action) {
  try {
    const authKey = yield select(bearerToken);
    const res = yield axios
      .get(`${INDEX_ROOM}/${action.payload || ""}`, {
        headers: { "X-Auth-Token": `${authKey}` },
      })
      .then((response) => response.data);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* deleteRoom(action) {
  try {
    const authKey = yield select(bearerToken);
    console.log(authKey);
    const res = yield axios
      .delete(DELETE_ROOM + action.payload, {
        headers: { "X-Auth-Token": `${authKey}` },
      })
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* storeRoom(action) {
  try {
    const authKey = yield select(bearerToken);
    console.log(authKey);
    const res = yield axios
      .post(STORE_ROOM, action.payload, {
        headers: { "X-Auth-Token": `${authKey}` },
      })
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* updateRoom(action) {
  try {
    const authKey = yield select(bearerToken);
    console.log(authKey);
    console.log(action.payload.data)
    const res = yield axios
      .post(
        UPDATE_ROOM + action.payload.id,
        action.payload.data,
        {
          headers: { "X-Auth-Token": `${authKey}` },
        }
      )
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

export default function* root() {
  yield takeLatest(types.ROOMS.INDEX_ROOMS, indexRooms);
  yield takeLatest(types.ROOMS.DELETE_ROOMS, deleteRoom);
  yield takeLatest(types.ROOMS.STORE_ROOMS, storeRoom);
  yield takeLatest(types.ROOMS.UPDATE_ROOMS, updateRoom);
}
