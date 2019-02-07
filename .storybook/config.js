import '@storybook/addon-console';

import { configure, addDecorator } from '@storybook/react';
import { setIntlConfig, withIntl } from 'storybook-addon-intl';

import { appLocales, DEFAULT_LOCALE, translationMessages } from './i1n8';

import withRouter from './decorators/withRouter';

// Set intl configuration
setIntlConfig({
  locales: appLocales,
  defaultLocale: DEFAULT_LOCALE,
  getMessages: locale => translationMessages[locale],
});

addDecorator(withIntl);

// Add routing
addDecorator(withRouter);

// Import all files ending in *.stories.tsx
const req = require.context('../app', true, /.stories.tsx$/);

const loadStories = () => {
  req.keys().forEach(req);
};

configure(loadStories, module);
