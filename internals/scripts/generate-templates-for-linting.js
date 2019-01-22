/**
 * This script is for internal `react-boilerplate`'s usage. The only purpose of generating
 * all of these templates is to be able to lint them and detect critical errors. Every
 * generated component's name starts with 'RbGen' and any modified file is backed up by
 * a file with the same name with an added 'rbgen' extension so that it can be easily
 * excluded from the test coverage reports.
 */

const chalk = require('chalk');
const fs = require('fs');
const nodePlop = require('node-plop');
const path = require('path');
const rimraf = require('rimraf');
const shell = require('shelljs');

const addCheckmark = require('./helpers/checkmark');
const xmark = require('./helpers/xmark');

/**
 * Every generated component/container is preceded by this
 * @type {string}
 */
const { BACKUPFILE_EXTENSION } = require('../generators/index');

process.chdir(path.join(__dirname, '../generators'));

const plop = nodePlop('./index.js');
const componentGen = plop.getGenerator('component');
const containerGen = plop.getGenerator('container');
const languageGen = plop.getGenerator('language');

/**
 * Every generated component/container is preceded by this
 * @type {string}
 */
const NAMESPACE = 'RbGen';

/**
 * Return a prettified string
 * @param {*} data
 * @returns {string}
 */
const prettyStringify = data => JSON.stringify(data, null, 2);

/**
 * Handle results from Plop
 * @param {array} changes
 * @param {array} failures
 * @returns {Promise<*>}
 */
function handleResult({ changes, failures }) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(failures) && failures.length > 0) {
      reject(new Error(prettyStringify(failures)));
    }
    resolve(changes);
  });
}

/**
 * Feedback to user
 * @param {string} info
 * @returns {Function}
 */
const feedbackToUser = info => result => {
  console.info(chalk.blue(info));
  return result;
};

/**
 * Report success
 * @param {string} message
 * @returns {Function}
 */
const reportSuccess = message => result => {
  addCheckmark(() => console.log(chalk.green(` ${message}`)));
  return result;
};

/**
 * Report errors
 * @param {string} reason
 * @returns {Function}
 */
const reportErrors = reason => {
  // TODO: Replace with our own helpers/log that is guaranteed to be blocking?
  xmark(() => console.error(chalk.red(` ${reason}`)));
  process.exit(1);
}

/**
 * Run tslint on all js files in the given directory
 * @param {string} relativePath
 * @returns {Promise<string>}
 */
const runLintingOnDirectory = (relativePath) => new Promise((resolve, reject) => {
  shell.exec(
    `yarn lint:tslint "app/${relativePath}/**/**.{ts,tsx}"`,
    // { silent: true },
    code =>
      code
        ? reject(new Error(`Linting error(s) in ${relativePath}`))
        : resolve(relativePath),
  );
});

/**
 * Run tslint on the given file
 * @param {string} filePath
 * @returns {Promise<string>}
 */
const runLintingOnFile = filePath => new Promise((resolve, reject) => {
  shell.exec(
    `yarn lint:tslint "${filePath}"`,
    // { silent: true },
    code => {
      if (code) {
        reject(new Error(`Linting errors in ${filePath}`));
      } else {
        resolve(filePath);
      }
    },
  );
});

/**
 * Remove a directory
 * @param {string} relativePath
 * @returns {Promise<any>}
 */
const removeDir = relativePath => new Promise((resolve, reject) => {
  try {
    rimraf(path.join(__dirname, '/../../app/', relativePath), err => {
      if (err) throw err;
    });
    resolve(relativePath);
  } catch (err) {
    reject(err);
  }
});

/**
 * Remove a given file
 * @param {string} filePath
 * @returns {Promise<any>}
 */
const removeFile = filePath => new Promise((resolve, reject) => {
  try {
    fs.unlink(filePath, err => {
      if (err) throw err;
    });
    resolve(filePath);
  } catch (err) {
    reject(err);
  }
});

/**
 * Overwrite file from copy
 * @param {string} filePath
 * @param {string} [backupFileExtension=BACKUPFILE_EXTENSION]
 * @returns {Promise<*>}
 */
const restoreModifiedFile = async (
  filePath,
  backupFileExtension = BACKUPFILE_EXTENSION,
) => new Promise((resolve, reject) => {
  const targetFile = filePath.replace(`.${backupFileExtension}`, '');
  try {
    fs.copyFile(filePath, targetFile, err => {
      if (err) throw err;
    });
    resolve(targetFile);
  } catch (err) {
    reject(err);
  }
});

/**
 * Process results of a plop generator to generate
 * a mapping of files and their action type.
 * @param {array} results
 * @param {string} feedback
 */
const getGeneratedFilesFromResults = async (results, feedback) => {
  const changes = await handleResult(results);
  feedbackToUser(feedback)();
  const generatedFiles = changes.reduce((acc, change) => {
    const pathWithRemovedAnsiEscapeCodes = change.path.replace(/(\u001b\[3(?:4|9)m)/g, '');
    const obj = {};
    obj[pathWithRemovedAnsiEscapeCodes] = change.type;
    return Object.assign(acc, obj);
  }, {});
  return generatedFiles;
};

/**
 * Run tslint on modified and added ts/tsx files
 * @param {object} generatedFiles
 */
const runLintingTasks = async generatedFiles => {
  const lintingTasks = Object.keys(generatedFiles)
  .filter(
    filePath =>
      generatedFiles[filePath] === 'modify' ||
      generatedFiles[filePath] === 'add',
  )
  .filter(filePath => filePath.endsWith('.ts') || filePath.endsWith('.tsx'))
  .map(async filePath => {
    const result = await runLintingOnFile(filePath)
      .then(reportSuccess(`Linting test passed for '${filePath}'`))
      .catch(reason => reportErrors(reason));

    return result;
  });

  await Promise.all(lintingTasks);
}

/**
 * Restore modified files
 * @param {object} generatedFiles
 */
const runRestoreTasks = async generatedFiles => {
  const restoreTasks = Object.keys(generatedFiles)
    .filter(filePath => generatedFiles[filePath] === 'backup')
    .map(async filePath => {
      const result = await restoreModifiedFile(filePath)
        .then(
          feedbackToUser(
            `Restored file: '${filePath.replace(
              `.${BACKUPFILE_EXTENSION}`,
              '',
            )}'`,
          ),
        )
        .catch(reason => reportErrors(reason));
  
      return result;
    });
  
  await Promise.all(restoreTasks);
}

/**
 * Remove backup files and added files
 * @param {object} generatedFiles
 */
const runRemovalTasks = async (generatedFiles, root) => {
  const removalTasks = Object.keys(generatedFiles)
    .filter(
      filePath =>
        generatedFiles[filePath] === 'backup' ||
        generatedFiles[filePath] === 'add',
    )
    .map(async filePath => {
      const result = await removeFile(filePath)
        .then(feedbackToUser(`Removed '${filePath}'`))
        .catch(reason => reportErrors(reason));
  
      return result;
    });
  
  await Promise.all(removalTasks);

  // Remove root folder
  if (root) await removeDir(root);
}

/**
 * Test the component generator and rollback when successful
 * @param {string} name - Component name
 * @param {string} type - Plop Action type
 * @returns {Promise<string>} - Relative path to the generated component
 */
const generateComponent = async ({ name, type }) => {
  const targetFolder = 'components';
  const componentName = `${NAMESPACE}COMP${name}`;
  const relativePath = `${targetFolder}/${componentName}`;
  const component = `component/${type}`;

  try {
    const results = await componentGen
      .runActions({
        name: componentName,
        type,
        wantMessages: true,
        wantLoadable: true,
        test: true,
      });
    // Parse generator results
    const generatedFiles = await getGeneratedFilesFromResults(results, `Generated component ${component}`);
    // Run tslint on directory
    await runLintingOnDirectory(relativePath);
    reportSuccess(`Linting test passed for '${component}'`)();
    // Restore modified files
    await runRestoreTasks(generatedFiles);
    // Remove backup files and added files
    await runRemovalTasks(generatedFiles, relativePath);
  }
  catch (reason) {
    reportErrors(reason);
  }

  return component;
}

/**
 * Test the container generator and rollback when successful
 * @param {string} name - Container name
 * @param {string} type - Plop Action type
 * @returns {Promise<string>} - Relative path to the generated container
 */
async function generateContainer({ name, type }) {
  const targetFolder = 'containers';
  const componentName = `${NAMESPACE}CONT${name}`;
  const relativePath = `${targetFolder}/${componentName}`;
  const container = `container/${type}`;

  try {
    // Run generator
    const results = await containerGen
      .runActions({
        name: componentName,
        type,
        wantHeaders: true,
        wantActionsAndReducer: true,
        wantSagas: true,
        wantMessages: true,
        wantLoadable: true,
        test: true,
      });

    // Parse generator results
    const generatedFiles = await getGeneratedFilesFromResults(results, `Generated container ${container}`);
    // Run tslint on directory
    await runLintingOnDirectory(relativePath);
    reportSuccess(`Linting test passed for '${container}'`)();
    // Restore modified files
    await runRestoreTasks(generatedFiles);
    // Remove backup files and added files
    await runRemovalTasks(generatedFiles, relativePath);
  }
  catch (reason) {
    reportErrors(reason);
  }

  return container;
}

/**
 * Generate components
 * @param {array} components
 * @returns {Promise<[string]>}
 */
const generateComponents = async components => {
  const results = [];
  for (const component of components) {
    if (component.kind === 'component') {
      result = await generateComponent(component);
    } else if (component.kind === 'container') {
      result = await generateContainer(component);
    }
    results.push(result);
  }

  return results;
}

/**
 * Test the language generator and rollback when successful
 * @param {string} language
 * @returns {Promise<*>}
 */
const generateLanguage = async language => {
  try {
    // Run generator
    const results = await languageGen.runActions({ language, test: true });
    // Parse generator results
    const generatedFiles = await getGeneratedFilesFromResults(results, `Added new language: '${language}'`);
    // Run tslint on modified and added ts/tsx files
    await runLintingTasks(generatedFiles);
    // Restore modified files
    await runRestoreTasks(generatedFiles);
    // Remove backup files and added files
    await runRemovalTasks(generatedFiles);
  }
  catch (reason) {
    reportErrors(reason);
  }
  return language;
}

/**
 * Run
 */
(async function() {
  await generateComponents([
    { kind: 'component', name: 'Class', type: 'React.Component' },
    { kind: 'component', name: 'PureClass', type: 'React.PureComponent' },
    { kind: 'component', name: 'Stateless', type: 'Stateless Function' },
    { kind: 'container', name: 'Class', type: 'React.Component' },
    { kind: 'container', name: 'PureClass', type: 'React.PureComponent' },
    { kind: 'container', name: 'Stateless', type: 'Stateless Function' },
  ]).catch(reason => reportErrors(reason));

  await generateLanguage('fr').catch(reason => reportErrors(reason));
})();
