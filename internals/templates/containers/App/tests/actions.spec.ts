import { AppActionType } from '../store/constants';

import { createDefaultAction } from '../store/actions';
import { DefaultAction } from '../store/typings/actions';

describe('App Actions', () => {
  describe('defaultAction', () => {
    it('should return the correct type', () => {
      const expectedResult: DefaultAction = {
        type: AppActionType.DEFAULT_ACTION,
      };
      expect(createDefaultAction()).toEqual(expectedResult);
    });
  });
});
