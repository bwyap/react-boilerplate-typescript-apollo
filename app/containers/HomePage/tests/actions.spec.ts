import { HomePageActionType } from '../store/constants';

import {
  createChangeUsernameAction,
  createChangeSearchAction,
} from '../store/actions';
import {
  ChangeUsernameAction,
  ChangeUsernameActionPayload,
  ChangeSearchAction,
  ChangeSearchActionPayload,
} from '../store/typings/actions';

describe('Home Actions', () => {
  describe('changeUsername', () => {
    it('should return the correct type and the passed name', () => {
      const fixture: ChangeUsernameActionPayload = {
        username: 'Max',
      };
      const expectedResult: ChangeUsernameAction = {
        type: HomePageActionType.CHANGE_USERNAME,
        payload: {
          username: 'Max',
        },
      };

      expect(createChangeUsernameAction(fixture)).toEqual(expectedResult);
    });
  });

  describe('changeSearch', () => {
    it('should return the correct type and the passed search', () => {
      const fixture: ChangeSearchActionPayload = {
        search: 'Max',
      };
      const expectedResult: ChangeSearchAction = {
        type: HomePageActionType.CHANGE_SEARCH,
        payload: {
          search: 'Max',
        },
      };

      expect(createChangeSearchAction(fixture)).toEqual(expectedResult);
    });
  });
});
