import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import cssPlugin from "eslint-plugin-css"

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { parserOptions: { ecmaFeatures: { jsx: true} } } },
	{ languageOptions: { globals: globals.browser } },
	{ rules: {
			"@kvadrofilii/fsd/path-checker": "error",
			"@kvadrofilii/fsd/public-api-imports": "error",
			"@kvadrofilii/fsd/layer-imports": "error"
		} },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReactConfig,
	...cssPlugin.configs.all,
];
