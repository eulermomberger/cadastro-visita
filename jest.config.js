module.exports = {
  testPathIgnorePatterns: ['node_modules/'],
  transformIgnorePatterns: ['node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.jsx',
    '!src/**/*.spec.jsx',
    '!src/**/index.jsx',
  ],
  coverageReporters: ['lcov', 'json']
};
