/**
 * Component Generator
 */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
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
      default: 'Button',
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
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.tsx, types.d.ts and index.spec.tsx
    let componentTemplate;
    let typeTemplate;

    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './component/stateless.tsx.hbs';
        typeTemplate = './component/stateless.types.d.ts.hbs';
        break;
      }
      default: {
        componentTemplate = './component/class.tsx.hbs';
        typeTemplate = './component/class.types.d.ts.hbs';
      }
    }

    const actions = [
      // Create the index file
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/index.ts',
        templateFile: './component/index.ts.hbs',
        abortOnFail: true,
      },

      // Create the base component in the /parts directory
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/parts/{{properCase name}}.tsx',
        templateFile: componentTemplate,
        abortOnFail: true,
      },

      // Create component typings
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/types.d.ts',
        templateFile: typeTemplate,
        abortOnFail: true,
      },

      // Create component tests
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/tests/index.spec.tsx',
        templateFile: './component/test.tsx.hbs',
        abortOnFail: true,
      },

      // Create component stories
      {
        type: 'add',
        path: '../../app/components/{{properCase name}}/stories/{{ properCase name }}.stories.tsx',
        templateFile: './component/stories.tsx.hbs',
        abortOnFail: true,
      }
    ];

    // If component requires i18n messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/messages.ts',
        templateFile: './component/messages.ts.hbs',
        abortOnFail: true,
      });
    }

    // If component requires Loadable.js to load the component asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/Loadable.ts',
        templateFile: './component/loadable.ts.hbs',
        abortOnFail: true,
      });
    }

    // Prettify
    actions.push({
      type: 'prettify',
      path: '/components/',
    });

    return actions;
  },
};
