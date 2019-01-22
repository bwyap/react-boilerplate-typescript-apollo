import { FunctionalComponent } from '../../typings/component';

export interface ListItemComponentFn
  extends FunctionalComponent<ListItemProps> {}

export interface ListItemProps {
  className?: string;
  item?: any;
}
