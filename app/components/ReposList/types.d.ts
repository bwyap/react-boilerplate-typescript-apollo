import { FunctionalComponent } from '../../typings/component';

export interface ReposListComponentFn
  extends FunctionalComponent<ReposListProps> {}

export interface ReposListProps {
  loading?: boolean;
  error?: any;
  repos?: any[];
}
