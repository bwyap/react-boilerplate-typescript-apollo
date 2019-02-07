import { createStore } from 'redux';
import {
  PersistAction,
  defaultConfig,
  loadState,
  saveState,
  createPersistMiddleware,
} from '../persistMiddleware';

describe('persistMiddleware', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    localStorage.clear();
  });

  describe('saveState', () => {
    it('saves state correctly and saves it to local storage', () => {
      const state = { hello: 'world' };
      saveState(defaultConfig)(dispatch, state);
      const parsedState = JSON.parse(localStorage.getItem('state'));
      expect(parsedState).toEqual(state);
      expect(dispatch).not.toHaveBeenCalled();
    });
    it('saves correct parts of the state', () => {
      const state = {
        hello: 'world',
        world: 'hello',
        nested1: { hello: 'world' },
        nested2: { world: 'hello' },
      };
      saveState({
        ...defaultConfig,
        blacklist: ['world', 'nested1'],
      })(dispatch, state);
      const parsedState = JSON.parse(localStorage.getItem('state'));
      expect(parsedState).toEqual({
        hello: 'world',
        nested2: { world: 'hello' },
      });
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('loadState', () => {
    it('loads the state correctly', () => {
      const state = { hello: 'world' };
      localStorage.setItem('state', JSON.stringify(state));
      const parsedState = loadState(defaultConfig)(dispatch);
      expect(parsedState).toEqual(state);
      expect(dispatch).not.toHaveBeenCalled();
    });
    it('loads the initial state when localstorage is empty', () => {
      const state = { hello: 'world' };
      const parsedState = loadState(defaultConfig)(dispatch, state);
      expect(parsedState).toEqual(state);
      expect(dispatch).not.toHaveBeenCalled();
    });
    it('merges the state correctly', () => {
      const state = { hello: 'world' };
      localStorage.setItem('state', JSON.stringify(state));
      const parsedState = loadState(defaultConfig)(dispatch, {
        hello: 'me',
        world: 'hello',
      });
      expect(parsedState).toEqual({ hello: 'world', world: 'hello' });
      expect(dispatch).not.toHaveBeenCalled();
    });
  });

  describe('createMiddleware', () => {
    it('saves the state when @@persist/SAVE is received', () => {
      const initialState = { hello: 'world' };
      const store = createStore((state, action) => state, initialState);
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      const { persistMiddleware } = createPersistMiddleware();
      // Check that the initial state is returned
      expect(store.getState()).toEqual(initialState);
      // Run the middleware
      persistMiddleware(store)(store.dispatch)({ type: PersistAction.SAVE });
      // Check that the state was saved correctly
      expect(dispatchSpy).toBeCalledWith({ type: PersistAction.SAVE });
      expect(JSON.parse(localStorage.getItem('state'))).toEqual({
        hello: 'world',
      });
    });
    it('loads the state when @@persist/LOAD is received', () => {
      const initialState = { hello: 'world' };
      const store = createStore((state, action) => state, initialState);
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      const { persistMiddleware } = createPersistMiddleware();
      // Check that the initial state is returned
      expect(store.getState()).toEqual(initialState);
      // Save something to state
      localStorage.setItem(
        'state',
        JSON.stringify({ hello: 'me', world: 'hello' }),
      );
      // Run the middleware
      persistMiddleware(store)(store.dispatch)({ type: PersistAction.LOAD });
      // Check that the state was loaded correctly
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: PersistAction.LOAD,
        payload: {
          hello: 'me',
          world: 'hello',
        },
      });
    });
    it('continues when an action is recieved', () => {
      const store = createStore((state, action) => state);
      const dispatchSpy = jest.spyOn(store, 'dispatch');
      const { persistMiddleware } = createPersistMiddleware();
      // Run the middleware
      persistMiddleware(store)(store.dispatch)({ type: 'ACTION' });
      // Check that the middleware continues
      expect(dispatchSpy).toHaveBeenCalled();
    });
  });
});
