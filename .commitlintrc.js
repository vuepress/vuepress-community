const fs = require('fs')
const path = require('path')

const packages = fs
  .readdirSync(path.resolve(__dirname, 'packages'))
  .filter(name => !['docs'].includes(name))

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      packages.map(name => name.replace(/^vuepress-/, '')),
    ],
  },
}
