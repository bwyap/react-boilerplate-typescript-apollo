import { FunctionalComponent } from '../../typings/component';
import { Pathname } from 'history';

export interface AppProps {}

export interface AppStateProps {
  pathname?: Pathname;
}

export interface AppDispatchProps {}

export interface AppMergedProps
  extends AppProps,
    AppStateProps,
    AppDispatchProps {}
