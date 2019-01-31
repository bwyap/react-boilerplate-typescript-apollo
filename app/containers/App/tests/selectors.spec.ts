import {
  selectApp,
  makeSelectLocation,
  makeSelectLocationPathname,
} from '../store/selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const appState = {};
    const mockedState = {
      app: appState,
    };
    expect(selectApp(mockedState as any)).toEqual(appState);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(locationStateSelector(mockedState as any)).toEqual(router.location);
  });
});

describe('makeSelectLocationPathname', () => {
  const locationPathnameStateSelector = makeSelectLocationPathname();
  it('should select the location pathname', () => {
    const router = {
      location: { pathname: '/foo' },
    };
    const mockedState = {
      router,
    };
    expect(locationPathnameStateSelector(mockedState as any)).toEqual(
      router.location.pathname,
    );
  });
});
