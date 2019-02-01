import ApolloClient, { PresetConfig } from 'apollo-boost';

import loadEnvironment from '../env';
import { MyReduxStore } from '../typings/store';

/**
 * Create Apollo Client
 */
export default async (store: MyReduxStore) => {
  const env = await loadEnvironment();

  const config: PresetConfig = {
    uri: `${env.example}/graphql`,
    fetchOptions: {
      headers: {
        // Add authorization to each request here
        // authorization: store.getState().app.token,
      },
    },
  };

  return new ApolloClient(config);
};
