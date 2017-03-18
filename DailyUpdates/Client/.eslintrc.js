// http://eslint.org/docs/user-guide/getting-started#configuration
// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

module.exports = {
  parser: 'babel-eslint',
  root: true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  env: {
    'es6': true,
    'node': true,
    "browser": true
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // indent
    'indent': [0, 2,  { 'SwitchCase': 2 }],
    // unused vars
    'no-unused-vars': 0,
    'no-multi-spaces': ['error', { exceptions: { 'ImportDeclaration': true } }]
  }
}
