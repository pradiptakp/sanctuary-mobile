import {select, takeLatest} from "redux-saga/effects";
import axios, {AxiosResponse} from "axios";
import {GET_DASHBOARD_INFO} from "../../apis";
import {getDashboardInfo} from "../actions/appActions";
import {DashboardData} from "../../types";
import {hostUrlSelector} from "../reducers/appReducer";

function* getDashboardSaga({payload}: ReturnType<typeof getDashboardInfo.request>) {
  try {
    const hostUrl: string = yield select(hostUrlSelector);
    const response: AxiosResponse<DashboardData> = yield axios
      .get<DashboardData>(hostUrl + GET_DASHBOARD_INFO)
      .then(res => res);

    payload.onSuccess(response.data);
  } catch (err) {
    console.error(err);
    payload.onFailure();
  }
}

export default function* app() {
  yield takeLatest(getDashboardInfo.request, getDashboardSaga);
}
