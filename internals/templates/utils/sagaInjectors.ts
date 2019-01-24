import * as invariant from 'invariant';
import { isEmpty, isFunction, isString, conformsTo } from 'lodash';

import checkStore from './checkStore';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';
import { SagaDescriptor, MyReduxStore } from '../typings/store';
import {
  InjectSagaFactory,
  InjectSagaFn,
  EjectSagaFactory,
  EjectSagaFn,
  GetSagaInjectorsFn,
} from '../typings/utils';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key: string) =>
  invariant(
    isString(key) && !isEmpty(key),
    '(app/utils...) injectSaga: Expected `key` to be a non empty string',
  );

const checkDescriptor = (descriptor: SagaDescriptor) => {
  const shape = {
    saga: isFunction,
    mode: mode => isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: Expected a valid saga descriptor',
  );
};

const injectSagaFactory: InjectSagaFactory = (
  store: MyReduxStore,
  isValid: boolean = false,
) => {
  const injectSaga: InjectSagaFn = (
    key: string,
    descriptor: SagaDescriptor = {},
    args: object,
  ) => {
    if (!isValid) checkStore(store);

    const newDescriptor: SagaDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON,
    };
    const { saga, mode } = newDescriptor;

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
    ) {
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args),
      };
    }
  };

  return injectSaga;
};

const ejectSagaFactory: EjectSagaFactory = (
  store: MyReduxStore,
  isValid: boolean,
) => {
  const ejectSaga: EjectSagaFn = key => {
    if (!isValid) checkStore(store);

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done';
        }
      }
    }
  };

  return ejectSaga;
};

const getInjectors: GetSagaInjectorsFn = (store: MyReduxStore) => {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
};

export default getInjectors;
export { injectSagaFactory, ejectSagaFactory };
