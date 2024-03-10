module.exports = {
    extends: [
        'plugin:vue/recommended'
    ],
    parserOptions: {
        'ecmaVersion': 2020
    },
    rules: {
        'vue/valid-v-slot': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'off',
        'vue/require-prop-type-constructor': 'off',
        'vue/no-unused-components': 'off',
        'vue/html-quotes': [ 'error', 'single', { 'avoidEscape': true } ]
    }
}