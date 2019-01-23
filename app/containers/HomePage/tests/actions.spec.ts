import { HomePageActionType } from '../store/constants';

import { createChangeUsernameAction } from '../store/actions';
import {
  ChangeUsernameAction,
  ChangeUsernameActionPayload,
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
});
