module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/attribute-hyphenation': 'error',
    'vue/attributes-order': 'error',
    'vue/block-lang': 'error',
    'vue/block-tag-newline': 'error',
    'vue/comment-directive': 'error',
    'vue/component-api-style': 'error',
    'vue/component-definition-name-casing': 'error',
    'vue/component-name-in-template-casing': 'error',
    'vue/component-tags-order': 'error',
    'vue/custom-event-name-casing': 'error',
    'vue/html-button-has-type': 'error',
    'vue/html-closing-bracket-newline': 'error',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/html-comment-content-newline': 'error',
    'vue/html-comment-content-spacing': 'error',
    'vue/valid-v-model': 'error',
    'vue/valid-v-on': 'error',
    'vue/valid-v-once': 'error',
    'vue/valid-v-pre': 'error',
    'vue/valid-v-show': 'error',
    'vue/valid-v-slot': 'error',
    'vue/valid-v-text': 'error',
    'vue/experimental-script-setup-vars': 'error',
    'vue/html-comment-indent': 'error'
  }
}
