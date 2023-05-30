module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2022': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'overrides': [],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'ignorePatterns': ['node_modules', 'jest.config.js', 'test', 'dist', 'coverage'],
  'rules': {}
}
