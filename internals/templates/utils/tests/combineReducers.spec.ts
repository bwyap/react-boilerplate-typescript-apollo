import { Reducer } from 'redux';

import combineReducers from '../combineReducers';

describe('combineReducers', () => {
  describe('handling valid reducers', () => {
    let reducer: Reducer;

    const reducers = {
      identity: state => state,
      counter: (state, action) => {
        switch (action.type) {
          case 'INCREMENT':
            return { ...state, counter: state.value + 1 };
          case 'DECREMENT':
            return { ...state, counter: state.value - 1 };
          default:
            return state;
        }
      },
    };

    const initialState = {
      identity: 'hello world',
      counter: {
        value: 0,
      },
    };

    beforeEach(() => {
      reducer = combineReducers(reducers);
    });

    it('combines reducers into a valid reducer', () => {
      const finalState = reducer(initialState, { type: 'UNRECOGNISED_ACTION' });
      expect(finalState).toEqual(initialState);
    });

    it('adds injected state back to the state', () => {
      const stateWithInjectedValues = {
        ...initialState,
        injected: { world: 'hello' },
      };
      const finalState = reducer(stateWithInjectedValues, {
        type: 'UNRECOGNISED_ACTION',
      });
      expect(finalState).toEqual(stateWithInjectedValues);
    });
  });

  describe('handling invalid reducers', () => {
    let errorSpy;

    beforeEach(() => (errorSpy = jest.spyOn(global.console, 'error')));

    const reducers = {
      identity: state => state,
      counter: (state, action) => {
        switch (action.type) {
          case 'INCREMENT':
            return { ...state, counter: state.value + 1 };
          case 'DECREMENT':
            return { ...state, counter: state.value - 1 };
          default:
            return state;
        }
      },
    };

    const initialState = {
      identity: 'hello world',
      counter: {
        value: 0,
      },
    };

    it('logs an error when trying to use an empty reducer', () => {
      const reducer = combineReducers({});
      const finalState = reducer(initialState, { type: 'UNRECOGNISED_ACTION' });
      expect(finalState).toEqual(initialState);
      expect(errorSpy).toHaveBeenCalled();
    });

    it('does not add an undefined reducer', () => {
      const reducer = combineReducers({
        ...reducers,
        undefined,
      });
      const finalState = reducer(initialState as any, {
        type: 'UNRECOGNISED_ACTION',
      });
      expect(errorSpy).toHaveBeenCalled();
      expect(finalState.undefined).toBeUndefined();
    });

    it('throws an error when a reducer returns an undefined state', () => {
      const reducer = combineReducers({
        ...reducers,
        defaultUndefined: (state, action) => {
          switch (action.type) {
            case 'IDENTITY':
              return state;
          }
        },
      });
      const test = () => {
        reducer(initialState as any, {
          type: 'UNRECOGNISED_ACTION',
        });
      };
      expect(test).toThrow();
      expect(errorSpy).toHaveBeenCalled();
    });

    it('throws an error when a reducer returns an undefined state (undefined action)', () => {
      const reducer = combineReducers({
        ...reducers,
        defaultUndefined: (state, action) => {
          switch (action.type) {
            case 'IDENTITY':
              return state;
          }
        },
      });
      const test = () => {
        reducer(initialState as any, { type: undefined });
      };
      expect(test).toThrow();
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
