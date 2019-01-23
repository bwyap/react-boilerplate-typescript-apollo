import { FunctionalComponent } from '../../typings/component';

export interface ToggleOptionComponentFn
  extends FunctionalComponent<ToggleOptionProps> {}

export interface ToggleOptionProps {
  value: string;
  message?: object;
  intl: any;
}
