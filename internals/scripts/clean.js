const shell = require('shelljs');
const addCheckMark = require('./helpers/checkmark.js');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.test('-e', 'internals/templates')) {
  shell.echo('The example is deleted already.');
  shell.exit(1);
}

process.stdout.write('Cleanup started...');

// Handle components/
shell.rm('-rf', 'app/components/*');
shell.mv('internals/templates/components', 'app');

// Handle containers/
shell.rm('-rf', 'app/containers');
shell.mv('internals/templates/containers', 'app');

// Handle env/
shell.rm('-rf', 'app/env');
shell.mv('internals/templates/env', 'app');

// Handle graphql/
shell.rm('-rf', 'app/graphql');
shell.mv('internals/templates/graphql', 'app');

// Handle tests/
shell.mv('internals/templates/tests', 'app');

// Handle translations/
shell.rm('-rf', 'app/translations');
shell.mv('internals/templates/translations', 'app');

// Handle typings/
shell.rm('-rf', 'app/typings');
shell.mv('internals/templates/typings', 'app');

// Handle utils/
shell.rm('-rf', 'app/utils');
shell.mv('internals/templates/utils', 'app');

// Replace the files in the root app/ folder
shell.cp('internals/templates/app.tsx', 'app/app.tsx');
shell.cp('internals/templates/global-styles.ts', 'app/global-styles.ts');
shell.cp('internals/templates/i18n.js', 'app/i18n.js');
shell.cp('internals/templates/index.html', 'app/index.html');
shell.cp('internals/templates/reducers.ts', 'app/reducers.ts');
shell.cp('internals/templates/configureStore.ts', 'app/configureStore.ts');

// Remove the templates folder
shell.rm('-rf', 'internals/templates');

addCheckMark();

// Commit the changes
if (
  shell.exec('git add . --all && git commit -qm "feat: remove default example"')
    .code !== 0
) {
  shell.echo('\nError: Git commit failed');
  shell.exit(1);
}

shell.echo('\nCleanup done. Happy Coding!!!');
