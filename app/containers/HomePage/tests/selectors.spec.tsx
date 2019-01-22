import { selectHome, makeSelectUsername } from '../store/selectors';
import { HomePageReducerState } from '../store/typings/reducer';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState: HomePageReducerState = {
      username: '',
    };
    const mockedState = {
      home: homeState,
    };
    expect(selectHome(mockedState as any)).toEqual(homeState);
  });
});

describe('makeSelectUsername', () => {
  const usernameSelector = makeSelectUsername();
  it('should select the username', () => {
    const username = 'mxstbr';
    const mockedState = {
      home: { username },
    };
    expect(usernameSelector(mockedState as any)).toEqual(username);
  });
});
