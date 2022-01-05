module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/$1'
  },
  roots: [
    '<rootDir>/',
    '<rootDir>/tests',
    '<rootDir>/libs/lib-01/tests/'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true
}
