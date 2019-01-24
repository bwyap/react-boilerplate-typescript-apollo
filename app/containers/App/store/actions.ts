/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Declare your action enum in `constants.ts`
 * 1) Create action and action payload typings in `typings/actions.d.ts`
 * 2) Import action typings
 * 2) Add an action creator function here
 */

import { AppActionType } from './constants';
import { SimpleActionCreator, ActionCreator } from '../../../typings/store';
import {
  LoadReposAction,
  ReposLoadedAction,
  ReposLoadedActionPayload,
  RepoLoadingErrorActionPayload,
  RepoLoadingErrorAction,
} from './typings/actions';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export const createLoadReposAction: SimpleActionCreator<
  LoadReposAction
> = () => ({
  type: AppActionType.LOAD_REPOS,
});

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export const createReposLoadedAction: ActionCreator<
  ReposLoadedAction,
  ReposLoadedActionPayload
> = payload => ({
  type: AppActionType.LOAD_REPOS_SUCCESS,
  payload,
});

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export const createRepoLoadingErrorAction: ActionCreator<
  RepoLoadingErrorAction,
  RepoLoadingErrorActionPayload
> = payload => ({
  type: AppActionType.LOAD_REPOS_ERROR,
  payload,
});
