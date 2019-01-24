import { ComponentReducerFn } from '../../../../typings/store';
import { AppActionType } from '../constants';

/*
 * AppReducer typings
 *
 * Declare the types expected in our reducer and reducer state here.
 *
 */

export interface AppReducerFn
  extends ComponentReducerFn<AppReducerState, AppActionType> {}

export interface AppReducerState {}
