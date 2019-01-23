import { Action } from 'redux';
import { AppActionType } from '../constants';

/**
 * AppAction typings
 *
 * Action types and payload declarations should be defined here.
 *
 * All actions which do not require a payload should define an action
 * type. All actions which require a payload should additionally
 * define the payload type.
 */

// Actions

export type AppActions =
  | LoadReposAction
  | ReposLoadedAction
  | RepoLoadingErrorAction;

export interface LoadReposAction extends Action<AppActionType> {
  type: AppActionType.LOAD_REPOS;
}

export interface ReposLoadedAction extends Action<AppActionType> {
  type: AppActionType.LOAD_REPOS_SUCCESS;
  payload: ReposLoadedActionPayload;
}

export interface RepoLoadingErrorAction extends Action<AppActionType> {
  type: AppActionType.LOAD_REPOS_ERROR;
  payload: RepoLoadingErrorActionPayload;
}

// Action payloads

export interface ReposLoadedActionPayload {
  username: string;
  repos: any[];
}

export interface RepoLoadingErrorActionPayload {
  error: any;
}
