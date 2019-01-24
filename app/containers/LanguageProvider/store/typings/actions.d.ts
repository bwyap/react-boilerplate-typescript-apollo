import { Action } from 'redux';
import { LanguageProviderActionType } from '../constants';

/**
 * LanguageProviderAction typings
 */

// Actions

export type LanguageProviderActions = ChangeLocaleAction;

export interface ChangeLocaleAction extends Action<LanguageProviderActionType> {
  type: LanguageProviderActionType.CHANGE_LOCALE;
  payload: ChangeLocaleActionPayload;
}

// Action payloads

export interface ChangeLocaleActionPayload {
  locale: string;
}
