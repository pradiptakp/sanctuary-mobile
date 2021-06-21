import { select, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  updateUser,
} from "../actions/userActions";
import { INDEX_USER, STORE_USER, DELETE_USER, UPDATE_USER } from "../../apis";
import { User } from "../../types";
import { hostUrlSelector } from "../reducers/appReducer";

function* getUsersSaga({ payload }: ReturnType<typeof getUsers.request>) {
  try {
    const hostUrl: string = yield select(hostUrlSelector);
    const response: AxiosResponse<User[]> = yield axios.get(hostUrl + INDEX_USER);

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.response?.data);
  }
}

function* getUserSaga({ payload }: ReturnType<typeof getUser.request>) {
  try {
    const hostUrl: string = yield select(hostUrlSelector);
    const response: AxiosResponse<User> = yield axios.get(
      `${hostUrl + INDEX_USER}/${payload.id}`
    );

    payload.onSuccess(response.data);
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.response?.data);
  }
}

function* postUserSaga({ payload }: ReturnType<typeof postUser.request>) {
  try {
    const hostUrl: string = yield select(hostUrlSelector);
    yield axios.post(hostUrl + STORE_USER, payload.data);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.response?.data);
  }
}

function* updateUserSaga({ payload }: ReturnType<typeof updateUser.request>) {
  try {
    const hostUrl: string = yield select(hostUrlSelector);
    yield axios.put(hostUrl + UPDATE_USER + payload.id, payload.data);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.response?.data);
  }
}

function* deleteUserSaga({ payload }: ReturnType<typeof deleteUser.request>) {
  try {
    const hostUrl: string = yield select(hostUrlSelector);
    yield axios.delete(hostUrl + DELETE_USER + payload.id);

    payload.onSuccess();
  } catch (err: any) {
    console.error(err.response);
    payload.onFailure(err.response?.data);
  }
}

export default function* user() {
  yield takeLatest(getUsers.request, getUsersSaga);
  yield takeLatest(getUser.request, getUserSaga);
  yield takeLatest(postUser.request, postUserSaga);
  yield takeLatest(updateUser.request, updateUserSaga);
  yield takeLatest(deleteUser.request, deleteUserSaga);
}
