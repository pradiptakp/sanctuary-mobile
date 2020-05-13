import * as types from './actionTypes';

export const updateStoreState = () => {
  const type: string = types.APP.UPDATE_STORE_STATE;
  return {
    type,
  };
};

export const updateCount = (payload: number) => {
  const type: string = types.APP.UPDATE_COUNT;
  return {
    type,
    payload,
  };
};
