/**
 * Homepage selectors
 */

import { createSelector, Selector } from 'reselect';
import { MyReducerState } from '../../../typings/store';
import { HomePageReducerState } from './typings/reducer';

const selectHome: Selector<MyReducerState, HomePageReducerState> = state =>
  state.home;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

const makeSelectSearch = () =>
  createSelector(
    selectHome,
    homeState => homeState.search,
  );

export { selectHome, makeSelectUsername, makeSelectSearch };
