const createActionTypes = (base, types) => {
  const res: any = {};
  types.forEach((type) => (res[type] = `${base}/${type}`));
  return res;
};

export const APP: any = createActionTypes('APP', [
  'UPDATE_STORE_STATE',
  'UPDATE_COUNT',
]);
