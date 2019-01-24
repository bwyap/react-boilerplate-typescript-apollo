import {
  FunctionalComponent,
  BasicFunctionalComponent,
} from '../../typings/component';

export interface LoadingIndicatorComponentFn extends BasicFunctionalComponent {}

export interface CircleComponentFn extends FunctionalComponent<CircleProps> {}

export interface CircleProps {
  rotate?: number;
  delay?: number;
}
