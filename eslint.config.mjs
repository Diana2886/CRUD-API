import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false
      }
    }
  },
  {
    overrides: [
      {
        files: ['tests/**/*'],
        env: {
          jest: true
        }
      }
    ]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
]
