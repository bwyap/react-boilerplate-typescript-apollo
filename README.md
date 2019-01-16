# React Boilerplate: Apollo & Typescript

<div align="center"><strong>⚠️ WIP: This fork is currently a work in progress. Features may be missing or incomplete.</strong></div>

<br />

<div align="center"><strong>Start your next react project in seconds</strong></div>
<div align="center">A highly scalable, offline-first foundation with the best DX and a focus on performance and best practices</div>

<div align="center">
  <sub>Created by <a href="https://twitter.com/mxstbr">Max Stoiber</a>, forked and maintained by <a href="https://github.com/bwyap">Ben Yap</a>.</sub>
</div>

---

### react-boilerplate-typescript-apollo

<div align="center">
  <!-- Dependency Status -->
  <a href="https://david-dm.org/bwyap/react-boilerplate-typescript-apollo">
    <img src="https://david-dm.org/bwyap/react-boilerplate-typescript-apollo.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/bwyap/react-boilerplate-typescript-apollo#info=devDependencies">
    <img src="https://david-dm.org/bwyap/react-boilerplate-typescript-apollo/dev-status.svg" alt="devDependency Status" />
  </a>
  <!-- Build Status - Appveyor -->
  <a href="https://ci.appveyor.com/project/bwyap/react-boilerplate-typescript-apollo">
    <img src="" alt="Build Status (Appveyor)" />
  </a>
  <!-- Build Status - CircleCI -->
  <a href="https://circleci.com/gh/bwyap/react-boilerplate-typescript-apollo">
    <img src="https://circleci.com/gh/bwyap/react-boilerplate-typescript-apollo.svg?style=svg" alt="Build Status (Circle CI)" />
  </a>
  <!-- Test Coverage -->
  <a href="https://coveralls.io/r/bwyap/react-boilerplate-typescript-apollo">
    <img src="https://coveralls.io/repos/github/bwyap/react-boilerplate-typescript-apollo/badge.svg" alt="Test Coverage" />
  </a>
</div>

<br />

---

### react-boilerplate

<div align="center">
  <!-- Dependency Status -->
  <a href="https://david-dm.org/react-boilerplate/react-boilerplate">
    <img src="https://david-dm.org/react-boilerplate/react-boilerplate.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/react-boilerplate/react-boilerplate#info=devDependencies">
    <img src="https://david-dm.org/react-boilerplate/react-boilerplate/dev-status.svg" alt="devDependency Status" />
  </a>
  <!-- Build Status -->
  <a href="https://travis-ci.org/react-boilerplate/react-boilerplate">
    <img src="https://travis-ci.org/react-boilerplate/react-boilerplate.svg" alt="Build Status" />
  </a>
  <!-- Test Coverage -->
  <a href="https://coveralls.io/r/react-boilerplate/react-boilerplate">
    <img src="https://coveralls.io/repos/github/react-boilerplate/react-boilerplate/badge.svg" alt="Test Coverage" />
  </a>
  <a href="https://spectrum.chat/react-boilerplate">
    <img alt="Chat with us on Spectrum" src="https://withspectrum.github.io/badge/badge.svg" />
  </a>
</div>

---

## React boilerplate: Typescript and Apollo

*An opinionated fork of react-boilerplate with Apollo added, written in Typescript.*

### Notable changes from `react-boilerplate`

* Merge in work by @Mensae to replace [enzyme](https://github.com/airbnb/enzyme) with [react-testing-library](https://github.com/kentcdodds/react-testing-library)
* Merge in work by @julianben to replace [Immutable.js](https://facebook.github.io/immutable-js/) with [Immer](https://github.com/mweststrate/immer)
* Add [commit linting](https://github.com/marionebl/commitlint) through [husky](https://github.com/typicode/husky) to enforce consistent commit message style
* Prefer [yarn](https://yarnpkg.com) by providing a `yarn.lock` file
* Add configuration for CircleCI

---

## Features

<dl>
  <dt>Quick scaffolding</dt>
  <dd>Create components, containers, routes, selectors and sagas - and their tests - right from the CLI!</dd>

  <dt>Instant feedback</dt>
  <dd>Enjoy the best DX (Developer eXperience) and code your app at the speed of thought! Your saved changes to the CSS and JS are reflected instantaneously without refreshing the page. Preserve application state even when you update something in the underlying code!</dd>

  <dt>Predictable state management</dt>
  <dd>Unidirectional data flow allows for change logging and time travel debugging.</dd>

  <dt>Next generation JavaScript</dt>
  <dd>Use template strings, object destructuring, arrow functions, JSX syntax and more.</dd>

  <dt>Next generation CSS</dt>
  <dd>Write composable CSS that's co-located with your components for complete modularity. Unique generated class names keep the specificity low while eliminating style clashes. Ship only the styles that are on the page for the best performance.</dd>

  <dt>Industry-standard routing</dt>
  <dd>It's natural to want to add pages (e.g. `/about`) to your application, and routing makes this possible.</dd>

  <dt>Industry-standard i18n internationalization support</dt>
  <dd>Scalable apps need to support multiple languages, easily add and support multiple languages with `react-intl`.</dd>

  <dt>Offline-first</dt>
  <dd>The next frontier in performant web apps: availability without a network connection from the instant your users load the app.</dd>

  <dt>Static code analysis</dt>
  <dd>Focus on writing new features without worrying about formatting or code quality. With the right editor setup, your code will automatically be formatted and linted as you work.</dd>

  <dt>SEO</dt>
  <dd>We support SEO (document head tags management) for search engines that support indexing of JavaScript content. (eg. Google)</dd>
</dl>

But wait... there's more!

- _The best test setup:_ Automatically guarantee code quality and non-breaking
  changes. (Seen a react app with 100% test coverage before?)
- _Native web app:_ Your app's new home? The home screen of your users' phones.
- _The fastest fonts:_ Say goodbye to vacant text.
- _Stay fast_: Profile your app's performance from the comfort of your command
  line!
- _Catch problems:_ AppVeyor and TravisCI setups included by default, so your
  tests get run automatically on Windows and Unix.

There’s also a <a href="https://vimeo.com/168648012">fantastic video</a> on how to structure your React.js apps with scalability in mind. It provides rationale for the majority of boilerplate's design decisions.

<sub><i>Keywords: React.js, Redux, Hot Reloading, ESNext, Babel, react-router, Offline First, ServiceWorker, `styled-components`, redux-saga, FontFaceObserver</i></sub>

## Quick start

1.  Make sure that you have Node.js v8.10 and npm v5 or above installed.
2.  Clone this repo using `git clone --depth=1 https://github.com/react-boilerplate/react-boilerplate.git <YOUR_PROJECT_NAME>`
3.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
4.  Run `npm run setup` in order to install dependencies and clean the git repo.<br />
    _At this point you can run `npm start` to see the example app at `http://localhost:3000`._
5.  Run `npm run clean` to delete the example app.

Now you're ready to rumble!

> Please note that this boilerplate is **production-ready and not meant for beginners**! If you're just starting out with react or redux, please refer to https://github.com/petehunt/react-howto instead. If you want a solid, battle-tested base to build your next product upon and have some experience with react, this is the perfect start for you.

## Documentation

- [**The Hitchhikers Guide to `react-boilerplate`**](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [Overview](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Styling](docs/css): How to work with the CSS tooling
- [Your app](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.

## Supporters

Please see the original repository for supporters: [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).

## License

This project is licensed under the MIT license, Copyright (c) 2019 Ben Yap.
For more information see `LICENSE.md`.
