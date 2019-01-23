import { FunctionalComponent } from '../../typings/component';

export interface ToggleComponentFn extends FunctionalComponent<ToggleProps> {}

export interface ToggleProps {
  values?: any[];
  value?: string;
  messages?: object;
  onToggle?(evt: any): void;
}
