import {
  selectApp,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
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

describe('makeSelectCurrentUser', () => {
  const currentUserSelector = makeSelectCurrentUser();
  it('should select the current user', () => {
    const username = 'mxstbr';
    const mockedState = {
      app: {
        currentUser: username,
      },
    };
    expect(currentUserSelector(mockedState as any)).toEqual(username);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      app: {
        loading,
      },
    };
    expect(loadingSelector(mockedState as any)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = {
      app: {
        error,
      },
    };
    expect(errorSelector(mockedState as any)).toEqual(error);
  });
});

describe('makeSelectRepos', () => {
  const reposSelector = makeSelectRepos();
  it('should select the repos', () => {
    const repositories = [];
    const mockedState = {
      app: {
        userData: {
          repositories,
        },
      },
    };
    expect(reposSelector(mockedState as any)).toEqual(repositories);
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
