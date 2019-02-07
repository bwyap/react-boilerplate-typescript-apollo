/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { History } from 'history';
import { createLogger } from 'redux-logger';

import createReducer from './reducers';
import {
  MyReduxStore,
  MyReducerState,
  MyReducerActions,
  MyReduxStoreExtensions,
} from './typings/store';

import { createPersistMiddleware } from './utils/persistMiddleware';

const sagaMiddleware = createSagaMiddleware();

const {
  persistMiddleware,
  persistStore,
  createPersistedReducer,
} = createPersistMiddleware({
  key: `boilerplate-${process.env.NODE_ENV}`,
  blacklist: ['router'],
});

export default function configureStore(
  initialState: object = {},
  history: History<any>,
) {
  // Create the store with middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  // 3. persistMiddleware: Persists state changes to local storage
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
    persistMiddleware,
  ];

  // Add logger if it is not production
  /* istanbul ignore if */
  if (!['production', 'test'].includes(process.env.NODE_ENV)) {
    middlewares.push(createLogger());
  }

  // Create enhancers
  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    // process.env.NODE_ENV !== 'production' &&
    !!window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const store = createStore<
    MyReducerState,
    MyReducerActions,
    MyReduxStore,
    MyReduxStoreExtensions
  >(
    createPersistedReducer(createReducer()),
    initialState,
    composeEnhancers(...enhancers),
  );

  // Persist the store
  persistStore(store);

  // Extensions
  store.createReducer = injectedReducers =>
    createPersistedReducer(createReducer(injectedReducers));
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(store.createReducer(store.injectedReducers));
    });
  }

  return { store };
}
