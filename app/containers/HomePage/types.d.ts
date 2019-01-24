export interface HomePageProps {}

export interface HomePageDispatchProps {
  onChangeUsername?(evt?: any);
  onSubmitForm?(evt?: any);
}

export interface HomePageStateProps {
  repos?: any[];
  username?: string;
  loading?: boolean;
  error?: any;
}

export interface HomePageMergedProps
  extends HomePageProps,
    HomePageDispatchProps,
    HomePageStateProps {}
