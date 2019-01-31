/**
 * Test the HomePage
 */

import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { IntlProvider } from 'react-intl';

import { HomePage } from '../index';

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <HomePage />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
