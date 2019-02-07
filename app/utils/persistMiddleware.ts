import { Middleware, Store, Dispatch } from 'redux';
import { throttle } from './throttle';

/**
 * Custom middleware to persist redux state.
 */
// tslint:disable:no-console

export interface IPersistConfig<S = any> {
  key: string;
  blacklist: Array<keyof S>;
  throttle: number;
}

export enum PersistAction {
  LOAD = '@@persist/LOAD',
  SAVE = '@@persist/SAVE',
  LOAD_FAILED = '@@persist/FAILED_TO_LOAD',
  SAVE_FAILED = '@@persist/FAILED_TO_SAVE',
}

export const defaultConfig: IPersistConfig = {
  key: 'state',
  blacklist: [],
  throttle: 100,
};

/**
 * Create a function that will save the given state
 * to local storage. Dispatches SAVE_FAILED if the
 * state fails to save.
 *
 * The given state will be filtered according to the
 * given config.
 */
export const saveState = (config: IPersistConfig) => (
  dispatch: Dispatch,
  state: object,
) => {
  try {
    // Filter out keys in the state that are blacklisted
    const persistedState: any = { ...state };
    for (const key of config.blacklist) {
      delete persistedState[key];
    }
    const serializedState = JSON.stringify(persistedState);
    localStorage.setItem(config.key, serializedState);
  } catch (error /* istanbul ignore next */) {
    console.warn(error);
    dispatch({ type: PersistAction.SAVE_FAILED });
  }
};

/**
 * Create a function that will load the state from
 * local storage. Dispatches LOAD_FAILED if the
 * state fails to load.
 *
 * The loaded state will be merged with the current
 * state according to the given config.
 */
export const loadState = (config: IPersistConfig) => (
  dispatch: Dispatch,
  state: object = {},
) => {
  try {
    const serializedState = localStorage.getItem(config.key);
    if (serializedState === null) {
      return state;
    }
    const parsedState = JSON.parse(serializedState);
    const finalState = { ...state, ...parsedState };
    return finalState;
  } catch (error /* istanbul ignore next */) {
    console.warn(error);
    dispatch({ type: PersistAction.LOAD_FAILED });
    return state;
  }
};

/**
 * Create middleware that will persist the state.
 * @param reduxStore the store to persist
 * @param config
 */
export const createPersistMiddleware = (config?: Partial<IPersistConfig>) => {
  const finalConfig = {
    ...defaultConfig,
    ...config,
  };

  /**
   * Create the middleware that will intercept the LOAD and SAVE actions.
   *
   * NOTE: you must use the `createPersistedReducer()` funcion
   * to modify your reducer so that state loads are picked up.
   * Middlewares are do not modify your state.
   */
  const persistMiddleware: Middleware = store => next => action => {
    switch (action.type) {
      case PersistAction.LOAD:
        const loadedState = loadState(finalConfig)(next, store.getState());
        return next({ ...action, payload: loadedState });
      case PersistAction.SAVE:
        saveState(finalConfig)(next, store.getState());
        return next(action);
      default:
        return next(action);
    }
  };

  /**
   * Create a function that helps subscribe the store
   * to persist the state when there is an action
   */
  const persistStore = (store: Store) => {
    store.subscribe(throttle(
      () => saveState(finalConfig)(store.dispatch, store.getState()),
      finalConfig.throttle,
    ) as any);
    // Load the store from local storage
    store.dispatch({ type: PersistAction.LOAD });
  };

  /**
   * Modifies a reducer to intercept the `@@persist/LOAD` action.
   * Replaces the current state with the loaded state.
   */
  const createPersistedReducer = reducer => {
    return (prevState, action) => {
      let state = prevState;
      if (action.type === PersistAction.LOAD) {
        state = action.payload;
      }
      return reducer(state, action);
    };
  };

  return { persistMiddleware, persistStore, createPersistedReducer };
};

export default createPersistMiddleware;
