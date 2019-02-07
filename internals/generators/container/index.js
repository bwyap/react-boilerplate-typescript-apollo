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
      default: 'React.PureComponent',
      choices: () => [
        // 'Stateless Function', // do not use stateless functions
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
      // Create the index file
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/index.tsx',
        templateFile: './container/index.ts.hbs',
        abortOnFail: true,
      },

      // Create the base component in the /parts directory
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/parts/{{ properCase name }}.tsx',
        templateFile: componentTemplate,
        abortOnFail: true,
      },

      // Create component typings
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/types.d.ts',
        templateFile: typeTemplate,
        abortOnFail: true,
      },

      // Create component tests
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/tests/index.spec.tsx',
        templateFile: './container/test.tsx.hbs',
        abortOnFail: true,
      },

      // Create component stories
      {
        type: 'add',
        path: '../../app/containers/{{properCase name}}/stories/{{ properCase name }}.stories.tsx',
        templateFile: './component/stories.tsx.hbs',
        abortOnFail: true,
      }
    ];

    // If component requires i18n messages
    if (data.wantMessages) {
      // Create messages
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/messages.ts',
        templateFile: './container/messages.ts.hbs',
        abortOnFail: true,
      });
    }

    // If component requires actions and reducer
    if (data.wantActionsAndReducer) {
      // Add actions, typings and tests
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

      // Define constants
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/store/constants.ts',
        templateFile: './container/constants.ts.hbs',
        abortOnFail: true,
      });

      // Create selectors and tests
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

      // Create reducer, typings and tests
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
      
      // If in testing environment
      if (data.test) {
        // Back up files that will be modified so we can restore them
        actions.push({
          type: 'backup',
          path: '../../app/typings',
          file: 'store-injected.d.ts',
        });
      }

      // Typings

      // Export reducers
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export interface MyInjectedReducers {\n([ a-zA-Z_0-9?:<>,]*;\n)+)/g,
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

      // Export sagas
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export interface MyInjectedSagas {\n([ a-zA-Z_0-9?:<>,]*;\n)+)/g,
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

      // Export reducer state
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export interface MyInjectedReducerState {\n([ a-zA-Z_0-9?:<>,]*;\n)+)/g,
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

      // Import reducer typings
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(import \{ [a-zA-Z_0-9]+ \} from '@cccv\/containers\/[a-zA-Z_0-9]+\/store\/typings\/reducer';\n)(?!.*import { [a-zA-Z_0-9]+ } from '@cccv\/containers\/[a-zA-Z_0-9]+\/store\/typings\/reducer';*)/g,
        templateFile: './container/store-imports.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(\/\/ Reducer state imports\n)(?!.*import { [a-zA-Z_0-9]+ } from '@cccv\/containers\/[a-zA-Z_0-9]+\/store\/typings\/reducer';*)/g,
        templateFile: './container/store-imports.hbs',
        abortOnFail: true,
      });

      // Import action typings
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(import \{ [a-zA-Z_0-9]+ \} from '@cccv\/containers\/[a-zA-Z_0-9]+\/store\/typings\/actions';\n)(?!.*import { [a-zA-Z_0-9]+ } from '@cccv\/containers\/[a-zA-Z_0-9]+\/store\/typings\/actions';*)/g,
        templateFile: './container/action-imports.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(\/\/ Action imports\n)(?!.*import { [a-zA-Z_0-9]+ } from '@cccv\/containers\/[a-zA-Z_0-9]+\/store\/typings\/actions';*)/g,
        templateFile: './container/action-imports.hbs',
        abortOnFail: true,
      });

      // Export action typings as a union type
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /((export type MyInjectedActions =\n)(  \| [a-zA-Z_0-9]+\n)*(  \| [a-zA-Z_0-9]+))(;\n)/g,
        templateFile: './container/action-type-imports.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export type MyInjectedActions =)( ([a-zA-Z_0-9]+Actions);)/g,
        templateFile: './container/action-type-imports-single.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export type MyInjectedActions =)( ((?:[a-zA-Z_0-9]+Actions(?: \| )?)+);)/g,
        templateFile: './container/action-type-imports-single.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'modify',
        path: '../../app/typings/store-injected.d.ts',
        pattern: /(export type MyInjectedActions =)( undefined;)/g,
        templateFile: './container/action-type-imports-undefined.hbs',
        abortOnFail: true,
      });
    }

    // If component requires sagas
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

    // If component requires Loadable.js to load the component asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/containers/{{properCase name}}/Loadable.ts',
        templateFile: './component/loadable.ts.hbs',
        abortOnFail: true,
      });
    }

    // Prettify
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
