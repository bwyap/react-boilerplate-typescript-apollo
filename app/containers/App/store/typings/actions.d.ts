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

export type AppActions = DefaultAction;

export interface DefaultAction extends Action<AppActionType> {
  type: AppActionType.DEFAULT_ACTION;
}

// Action payloads
