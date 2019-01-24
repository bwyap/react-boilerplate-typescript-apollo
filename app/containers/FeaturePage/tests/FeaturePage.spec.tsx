import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { IntlProvider } from 'react-intl';

import FeaturePage from '../index';

describe('<FeaturePage />', () => {
  it('should render its heading', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <FeaturePage />
      </IntlProvider>,
    );

    expect(firstChild).toMatchSnapshot();
  });

  it('should never re-render the component', () => {
    const shouldComponentUpdateMock = jest.spyOn(
      FeaturePage.prototype,
      'shouldComponentUpdate',
    );
    const { rerender } = render(
      <IntlProvider locale="en">
        <FeaturePage />
      </IntlProvider>,
    );

    const NewFeaturePage: any = FeaturePage;

    rerender(
      <IntlProvider locale="en">
        <NewFeaturePage test="dummy" />
      </IntlProvider>,
    );

    expect(shouldComponentUpdateMock).toHaveReturnedWith(false);
  });
});
