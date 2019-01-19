import * as invariant from 'invariant';
import { isString, isEmpty, isFunction } from 'lodash';

import checkStore from './checkStore';
import createReducer from '../reducers';
import { Reducer } from 'redux';
import {
  InjectReducerFactory,
  InjectReducerFn,
  GetReducerInjectorsFn,
} from './types';
import { ReduxStore } from '../types';

const injectReducerFactory: InjectReducerFactory = (
  store: ReduxStore,
  isValid: boolean = false,
) => {
  const injectReducer: InjectReducerFn = (key: string, reducer: Reducer) => {
    if (!isValid) checkStore(store);

    invariant(
      isString(key) && !isEmpty(key) && isFunction(reducer),
      '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
    );

    // Check `store.injectedReducers[key] === reducer` for hot reloading
    // when a key is the same but a reducer is different
    if (
      Reflect.has(store.injectedReducers, key) &&
      store.injectedReducers[key] === reducer
    ) {
      return;
    }

    store.injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  };
  return injectReducer;
};

const getInjectors: GetReducerInjectorsFn = (store: ReduxStore) => {
  checkStore(store);
  return {
    injectReducer: injectReducerFactory(store, true),
  };
};

export default getInjectors;
export { injectReducerFactory };
