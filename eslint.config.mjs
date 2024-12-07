import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const styles = {
  quotes: [ 'error', 'single', { avoidEscape: true }],
  'brace-style': [ 'error', 'stroustrup' ],
  semi: [ 'error', 'always' ],
  'space-before-function-paren': 'off',
  'comma-dangle': [ 'error', 'only-multiline' ],
  
  'nonblock-statement-body-position': [ 'error', 'beside' ],

  'object-property-newline': [
    'error', {
      allowAllPropertiesOnSameLine: true,
    }
  ],

  'object-curly-newline': [
    'error', {
      multiline: true,
      consistent: true,
    }
  ],

  'object-curly-spacing': [ 'error', 'always' ],

  'array-element-newline': [
    'error', {
      ArrayExpression: 'consistent',
      ArrayPattern: 'never',
    }
  ],

  'array-bracket-newline': [
    'error', {
      multiline: true,
    }
  ],

  'no-unneeded-ternary': 'error',

  indent: [
    'error', 2, {
      flatTernaryExpressions: true,
      SwitchCase: 1,
      ignoredNodes: [ 'ConditionalExpression > *' ],
    }
  ],

  'newline-per-chained-call': [
    'error', {
      ignoreChainWithDepth: 3,
    }
  ],

  'array-bracket-spacing': [
    'error', 'always', {
      arraysInArrays: false,
      objectsInArrays: false,
      singleValue: true,
    }
  ],
  'no-multiple-empty-lines': [
    'error',
    {
      max: 1,
      maxEOF: 1,
      maxBOF: 0,
    },
  ],
};

export default [
  { ignores: [ '**/*.d.cts', '**/*.d.mts' ] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {    
    plugins: { '@typescript-eslint': tseslint.plugin },

    languageOptions: {  
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parser: tseslint.parser,
      ecmaVersion: 'latest',
    },

    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: 'error',
      ...styles,
    },
  },
];
