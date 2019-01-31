import produce from 'immer';

import homeReducer from '../store/reducer';
import {
  createChangeUsernameAction,
  createChangeSearchAction,
} from '../store/actions';
import {
  ChangeUsernameActionPayload,
  ChangeSearchActionPayload,
} from '../store/typings/actions';
import { HomePageReducerState } from '../store/typings/reducer';

describe('homeReducer', () => {
  let state: HomePageReducerState;
  beforeEach(() => {
    state = {
      username: '',
      search: '',
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle the changeUsername action correctly', () => {
    const fixture: ChangeUsernameActionPayload = {
      username: 'mxstbr',
    };
    const expectedResult = produce(state, draft => {
      draft.username = fixture.username;
    });

    expect(homeReducer(state, createChangeUsernameAction(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the changeSearch action correctly', () => {
    const fixture: ChangeSearchActionPayload = {
      search: 'mxstbr',
    };
    const expectedResult = produce(state, draft => {
      draft.search = fixture.search;
    });

    expect(homeReducer(state, createChangeSearchAction(fixture))).toEqual(
      expectedResult,
    );
  });
});
