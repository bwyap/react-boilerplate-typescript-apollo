import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import Footer from '../index';
import configureStore from '../../../configureStore';

describe('<Footer />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createBrowserHistory());
  });

  it('should render and match the snapshot', () => {
    const renderedComponent = renderer
      .create(
        <Provider store={store}>
          <IntlProvider locale="en">
            <Footer />
          </IntlProvider>
        </Provider>,
      )
      .toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });
});
