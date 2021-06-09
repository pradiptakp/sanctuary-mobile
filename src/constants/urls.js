const HOST_URL = 'http://139.59.240.212:3002';
const API_URL = `${HOST_URL}/api`;
export const SOCKET_URL = `${HOST_URL}`;

export const LOGIN_URL = `${API_URL}/auth/login`;

//Rooms
export const INDEX_ROOM = `${API_URL}/room`;
export const STORE_ROOM = `${API_URL}/room`;
export const UPDATE_ROOM = `${API_URL}/room/`;
export const DELETE_ROOM = `${API_URL}/room/`;

//Users
export const INDEX_USERS = `${API_URL}/user`;
export const STORE_USERS = `${API_URL}/user`;
export const UPDATE_USERS = `${API_URL}/user/`;
export const DELETE_USERS = `${API_URL}/user/`;

//Devices
export const INDEX_DEVICE = `${API_URL}/device`;
export const STORE_DEVICE = `${API_URL}/device`;
export const SWITCH_DEVICE = `${API_URL}/device/`;
export const UPDATE_DEVICE = `${API_URL}/device/`;
export const DELETE_DEVICE = `${API_URL}/device/`;
