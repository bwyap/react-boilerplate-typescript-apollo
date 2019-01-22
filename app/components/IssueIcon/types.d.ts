import { FunctionalComponent } from '../../typings/component';
import { SVGProps } from 'react';

export interface IssueIconComponentFn
  extends FunctionalComponent<IssueIconProps> {}

export interface IssueIconProps extends SVGProps<any> {
  className?: string;
}
