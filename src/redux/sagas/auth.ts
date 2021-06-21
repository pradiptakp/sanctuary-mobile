import {put, select, takeLatest} from 'redux-saga/effects';
import axios, {AxiosResponse} from 'axios';
import {postLogin, setUser} from '../actions/authActions';
import {LOGIN_URL} from '../../apis';
import {UserData} from '../../types';
import {hostUrlSelector} from '../reducers/appReducer';

function* postLoginSaga({payload}: ReturnType<typeof postLogin.request>) {
  try {
    const hostUrl: string = yield select(hostUrlSelector);
    const response: AxiosResponse<UserData> = yield axios.post(
      hostUrl + LOGIN_URL,
      payload.data,
    );

    yield put(setUser(response.data));
    payload.onSuccess(response.data);
  } catch (err) {
    console.error(err.response);
    payload.onFailure();
  }
}

export default function* auth() {
  yield takeLatest(postLogin.request, postLoginSaga);
}
