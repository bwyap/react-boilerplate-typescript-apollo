export interface FunctionalComponent<Props> {
  (props: Props): JSX.Element;
  propTypes?: object;
}

export interface BasicFunctionalComponent {
  (): JSX.Element;
}
