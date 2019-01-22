/**
 * Test the HomePage
 */

import * as React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { IntlProvider } from 'react-intl';

import { HomePage, mapDispatchToProps } from '../index';
import { createChangeUsernameAction } from '../store/actions';
import { createLoadReposAction } from '../../App/store/actions';

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale="en">
        <HomePage loading={false} error={null} repos={[]} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should render fetch the repos on mount if a username exists', () => {
    const submitSpy = jest.fn();
    const empty = () => null;
    render(
      <IntlProvider locale="en">
        <HomePage
          username="Not Empty"
          onChangeUsername={empty}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>,
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should not call onSubmitForm if username is an empty string', () => {
    const submitSpy = jest.fn();
    const empty = () => null;
    render(
      <IntlProvider locale="en">
        <HomePage onChangeUsername={empty} onSubmitForm={submitSpy} />
      </IntlProvider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should not call onSubmitForm if username is null', () => {
    const submitSpy = jest.fn();
    const empty = () => null;
    render(
      <IntlProvider locale="en">
        <HomePage
          username=""
          onChangeUsername={empty}
          onSubmitForm={submitSpy}
        />
      </IntlProvider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeUsername', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch, {});
        expect(result.onChangeUsername).toBeDefined();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch, {});
        const username = 'mxstbr';
        result.onChangeUsername({ target: { value: username } });
        expect(dispatch).toHaveBeenCalledWith(
          createChangeUsernameAction({ username }),
        );
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch, {});
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch loadRepos when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch, {});
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(createLoadReposAction());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const empty = () => null;
        const result = mapDispatchToProps(empty, {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});