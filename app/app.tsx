/**
 * app.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// // Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ApolloProvider } from 'react-apollo';
import * as FontFaceObserver from 'fontfaceobserver';
import history from './utils/history';
import 'sanitize.css/sanitize.css';

// Import Language Provider
import LanguageProvider from './containers/LanguageProvider';

// Import Apollo Client
import generateClient from './graphql/client';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess';

import configureStore from './configureStore';

// Import i18n messages
import { translationMessages } from './i18n';

(async () => {
  // Observe loading of Open Sans (to remove open sans, remove the <link> tag in
  // the index.html file and this observer)
  const openSansObserver = new FontFaceObserver('Open Sans', {});

  // When Open Sans is loaded, add a font-family using Open Sans to the body
  openSansObserver
    .load()
    .then(() => {
      document.body.classList.add('fontLoaded');
    })
    // tslint:disable-next-line
    .catch(console.error);

  // Create redux store with history
  const initialState = {};
  const store = configureStore(initialState, history);
  const MOUNT_NODE = document.getElementById('app');

  const client = await generateClient(store);

  const render = async messages => {
    const App = (await import('./containers/App')).default;
    ReactDOM.render(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <LanguageProvider messages={messages}>
            <ConnectedRouter history={history}>
              <App />
            </ConnectedRouter>
          </LanguageProvider>
        </ApolloProvider>
      </Provider>,
      MOUNT_NODE,
    );
  };

  if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', 'containers/App'], async () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render(translationMessages)
        // tslint:disable-next-line
        .catch(console.error);
    });
  }

  // Chunked polyfill for browsers without Intl support
  if (!(window as any).Intl) {
    const translations = [
      'intl/locale-data/jsonp/en.js',
      'intl/locale-data/jsonp/de.js',
    ];
    new Promise(resolve => {
      resolve(import('intl'));
    })
      .then(() => Promise.all(translations.map(t => import(t))))
      .then(() => render(translationMessages))
      .catch(err => {
        throw err;
      });
  } else {
    render(translationMessages)
      // tslint:disable-next-line
      .catch(console.error);
  }

  // Install ServiceWorker and AppCache in the end since
  // it's not most important operation and if main code fails,
  // we do not want it installed
  if (process.env.NODE_ENV === 'production') {
    // tslint:disable:no-var-requires
    require('offline-plugin/runtime').install();
  }
})();
