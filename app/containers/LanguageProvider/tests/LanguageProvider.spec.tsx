import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import ConnectedLanguageProvider, {
  LanguageProvider,
} from '../parts/LanguageProvider';
import configureStore from '../../../configureStore';

import { translationMessages } from '../../../i18n';

const messages = defineMessages({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message',
  },
});

describe('<LanguageProvider />', () => {
  it('should render its children', () => {
    const children = <h1>Test</h1>;
    const { container } = render(
      <LanguageProvider messages={messages} locale="en">
        {children}
      </LanguageProvider>,
    );
    expect(container.firstChild).not.toBeNull();
  });
});

describe('<ConnectedLanguageProvider />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createBrowserHistory());
  });

  it('should render the default language messages', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <ConnectedLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>,
    );
    expect(queryByText(messages.someMessage.defaultMessage)).not.toBeNull();
  });
});
