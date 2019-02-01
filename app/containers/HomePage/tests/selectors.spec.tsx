import {
  selectHome,
  makeSelectUsername,
  makeSelectSearch,
} from '../store/selectors';
import { HomePageReducerState } from '../store/typings/reducer';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState: HomePageReducerState = {
      username: '',
      search: '',
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

describe('makeSelectSearch', () => {
  const searchSelector = makeSelectSearch();
  it('should select the search value', () => {
    const search = 'mxstbr';
    const mockedState = {
      home: { search },
    };
    expect(searchSelector(mockedState as any)).toEqual(search);
  });
});
