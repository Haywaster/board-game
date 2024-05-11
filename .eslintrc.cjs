module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
	parserOptions: {
		project: true
	},
  plugins: ['react-refresh'],
  rules: {
	  "@typescript-eslint/no-unused-vars": "warn",
	  indent: [1, 2],
	  quotes: [1, "single"],
	  semi: [1, "always"],
	  "comma-dangle": [1, "never"],
	  "space-before-function-paren": [1, "never"],
	  "object-curly-spacing": [1, "always"],
	  "consistent-return": 2,
	  "no-else-return": 1,
	  "space-unary-ops": 2,
	  "@typescript-eslint/consistent-type-exports": "error",
	  'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
