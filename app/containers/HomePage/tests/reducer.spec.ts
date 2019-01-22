import produce from 'immer';

import homeReducer from '../store/reducer';
import { createChangeUsernameAction } from '../store/actions';
import { ChangeUsernameActionPayload } from '../store/typings/actions';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      username: '',
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
});
