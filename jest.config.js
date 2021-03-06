module.exports = {
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
  projects: [
    '<rootDir>/libs/nxcd-express/',
    '<rootDir>/libs/nxcd-log/',
    '<rootDir>/libs/nxcd-util/',
    '<rootDir>/consumers/consumer-01/',
  ],
  verbose: true
}