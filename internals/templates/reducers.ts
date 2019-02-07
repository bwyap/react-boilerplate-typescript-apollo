/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { connectRouter } from 'connected-react-router';

// Use custom implementatin of `combineReducers`
// import { combineReducers } from 'redux';
import combineReducers from './utils/combineReducers';

import history from './utils/history';
import appReducer from './containers/App/store/reducer';
import languageProviderReducer from './containers/LanguageProvider/store/reducer';
import { MyInjectedReducers } from './typings/store-injected';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
const createReducer = (injectedReducers: MyInjectedReducers = {}) => {
  const rootReducer = combineReducers({
    app: appReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
};

export default createReducer;
