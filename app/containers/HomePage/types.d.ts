import { ApolloClient } from 'apollo-boost';

export interface HomePageProps {
  client?: ApolloClient<any>;
}

export interface HomePageDispatchProps {
  onChangeUsername?(evt?: any);
  onChangeSearch?(evt?: any);
  onSubmitForm?(evt?: any);
}

export interface HomePageStateProps {
  repos?: any[];
  username?: string;
  search?: string;
  loading?: boolean;
  error?: any;
}

export interface HomePageMergedProps
  extends HomePageProps,
    HomePageDispatchProps,
    HomePageStateProps {}
