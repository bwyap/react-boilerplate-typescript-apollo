/*
 * AppActionTypes
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * To add your own constants, add it to the enum in this format:
 * YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT'
 */

export enum AppActionType {
  LOAD_REPOS = 'boilerplate/App/LOAD_REPOS',
  LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS',
  LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR',
}
