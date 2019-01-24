import produce from 'immer';

import { AppReducerState } from '../store/typings/reducer';
import appReducer from '../store/reducer';
import { createDefaultAction } from '../store/actions';

describe('appReducer', () => {
  let state: AppReducerState;
  beforeEach(() => {
    state = {};
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle DefaultAction action correctly', () => {
    const expectedResult = produce(state, draft => {
      // Modify draft here
    });
    expect(appReducer(state, createDefaultAction())).toEqual(expectedResult);
  });
});
