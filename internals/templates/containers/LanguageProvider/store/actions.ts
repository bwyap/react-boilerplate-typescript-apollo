/*
 *
 * LanguageProvider actions
 *
 */

import { LanguageProviderActionType } from './constants';
import { ActionCreator } from '../../../typings/store';
import {
  ChangeLocaleAction,
  ChangeLocaleActionPayload,
} from './typings/actions';

export const createChangeLocaleAction: ActionCreator<
  ChangeLocaleAction,
  ChangeLocaleActionPayload
> = payload => ({
  type: LanguageProviderActionType.CHANGE_LOCALE,
  payload,
});
