/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { HomePageReducerState, HomePageReducerFn } from './typings/reducer';

// The initial state of the App
export const initialState: HomePageReducerState = {};

const homeReducer: HomePageReducerFn = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      default:
        break;
    }
  });

export default homeReducer;
