import { AppActionType } from '../store/constants';

import {
  createLoadReposAction,
  createReposLoadedAction,
  createRepoLoadingErrorAction,
} from '../store/actions';

describe('App Actions', () => {
  describe('loadRepos', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: AppActionType.LOAD_REPOS,
      };

      expect(createLoadReposAction()).toEqual(expectedResult);
    });
  });

  describe('reposLoaded', () => {
    it('should return the correct type and the passed repos', () => {
      const fixture = ['Test'];
      const username = 'test';
      const expectedResult = {
        type: AppActionType.LOAD_REPOS_SUCCESS,
        payload: {
          repos: fixture,
          username,
        },
      };

      expect(
        createReposLoadedAction({
          repos: fixture,
          username,
        }),
      ).toEqual(expectedResult);
    });
  });

  describe('repoLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: AppActionType.LOAD_REPOS_ERROR,
        payload: { error: fixture },
      };

      expect(
        createRepoLoadingErrorAction({
          error: fixture,
        }),
      ).toEqual(expectedResult);
    });
  });
});
