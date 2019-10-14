// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  testEnvironment: 'node',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/test/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test-utils$': '<rootDir>/test/utils',
  },
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  snapshotSerializers: [require.resolve('jest-serializer-vue')],

  // coverage config
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
}
