module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/*.config.js',
    '!**/node_modules/**',
  ],
  modulePathIgnorePatterns: ['lib', 'examples'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
};
