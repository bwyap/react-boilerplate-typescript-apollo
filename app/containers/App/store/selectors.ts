/**
 * The global state selectors
 */

import { createSelector, Selector } from 'reselect';
import { MyReducerState } from '../../../typings/store';
import { AppReducerState } from './typings/reducer';
import { RouterState } from 'connected-react-router';
import { Location, Pathname } from 'history';

const selectApp: Selector<MyReducerState, AppReducerState> = state => state.app;

const selectRouter: Selector<MyReducerState, RouterState> = state =>
  state.router;

const makeSelectCurrentUser = () =>
  createSelector<MyReducerState, AppReducerState, string>(
    selectApp,
    state => state.currentUser,
  );

const makeSelectLoading = () =>
  createSelector<MyReducerState, AppReducerState, boolean>(
    selectApp,
    state => state.loading,
  );

const makeSelectError = () =>
  createSelector<MyReducerState, AppReducerState, any>(
    selectApp,
    state => state.error,
  );

const makeSelectRepos = () =>
  createSelector<MyReducerState, AppReducerState, any[]>(
    selectApp,
    state => state.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector<MyReducerState, RouterState, Location>(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectLocationPathname = () =>
  createSelector<MyReducerState, Location, Pathname>(
    makeSelectLocation(),
    locationState => locationState.pathname,
  );

export {
  selectApp,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectLocationPathname,
};
