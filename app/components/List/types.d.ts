import { FunctionalComponent } from '../../typings/component';
import { ConnectedComponentClass } from 'react-redux';

export interface ListComponentFn extends FunctionalComponent<ListProps> {}

export interface ListProps {
  component: any;
  items?: any[];
}
