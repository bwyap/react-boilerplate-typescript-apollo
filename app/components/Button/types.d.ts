import { FunctionalComponent } from '../../typings/component';

export interface ButtonComponentFn extends FunctionalComponent<ButtonProps> {}

export interface ButtonProps {
  href?: string;
  children?: any;
  handleRoute?(): any;
  onClick?(): any;
}
