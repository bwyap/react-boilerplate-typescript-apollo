/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function.
 *
 */

import produce from 'immer';
import { AppActionType } from './constants';
import { AppReducerState, AppReducerFn } from './typings/reducer';
import { ReposLoadedAction, RepoLoadingErrorAction } from './typings/actions';

// The initial state of the App
export const initialState: AppReducerState = {
  loading: false,
  error: null,
  currentUser: null,
  userData: {
    repositories: null,
  },
};

const appReducer: AppReducerFn = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AppActionType.LOAD_REPOS:
        draft.loading = true;
        draft.error = null;
        draft.userData.repositories = null;
        break;

      case AppActionType.LOAD_REPOS_SUCCESS:
        draft.userData.repositories = (action as ReposLoadedAction).payload.repos;
        draft.loading = false;
        draft.currentUser = (action as ReposLoadedAction).payload.username;
        break;

      case AppActionType.LOAD_REPOS_ERROR:
        draft.error = (action as RepoLoadingErrorAction).payload.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
