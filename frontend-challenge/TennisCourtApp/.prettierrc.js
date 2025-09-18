module.exports = {
  // Basic formatting
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,

  // JSX specific
  jsxSingleQuote: true,
  bracketSameLine: false,

  // Line length and wrapping
  printWidth: 80,
  proseWrap: 'preserve',

  // Object and array formatting
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',

  // End of line
  endOfLine: 'lf',

  // File-specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
    {
      files: ['*.tsx', '*.ts'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
