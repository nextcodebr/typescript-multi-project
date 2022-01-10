module.exports = {
  displayName: {
    name: 'nxcd-util',
    color: 'blue',
  },
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/apps/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist/'
  ],
  roots: [
    '<rootDir>/'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true,
  verbose: true
}