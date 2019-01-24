import { Reducer, Store } from 'redux';
import {
  MyReduxStore,
  Saga,
  SagaDescriptor,
  SagaInjectionHandlers,
} from './store';

type CheckStoreFn = (store: MyReduxStore) => void;

type ReducerInjectorFn = (
  reducerInjection: ReducerInjection,
) => (
  WrapperComponent: React.ComponentClass | React.FunctionComponent,
) => React.ComponentClass;

interface ReducerInjection {
  key: string;
  reducer: Reducer;
}

type SagaInjectorFn = (
  sagaInjection: SagaInjection,
) => (
  WrapperComponent: React.ComponentClass | React.FunctionComponent,
) => React.ComponentClass;

interface SagaInjection {
  key: string;
  saga: Saga;
  mode?: string;
}

type InjectReducerFactory = (
  store: MyReduxStore,
  isValid?: boolean,
) => InjectReducerFn;

type InjectReducerFn = (key: string, reducer: Reducer) => void;

type GetReducerInjectorsFn = (
  store: MyReduxStore,
) => { injectReducer: InjectReducerFn };

type InjectSagaFactory = (
  store: MyReduxStore,
  isValid?: boolean,
) => InjectSagaFn;

type InjectSagaFn = (
  key: string,
  descriptor: SagaDescriptor,
  args?: object,
) => void;

type EjectSagaFactory = (store: MyReduxStore, isValid?: boolean) => EjectSagaFn;

type EjectSagaFn = (key: string) => void;

type GetSagaInjectorsFn = (store: MyReduxStore) => SagaInjectionHandlers;
