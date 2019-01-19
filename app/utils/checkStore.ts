import { conformsTo, isFunction, isObject } from 'lodash';
import * as invariant from 'invariant';

import { CheckStoreFn } from './types';

/**
 * Validate the shape of redux store
 */
const checkStore: CheckStoreFn = store => {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    injectedReducers: isObject,
    injectedSagas: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) injectors: Expected a valid redux store',
  );
};

export default checkStore;
