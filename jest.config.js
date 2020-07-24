module.exports = {
  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
    SpreadsheetApp: {},
    PropertiesService: {},
    Moment: {},
  },

  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: [
    'node_modules',
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'tsx',
  ],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
