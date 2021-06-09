import axios from "axios";
import {select, takeLatest} from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import {INDEX_USERS, STORE_USERS, DELETE_USERS, UPDATE_USERS} from "../constants/urls";
import {keyrockToken} from "../reducers/auth";

function* indexUsers(action) {
  try {
    const authKey = yield select(keyrockToken);
    const res = yield axios
      .get(`${INDEX_USERS}/${action.payload || ""}`, {
        headers: {"X-Auth-Token": `${authKey}`},
      })
      .then((response) => response.data);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* deleteUser(action) {
  try {
    const authKey = yield select(keyrockToken);
    console.log(authKey);
    const res = yield axios
      .delete(DELETE_USERS + action.payload, {
        headers: {"X-Auth-Token": `${authKey}`},
      })
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* storeUser(action) {
  try {
    const authKey = yield select(keyrockToken);
    console.log(authKey);
    const res = yield axios
      .post(STORE_USERS, action.payload, {
        headers: {"X-Auth-Token": `${authKey}`},
      })
      .then((response) => response.data);
    console.log(res);
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* updateUser(action) {
  try {
    const authKey = yield select(keyrockToken);
    console.log(authKey);
    console.log(action.payload.data);
    const res = yield axios
      .post(UPDATE_USERS + action.payload.id, action.payload.data, {
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
  yield takeLatest(types.USERS.INDEX_USERS, indexUsers);
  yield takeLatest(types.USERS.DELETE_USERS, deleteUser);
  yield takeLatest(types.USERS.STORE_USERS, storeUser);
  yield takeLatest(types.USERS.UPDATE_USERS, updateUser);
}
