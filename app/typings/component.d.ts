import { ReactPropTypes } from 'react';

export interface FunctionalComponent<Props> {
  (props: Props): JSX.Element;
  propTypes?: { [key in keyof Props]: ReactPropTypes };
  defaultProps?: Partial<Props>;
}

export interface BasicFunctionalComponent {
  (): JSX.Element;
}
