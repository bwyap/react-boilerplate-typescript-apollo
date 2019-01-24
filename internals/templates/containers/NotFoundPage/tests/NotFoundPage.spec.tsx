/**
 * Testing the NotFoundPage
 */

import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { IntlProvider } from 'react-intl';

import NotFound from '../index';
import messages from '../messages';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <NotFound />
      </IntlProvider>,
    );
    expect(queryByText(messages.header.defaultMessage)).not.toBeNull();
  });
});
