/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { HomePageActionType } from './constants';
import { ActionCreator } from '../../../typings/store';
import {
  ChangeUsernameAction,
  ChangeUsernameActionPayload,
  ChangeSearchAction,
  ChangeSearchActionPayload,
} from './typings/actions';

/**
 * Changes the input field of the form
 *
 * @param  {{ username: string }} name The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export const createChangeUsernameAction: ActionCreator<
  ChangeUsernameAction,
  ChangeUsernameActionPayload
> = payload => ({
  type: HomePageActionType.CHANGE_USERNAME,
  payload,
});

/**
 * Changes the input field of the form
 *
 * @param  {{ search: string }} search The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_SEARCH
 */
export const createChangeSearchAction: ActionCreator<
  ChangeSearchAction,
  ChangeSearchActionPayload
> = payload => ({
  type: HomePageActionType.CHANGE_SEARCH,
  payload,
});
