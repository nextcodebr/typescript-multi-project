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
  moduleNameMapper: {
    '@nxcd-libs/(.+)': '<rootDir>/nxcd-libs/$1'
  },
  roots: [
    '<rootDir>/'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true,
  projects: [
    '<rootDir>/libs/nxcd-express/'
  ],
  verbose: true
}