import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducers/app';
import authReducer from './reducers/auth';
import sagas from './sagas';

export const reducers = {
  app: appReducer,
  auth: authReducer,
};

export const rootReducer = combineReducers(reducers);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const combinedReducers = combineReducers({
  persist: persistedReducer,
});

const appMiddleware = () => next => action => {
  next(action);
};

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, appMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

export const store = createStore(combinedReducers, compose(...enhancers));

sagaMiddleware.run(sagas);

export const persistor = persistStore(store);
