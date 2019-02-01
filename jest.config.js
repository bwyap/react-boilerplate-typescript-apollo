module.exports = {
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.test.{ts,tsx}',
    '!app/**/*.spec.{ts,tsx}',
    '!app/*/RbGen*/**/*.{ts,tsx}',
    '!app/app.tsx',
    '!app/global-styles.ts',
    '!app/*/*/Loadable.{ts,tsx}',
    '!app/utils/hoistNonReactStatics/*',
    '!app/graphql/client.ts',
    '!app/env/**',
  ],
  coverageThreshold: {
    global: {
      statements: 98,
      branches: 91,
      functions: 98,
      lines: 98,
    },
  },
  moduleDirectories: ['node_modules', 'app'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  // setupTestFrameworkScriptFile: '<rootDir>/internals/testing/test-bundler.js',
  setupFiles: ['raf/polyfill'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  snapshotSerializers: [],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results/jest',
        outputName: 'results.xml',
      },
    ],
  ],
};
