import * as React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import LocaleToggle, { mapDispatchToProps } from '../parts/LocaleToggle';
import { createChangeLocaleAction } from '../../LanguageProvider/store/actions';
import LanguageProvider from '../../LanguageProvider';

import configureStore from '../../../configureStore';
import { translationMessages } from '../../../i18n';

describe('<LocaleToggle />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, createBrowserHistory());
  });

  it('should match the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should present the default `en` english language option', () => {
    const { container } = render(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <LocaleToggle />
        </LanguageProvider>
      </Provider>,
    );
    expect(container.querySelector('option[value="en"]')).not.toBeNull();
  });

  describe('mapDispatchToProps', () => {
    describe('onLocaleToggle', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch, {});
        expect(result.onLocaleToggle).toBeDefined();
      });

      it('should dispatch changeLocale when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch, {});
        const locale = 'de';
        result.onLocaleToggle({ target: { value: locale } });
        expect(dispatch).toHaveBeenCalledWith(
          createChangeLocaleAction({ locale }),
        );
      });
    });
  });
});
