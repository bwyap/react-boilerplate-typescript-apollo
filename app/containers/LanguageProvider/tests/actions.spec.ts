import { createChangeLocaleAction } from '../store/actions';

import { LanguageProviderActionType } from '../store/constants';

describe('LanguageProvider actions', () => {
  describe('Change Local Action', () => {
    it('has a type of CHANGE_LOCALE', () => {
      const expected = {
        type: LanguageProviderActionType.CHANGE_LOCALE,
        payload: { locale: 'de' },
      };
      expect(createChangeLocaleAction({ locale: 'de' })).toEqual(expected);
    });
  });
});
