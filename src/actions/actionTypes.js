const createActionTypes = (base, types) => {
  const res = {};
  types.forEach((type) => (res[type] = `${base}/${type}`));
  return res;
};

export const APP = createActionTypes("APP", []);

export const AUTH = createActionTypes("AUTH", ["POST_LOGIN", "POST_LOGOUT", "SAVE_USER_DATA"]);

export const DEVICES = createActionTypes("DEVICES", [
  "INDEX_DEVICES",
  "VIEW_DEVICES",
  "STORE_DEVICES",
  "UPDATE_DEVICES",
  "DELETE_DEVICES",
  "SWITCH_DEVICES",
]);

export const ROOMS = createActionTypes("ROOMS", [
  "INDEX_ROOMS",
  "VIEW_ROOMS",
  "STORE_ROOMS",
  "UPDATE_ROOMS",
  "DELETE_ROOMS",
]);

export const USERS = createActionTypes("USERS", [
  "INDEX_USERS",
  "VIEW_USERS",
  "STORE_USERS",
  "UPDATE_USERS",
  "DELETE_USERS",
]);
