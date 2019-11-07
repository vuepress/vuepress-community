module.exports = {
  root: true,
  extends: 'vuepress-typescript',
  overrides: [
    {
      files: ['packages/*/test/**/*.ts'],
      env: {
        jest: true,
      },
    },
  ],
}
