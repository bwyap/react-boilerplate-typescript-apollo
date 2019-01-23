import produce from 'immer';

import appReducer from '../store/reducer';
import {
  createLoadReposAction,
  createReposLoadedAction,
  createRepoLoadingErrorAction,
} from '../store/actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: null,
      currentUser: null,
      userData: {
        repositories: null,
      },
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {} as any)).toEqual(expectedResult);
  });

  it('should handle the loadRepos action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = null;
      draft.userData.repositories = null;
    });

    expect(appReducer(state, createLoadReposAction())).toEqual(expectedResult);
  });

  it('should handle the reposLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ];
    const username = 'test';
    const expectedResult = produce(state, draft => {
      draft.userData.repositories = fixture;
      draft.loading = false;
      draft.currentUser = username;
    });

    expect(
      appReducer(
        state,
        createReposLoadedAction({
          repos: fixture,
          username,
        }),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the repoLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.error = fixture;
      draft.loading = false;
    });

    expect(
      appReducer(state, createRepoLoadingErrorAction({ error: fixture })),
    ).toEqual(expectedResult);
  });
});
