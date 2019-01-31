import { Action } from 'redux';
import { HomePageActionType } from '../constants';

/**
 * HomePageAction typings
 *
 * Action types and payload declarations should be defined here.
 *
 * All actions which do not require a payload should define an action
 * type. All actions which require a payload should additionally
 * define the payload type.
 */

// Actions

export type HomePageActions = ChangeUsernameAction;

export interface ChangeUsernameAction extends Action<HomePageActionType> {
  type: HomePageActionType.CHANGE_USERNAME;
  payload: ChangeUsernameActionPayload;
}

export interface ChangeSearchAction extends Action<HomePageActionType> {
  type: HomePageActionType.CHANGE_SEARCH;
  payload: ChangeSearchActionPayload;
}

// Action payloads

export interface ChangeUsernameActionPayload {
  username: string;
}

export interface ChangeSearchActionPayload {
  search: string;
}
