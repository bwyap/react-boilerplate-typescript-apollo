import * as PropTypes from 'prop-types';

export interface FunctionalComponent<Props> {
  (props: Props): JSX.Element;
  propTypes?: {
    [key in keyof Props]: PropTypes.Requireable<any> | PropTypes.Validator<any>
  };
  defaultProps?: Partial<Props>;
}

export interface BasicFunctionalComponent {
  (): JSX.Element;
}
