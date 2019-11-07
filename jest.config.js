/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const { readdirSync } = require('fs')

const packages = readdirSync(resolve(__dirname, 'packages'), {
  withFileTypes: true,
})
  .filter(item => item.isDirectory())
  .map(({ name }) => name)

module.exports = {
  rootDir: resolve(__dirname),
  testEnvironment: 'node',
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  moduleNameMapper: {
    [`^(${packages.join('|')})$`]: '<rootDir>/packages/$1',
  },
  testMatch: ['<rootDir>/packages/*/test/**/*.spec.ts'],
  snapshotSerializers: [require.resolve('jest-serializer-vue')],

  // coverage config
  collectCoverageFrom: ['<rootDir>/packages/*/src/**/*.ts', '!**/*.d.ts'],
  coverageDirectory: 'coverage',
}
