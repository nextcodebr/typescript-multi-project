module.exports = {
  displayName: {
    name: 'consumer-01',
    color: 'red',
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
  moduleNameMapper: {
    "@libs/(.+)$": "<rootDir>/../../libs/$1"
  },
  clearMocks: true,
  verbose: true
}