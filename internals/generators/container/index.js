/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the base component type:',
      default: 'Stateless Function',
      choices: () => [
        'Stateless Function',
        'React.PureComponent',
        'React.Component',
      ],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this container?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.tsx, types.d.ts and index.test.tsx
    let componentTemplate;
    let typeTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './container/stateless.tsx.hbs';
        typeTemplate = './container/stateless.types.d.ts.hbs';
        break;
      }
      default: {
        componentTemplate = './container/class.tsx.hbs';
        typeTemplate = './container/class.types.d.ts.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/index.tsx',
        templateFile: './container/index.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/parts/{{ properCase name }}.tsx',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/types.d.ts',
        templateFile: typeTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/index.spec.tsx',
        templateFile: './container/test.tsx.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/messages.ts',
        templateFile: './container/messages.ts.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.ts, constants.ts,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/store/actions.ts',
        templateFile: './container/actions.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/store/typings/actions.d.ts',
        templateFile: './container/actions.d.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/actions.spec.ts',
        templateFile: './container/actions.spec.ts.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/store/constants.ts',
        templateFile: './container/constants.ts.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/store/selectors.ts',
        templateFile: './container/selectors.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path:
          '../../app/containers/{{properCase name}}/tests/selectors.spec.ts',
        templateFile: './container/selectors.spec.ts.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/store/reducer.ts',
        templateFile: './container/reducer.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/store/typings/reducer.d.ts',
        templateFile: './container/reducer.d.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/reducer.spec.ts',
        templateFile: './container/reducer.spec.ts.hbs',
        abortOnFail: true,
      });
      
      // Typings
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export interface MyInjectedReducers {\n([ a-zA-Z?:<>,]*;\n)+)/g,
        templateFile: './container/injected-reducers.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export interface MyInjectedReducers) ({}\n)/g,
        templateFile: './container/injected-reducers-empty.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export interface MyInjectedSagas {\n([ a-zA-Z?:<>,]*;\n)+)/g,
        templateFile: './container/injected-sagas.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export interface MyInjectedSagas) ({}\n)/g,
        templateFile: './container/injected-sagas-empty.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export interface MyInjectedReducerState {\n([ a-zA-Z?:<>,]*;\n)+)/g,
        templateFile: './container/injected-reducer-state.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export interface MyInjectedReducerState) ({}\n)/g,
        templateFile: './container/injected-reducer-state-empty.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(import \{ [a-zA-Z]+ \} from '\.\.\/containers\/[a-zA-Z]+\/store\/typings\/reducer';\n)(?!.*import { [a-zA-Z]+ } from '\.\.\/containers\/[a-zA-Z]+\/store\/typings\/reducer';*)/g,
        templateFile: './container/store-imports.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(import \{ [a-zA-Z]+ \} from '\.\.\/containers\/[a-zA-Z]+\/store\/typings\/actions';\n)(?!.*import { [a-zA-Z]+ } from '\.\.\/containers\/[a-zA-Z]+\/store\/typings\/actions';*)/g,
        templateFile: './container/action-imports.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /((export type MyInjectedActions =\n)(  \| [A-Za-z]+\n)*(  \| [A-Za-z]+))(;\n)/g,
        templateFile: './container/action-type-imports.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export type MyInjectedActions =)( undefined;)/g,
        templateFile: './container/action-type-imports-undefined.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export type MyInjectedActions =)( ([a-zA-Z]+Actions);)/g,
        templateFile: './container/action-type-imports-single.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/store/saga.ts',
        templateFile: './container/saga.ts.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/saga.spec.ts',
        templateFile: './container/saga.spec.ts.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/Loadable.ts',
        templateFile: './component/loadable.ts.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/containers/',
    });

    actions.push({
      type: 'prettify-dir',
      path: '/typings/',
    });

    return actions;
  },
};
