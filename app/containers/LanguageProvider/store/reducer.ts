/*
 *
 * LanguageProvider reducer
 *
 */

import produce from 'immer';

import { LanguageProviderActionType } from './constants';
import { DEFAULT_LOCALE } from '../../../i18n';
import {
  LanguageProviderReducerFn,
  LanguageProviderReducerState,
} from './typings/reducer';
import { ChangeLocaleAction } from './typings/actions';

export const initialState: LanguageProviderReducerState = {
  locale: DEFAULT_LOCALE,
};

const languageProviderReducer: LanguageProviderReducerFn = (
  state = initialState,
  action,
) =>
  produce(state, draft => {
    switch (action.type) {
      case LanguageProviderActionType.CHANGE_LOCALE:
        draft.locale = (action as ChangeLocaleAction).payload.locale;
        break;
    }
  });

export default languageProviderReducer;
