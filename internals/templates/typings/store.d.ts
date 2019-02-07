import { Store, Action, Reducer } from 'redux';
import { SagaIterator } from 'redux-saga';
import { RouterState as RouterReducerState } from 'connected-react-router';

import { AppActionType } from '../containers/App/store/constants';
import { LanguageProviderActionType } from '../containers/LanguageProvider/store/constants';
import { AppActions } from '../containers/App/store/typings/actions';
import { LanguageProviderActions } from '../containers/LanguageProvider/store/typings/actions';

import { AppReducerState } from '../containers/App/store/typings/reducer';
import { LanguageProviderReducerState } from '../containers/LanguageProvider/store/typings/reducer';

import {
  MyInjectedActions,
  MyInjectedReducers,
  MyInjectedSagas,
  MyInjectedReducerState,
} from './store-injected';

export interface Saga<T = any> {
  (): IterableIterator<T>;
}

export interface SagaInjectionHandlers {
  injectSaga(key: string, descriptor: SagaDescriptor, args: any): void;
  ejectSaga(key: string): void;
}

export interface SagaDescriptor {
  mode?: string;
  saga?: Saga;
}

export interface ComponentReducerFn<ComponentReducerState, ActionType> {
  (
    state: ComponentReducerState,
    action: Action<ActionType>,
  ): ComponentReducerState;
}

export interface SimpleActionCreator<Action> {
  (): Action;
}

export interface ActionCreator<Action, Payload> {
  (payload: Payload): Action;
}

export interface MyReduxStoreExtensions {
  injectedReducers: MyInjectedReducers;
  injectedSagas: MyInjectedSagas;
  runSaga(saga: Saga, args: object): any;
  createReducer(injectedReducers?: MyInjectedReducers): Reducer;
}

export interface MyReduxStore
  extends Store<MyReducerState, MyReducerActions>,
    MyReduxStoreExtensions {}

export type MyBaseActions = AppActions | LanguageProviderActions;

export type MyReducerActions = MyBaseActions | MyInjectedActions;

export interface MyBaseReducerState {
  router: RouterReducerState;
  app: AppReducerState;
  language: LanguageProviderReducerState;
}

export interface MyReducerState
  extends MyBaseReducerState,
    MyInjectedReducerState {}
