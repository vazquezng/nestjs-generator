module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: '\\.(spec|test)\\.ts$',
      },
    },
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '(\\.spec).(ts$)',
  transform: {
    '.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
}
