import languageProviderReducer from '../store/reducer';
import { LanguageProviderActionType } from '../store/constants';
import { ChangeLocaleAction } from '../store/typings/actions';

describe('languageProviderReducer', () => {
  it('returns the initial state', () => {
    expect(languageProviderReducer(undefined, {} as any)).toEqual({
      locale: 'en',
    });
  });

  it('changes the locale', () => {
    const action: ChangeLocaleAction = {
      type: LanguageProviderActionType.CHANGE_LOCALE,
      payload: { locale: 'de' },
    };
    expect(languageProviderReducer(undefined, action)).toEqual({
      locale: 'de',
    });
  });
});
