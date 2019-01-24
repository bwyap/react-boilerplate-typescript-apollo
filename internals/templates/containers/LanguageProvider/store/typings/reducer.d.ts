import { ComponentReducerFn } from '../../../../typings/store';
import { LanguageProviderActionType } from '../constants';

/*
 * LanguageProvider reducer typings
 *
 * Declare the types expected in our reducer and reducer state here.
 *
 */

export interface LanguageProviderReducerFn
  extends ComponentReducerFn<
    LanguageProviderReducerState,
    LanguageProviderActionType
  > {}

export interface LanguageProviderReducerState {
  locale: string;
}
