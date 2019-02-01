/**
 * Test the HomePage
 */

import * as React from 'react';
import * as sinon from 'sinon';
import {
  render,
  fireEvent,
  wait,
  getByPlaceholderText,
  getByDisplayValue,
  getByTestId,
  queryByTestId,
} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import { IntlProvider } from 'react-intl';
import { MockedProvider } from 'react-apollo/test-utils';

import { HomePage, mapDispatchToProps } from '../index';
import {
  createChangeUsernameAction,
  createChangeSearchAction,
} from '../store/actions';
import { createLoadReposAction } from '../../App/store/actions';

describe('<HomePage />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <MockedProvider>
        <IntlProvider locale="en">
          <HomePage loading={false} error={null} repos={[]} />
        </IntlProvider>
      </MockedProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('search github', () => {
    it('should fetch the repos on mount if a username exists', () => {
      const submitSpy = jest.fn();
      const empty = () => null;
      render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              username="Not Empty"
              onChangeSearch={empty}
              onChangeUsername={empty}
              onSubmitForm={submitSpy}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      expect(submitSpy).toHaveBeenCalled();
    });

    it('should not call onSubmitForm if username is undefined', () => {
      const submitSpy = jest.fn();
      const empty = () => null;
      render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              onChangeUsername={empty}
              onChangeSearch={empty}
              onSubmitForm={submitSpy}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      expect(submitSpy).not.toHaveBeenCalled();
    });

    it('should not call onSubmitForm if username is an empty string', () => {
      const submitSpy = jest.fn();
      const empty = () => null;
      render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              username=""
              onChangeUsername={empty}
              onChangeSearch={empty}
              onSubmitForm={submitSpy}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      expect(submitSpy).not.toHaveBeenCalled();
    });

    it('should execute the query when the username form is submitted', () => {
      const querySpy: any = jest.fn();
      const empty = () => null;
      const { container } = render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              username="hello"
              onChangeSearch={empty}
              onChangeUsername={empty}
              onSubmitForm={querySpy}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      fireEvent.submit(getByDisplayValue(container, 'hello'));
      expect(querySpy).toHaveBeenCalled();
    });
  });

  describe('search spotify', () => {
    it('should fetch artists on mount if a search exists', async () => {
      const querySpy: any = jest.fn();
      const empty = () => null;
      const { container } = render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              search="Not Empty"
              onChangeSearch={empty}
              onChangeUsername={empty}
              client={{ query: querySpy } as any}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      // Wait for async mount
      await wait(() => getByPlaceholderText(container, 'the script'));
      expect(querySpy).toHaveBeenCalled();
    });

    it('should not fetch artists if search is undefined', () => {
      const querySpy: any = jest.fn();
      const empty = () => null;
      render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              onChangeSearch={empty}
              onChangeUsername={empty}
              client={{ query: querySpy } as any}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      expect(querySpy).not.toHaveBeenCalled();
    });

    it('should not fetch artists if search is an empty string', () => {
      const querySpy: any = jest.fn();
      const empty = () => null;
      render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              search=""
              onChangeSearch={empty}
              onChangeUsername={empty}
              client={{ query: querySpy } as any}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      expect(querySpy).not.toHaveBeenCalled();
    });

    it('should execute the query when the search form is submitted', () => {
      const querySpy: any = jest.fn();
      const empty = () => null;
      const { container } = render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              search="hello"
              onChangeSearch={empty}
              onChangeUsername={empty}
              client={{ query: querySpy } as any}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      fireEvent.submit(getByDisplayValue(container, 'hello'));
      expect(querySpy).toHaveBeenCalled();
    });

    it('should show loading when the search query is loading', () => {
      const empty = () => null;
      const mockClient = sinon.stub();
      mockClient.callsFake(() => Promise.resolve());
      const { container } = render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              search="hello"
              onChangeSearch={empty}
              onChangeUsername={empty}
              client={{ query: mockClient } as any}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      expect(getByTestId(container, 'loading')).toBeDefined();
      expect(mockClient.args[0][0].variables).toEqual({
        byName: 'hello',
      });
    });

    it('should show data when the search query is done', async () => {
      const empty = () => null;
      const mockClient = jest.fn();
      mockClient.mockReturnValue(
        Promise.resolve({
          data: {
            queryArtists: [
              {
                id: '1234',
                name: 'hello',
                image: 'http://image.io/hello',
                albums: [{ id: '1234', album: 'album' }],
              },
            ],
          },
        }),
      );
      const { container } = render(
        <MockedProvider>
          <IntlProvider locale="en">
            <HomePage
              search="hello"
              onChangeSearch={empty}
              onChangeUsername={empty}
              client={{ query: mockClient } as any}
            />
          </IntlProvider>
        </MockedProvider>,
      );
      await wait(() => getByDisplayValue(container, 'hello'));
      expect(queryByTestId(container, 'loading')).toBeNull();
      expect(container.firstChild).toMatchSnapshot();
    });
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

    describe('onChangeSearch', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch, {});
        expect(result.onChangeSearch).toBeDefined();
      });

      it('should dispatch onChangeSearch when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch, {});
        const search = 'the script';
        result.onChangeSearch({ target: { value: search } });
        expect(dispatch).toHaveBeenCalledWith(
          createChangeSearchAction({ search }),
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
