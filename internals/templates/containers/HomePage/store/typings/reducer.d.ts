import { ComponentReducerFn } from '../../../../typings/store';
import { HomePageActionType } from '../constants';

/*
 * HomePageReducer typings
 *
 * Declare the types expected in our reducer and reducer state here.
 *
 */

export interface HomePageReducerFn
  extends ComponentReducerFn<HomePageReducerState, HomePageActionType> {}

export interface HomePageReducerState {}
