module.exports = {
  root: true,
  extends: 'vuepress',
  overrides: [
    {
      files: ['*.ts'],
      extends: 'vuepress-typescript',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['packages/*/test/**/*.ts'],
      env: {
        jest: true,
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
}
