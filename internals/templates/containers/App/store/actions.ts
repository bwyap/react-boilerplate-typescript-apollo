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
// import { SimpleActionCreator, ActionCreator } from '../../../typings/store';
import { SimpleActionCreator } from '../../../typings/store';
import { DefaultAction } from './typings/actions';

// Create the default action
export const createDefaultAction: SimpleActionCreator<DefaultAction> = () => ({
  type: AppActionType.DEFAULT_ACTION,
});
