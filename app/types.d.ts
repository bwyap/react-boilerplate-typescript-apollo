import { Store, Action } from 'redux';
import { SagaIterator } from 'redux-saga';

interface JSONResponse {
  status: number;
  statusText: string;
  json(): object;
}

type Saga<T = any> = () => IterableIterator<T>;

// TODO: add better typings
interface ReduxStore<S = any, A extends Action<any> = any> extends Store<S, A> {
  injectedReducers: object;
  injectedSagas: object;
  runSaga(saga: Saga, args: object): any;
}

interface SagaInjectionHandlers {
  injectSaga(key: string, descriptor: object, args: any): void;
  ejectSaga(key: string): void;
}

interface SagaDescriptor {
  mode?: string;
  saga?: Saga;
}
