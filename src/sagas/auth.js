import {put, takeLatest, select} from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import {LOGIN_URL} from "../constants/urls";
import axios from "axios";
import {saveUserData} from "../actions/auth";
import {bearerToken} from "../reducers/auth";

function* postLogin(action) {
  try {
    console.log(LOGIN_URL);
    console.log(action.payload);
    const res = yield axios
      .post(LOGIN_URL, action.payload, {
        headers: {
          Authorization:
            "Basic dHV0b3JpYWwtZGNrci1zaXRlLTAwMDAteHByZXNzd2ViYXBwOnR1dG9yaWFsLWRja3Itc2l0ZS0wMDAwLWNsaWVudHNlY3JldA==",
        },
      })
      .then((response) => response.data);
    console.log(res);
    yield put(saveUserData(res));
    action.onSuccess(res);
  } catch (error) {
    action.onFailure(error);
  }
}

function* postLogout(action) {
  try {
    const authKey = yield select(bearerToken);
    console.log(authKey);
    // const res = yield axios
    //   .post(logoutAdminUrl, null, {
    //     headers: { Authorization: `Bearer ${authKey}` },
    //   })
    //   .then((response) => response.data);
    // console.log(res);
    yield put(saveUserData(null));
    action.onSuccess();
  } catch (error) {
    action.onFailure(error);
  }
}

export default function* root() {
  yield takeLatest(types.AUTH.POST_LOGIN, postLogin);
  yield takeLatest(types.AUTH.POST_LOGOUT, postLogout);
}
