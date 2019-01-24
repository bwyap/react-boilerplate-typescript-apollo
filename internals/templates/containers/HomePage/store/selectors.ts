/**
 * Homepage selectors
 */

import { Selector } from 'reselect';
import { MyReducerState } from '../../../typings/store';
import { HomePageReducerState } from './typings/reducer';

const selectHome: Selector<MyReducerState, HomePageReducerState> = state =>
  state.home;

export { selectHome };
