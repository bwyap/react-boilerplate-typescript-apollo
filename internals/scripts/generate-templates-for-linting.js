/**
 * This script is for internal `react-boilerplate`'s usage. The only purpose of generating all of these templates is
 * to be able to lint them and detect critical errors. Every generated component's name has to start with
 * 'RbGen' so it can be easily excluded from the test coverage reports.
 */

const nodePlop = require('node-plop');
const path = require('path');
const chalk = require('chalk');
const rimraf = require('rimraf');

const xmark = require('./helpers/xmark');

process.chdir(path.join(__dirname, '../generators'));

const prettyStringify = data => JSON.stringify(data, null, 2);

const checkForErrors = result => {
  if (Array.isArray(result.failures) && result.failures.length > 0) {
    throw result.failures;
  }
};

const reportErrorsFor = title => err => {
  // TODO Replace with our own helpers/log that is guaranteed to be blocking?
  xmark(() =>
    console.error(
      chalk.red(` ERROR generating '${title}': `),
      prettyStringify(err),
    ),
  );
  process.exit(1);
};

// Generated tests are designed to fail, which would in turn fail CI builds
const removeTestsDirFrom = relativePath => () =>
  rimraf.sync(path.join(__dirname, '/../../app/', relativePath, '/tests'));

const plop = nodePlop('./index.js');

(async () => {
  // Component generators
  const componentGen = plop.getGenerator('component');
  componentGen
    .runActions({
      name: 'RBGenCompEsclass',
      type: 'React.Component',
      wantMessages: true,
      wantLoadable: true,
    })
    .then(checkForErrors)
    .then(removeTestsDirFrom('components/RBGenCompEsclass'))
    .catch(reportErrorsFor('component/React.Component'));
  
  componentGen
    .runActions({
      name: 'RBGenCompEsclasspure',
      type: 'React.PureComponent',
      wantMessages: true,
      wantLoadable: true,
    })
    .then(checkForErrors)
    .then(removeTestsDirFrom('components/RBGenCompEsclasspure'))
    .catch(reportErrorsFor('component/React.PureComponent'));
  
  componentGen
    .runActions({
      name: 'RBGenCompStatelessfunction',
      type: 'Stateless Function',
      wantMessages: true,
      wantLoadable: true,
    })
    .then(checkForErrors)
    .then(removeTestsDirFrom('components/RBGenCompStatelessfunction'))
    .catch(reportErrorsFor('component/Stateless Function'));
  
  // Container generators
  const containerGen = plop.getGenerator('container');
  try {
    const result = await containerGen
      .runActions({
        name: 'RBGenContPureComponent',
        type: 'React.PureComponent',
        wantHeaders: true,
        wantActionsAndReducer: true,
        wantSagas: true,
        wantMessages: true,
        wantLoadable: true,
      });
    await checkForErrors(result);
    await removeTestsDirFrom('containers/RBGenContPureComponent')();
  }
  catch (error) {
    reportErrorsFor('container/React.PureComponent')(error);
  }
  
  try {
    const result = await containerGen
      .runActions({
        name: 'RBGenContComponent',
        type: 'React.Component',
        wantHeaders: true,
        wantActionsAndReducer: true,
        wantSagas: true,
        wantMessages: true,
        wantLoadable: true,
      });
    await checkForErrors(result);
    await removeTestsDirFrom('containers/RBGenContComponent')();
  }
  catch (error) {
    reportErrorsFor('container/React.Component')(error);
  }
  
  try {
    const result = await containerGen
      .runActions({
        name: 'RBGenContStateless',
        type: 'Stateless Function',
        wantHeaders: true,
        wantActionsAndReducer: true,
        wantSagas: true,
        wantMessages: true,
        wantLoadable: true,
      });
    await checkForErrors(result);
    await removeTestsDirFrom('containers/RBGenContStateless')();
  }
  catch (error) {
    reportErrorsFor('container/Stateless');
  }
  
  // Language generators
  const languageGen = plop.getGenerator('language');
  try {
    await languageGen.runActions({ language: 'fr' }).catch(reportErrorsFor('language'));
  }
  catch (error) {
    reportErrorsFor('language')(error);
  }
})();
