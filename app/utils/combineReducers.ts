import { Reducer, ReducersMapObject } from 'redux';

/**
 * Custom implementation of Redux's `combineReducers`.
 *
 * When loading a persisted state, it may contain keysfrom injected
 * reducers. Redux's implementation of `combineReducers` does not
 * allow dynamically injected reducer keys to be added to the state.
 * This function provides a workaround.
 */

/**
 * Generates an error message for when an action causes a
 * reducer to return an undefined state.
 *
 * @param key the reducer key.
 * @param action the action that caused the error.
 */
const getUndefinedStateErrorMessage = (key, action) => {
  const actionType = action && action.type;
  const actionDescription =
    (actionType && `action "${String(actionType)}"`) || 'an action';

  return (
    `Given ${actionDescription}, reducer "${key}" returned undefined. ` +
    `To ignore an action, you must explicitly return the previous state. ` +
    `If you want this reducer to hold no value, you can return null instead of undefined.`
  );
};

/**
 * Generates an error message for when the given reducer map
 * contains no reducers.
 *
 * @param reducers the reducer object to check.
 */
const getUnexpectedStateShapeWarningMessage = reducers => {
  const reducerKeys = Object.keys(reducers);
  if (reducerKeys.length === 0) {
    return (
      'Store does not have a valid reducer. Make sure the argument passed ' +
      'to combineReducers is an object whose values are reducers.'
    );
  }
};

interface ICombineReducers {
  <S>(reducers: ReducersMapObject<S, any>): Reducer<S>;
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
const combineReducers: ICombineReducers = reducers => {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};

  reducerKeys.forEach(key => {
    // istanbul ignore else
    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        // tslint:disable-next-line
        console.error(`No reducer provided for key "${key}"`);
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  });

  const finalReducerKeys = Object.keys(finalReducers);

  return (state = {} as any, action) => {
    // istanbul ignore else
    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        finalReducers,
      );
      if (warningMessage) {
        // tslint:disable-next-line
        console.error(warningMessage);
      }
    }

    let hasChanged = false;
    const stateKeys = Object.keys(state);
    const nextState = {} as any;

    // Run reducer for each key
    finalReducerKeys.forEach(key => {
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    });

    // Copy over any existing left over state keys if they are defined
    stateKeys.forEach(key => {
      if (typeof nextState[key] === 'undefined') {
        nextState[key] = state[key];
      }
    });

    return hasChanged ? nextState : state;
  };
};

export default combineReducers;
