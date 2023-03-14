module.exports = {
  // 当前配置为根配置，将不再从上级文件夹查找配置
  root: true,
  env: {
    node: true
  },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    // typescript-eslint推荐规则,
    'plugin:@typescript-eslint/recommended', 
    // prettier推荐规则,
    'prettier',
    // 解决prettier和eslint冲突
    'plugin:prettier/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  // 支持ts的最新语法
  parserOptions: {
    "sourceType": "module",
    "parser": "@typescript-eslint/parser",
    "allowImportExportEverywhere": true,
  },
}
