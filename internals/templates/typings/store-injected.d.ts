import { Store, Action, Reducer } from 'redux';
import { Saga } from './store';

// Action imports
import { HomePageActions } from '../containers/HomePage/store/typings/actions';

// Reducer state imports
import { HomePageReducerState } from '../containers/HomePage/store/typings/reducer';

export interface MyInjectedReducers {
  home?: Reducer<HomePageReducerState, HomePageActions>;
}

export type MyInjectedActions = HomePageActions;

export interface MyInjectedSagas {
  home?: Saga;
}

export interface MyInjectedReducerState {
  home?: HomePageReducerState;
}
