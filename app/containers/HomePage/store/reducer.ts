/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { HomePageActionType } from './constants';
import { HomePageReducerState, HomePageReducerFn } from './typings/reducer';
import { ChangeUsernameAction, ChangeSearchAction } from './typings/actions';

// The initial state of the App
export const initialState: HomePageReducerState = {
  username: '',
  search: '',
};

const homeReducer: HomePageReducerFn = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case HomePageActionType.CHANGE_USERNAME:
        // Delete prefixed '@' from the github username
        draft.username = (action as ChangeUsernameAction).payload.username.replace(
          /@/gi,
          '',
        );
        break;
      case HomePageActionType.CHANGE_SEARCH:
        draft.search = (action as ChangeSearchAction).payload.search;
        break;
    }
  });

export default homeReducer;
