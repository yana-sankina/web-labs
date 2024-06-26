import eslint from '@eslint/js';
import globals from "globals";


export default[
    eslint.configs.recommended,
    {
      languageOptions: {
          sourceType: "module",
          globals: {
              ...globals.browser
          }
      }
  }
];