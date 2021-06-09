import {all} from "redux-saga/effects";
import devices from "./devices";
import rooms from "./rooms";
import users from "./users";
import auth from "./auth";

export default function* root() {
  yield all([devices(), auth(), rooms(), users()]);
}
