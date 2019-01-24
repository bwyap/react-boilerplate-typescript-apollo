import { selectHome } from '../store/selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const homeState = {};
    const mockedState = {
      home: homeState,
    };
    expect(selectHome(mockedState as any)).toEqual(homeState);
  });
});
