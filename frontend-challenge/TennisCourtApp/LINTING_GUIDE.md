# ESLint & Prettier Setup Guide

## Overview

This React Native TypeScript project is now configured with ESLint and Prettier for consistent code quality and formatting.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run lint` | Check for linting issues |
| `npm run lint:fix` | Fix auto-fixable linting issues |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check if files are properly formatted |
| `npm run type-check` | Run TypeScript compiler check |
| `npm run check` | Run all checks (TypeScript + ESLint + Prettier) |
| `npm run fix` | Fix linting issues and format code |

## Configuration Files

- `.eslintrc.js` - ESLint configuration with React Native and TypeScript rules
- `.prettierrc.js` - Prettier formatting configuration
- `.eslintignore` - Files and directories to exclude from linting
- `.prettierignore` - Files and directories to exclude from formatting
- `.vscode/settings.json` - VS Code settings for auto-formatting and linting
- `.vscode/extensions.json` - Recommended VS Code extensions

## Key Rules Enforced

### React Native Best Practices
- Mobile-first development patterns
- Performance optimizations (no single-element style arrays)
- Accessibility considerations
- Platform-specific component splitting
- Consistent styling patterns

### TypeScript
- Strict type checking
- Consistent type imports
- No unused variables (with underscore prefix exception)
- Proper error handling

### Code Quality
- Consistent formatting
- No console.log statements (warnings for console.warn/error)
- Proper import/export organization
- React hooks best practices

## Mobile-First Development Rules

The configuration includes specific rules for mobile development:

1. **Performance**: Warns about inline styles and single-element style arrays
2. **Consistency**: Enforces consistent color usage (warns about literals)
3. **Accessibility**: Ensures proper component structure
4. **Organization**: Sorts styles and imports for better maintainability

## VS Code Integration

Install the recommended extensions for the best development experience:
- ESLint
- Prettier
- TypeScript and JavaScript Language Features

The workspace is configured to:
- Format on save
- Fix ESLint issues on save
- Organize imports automatically

## Common Issues and Fixes

### Unused Styles
- Remove unused styles from StyleSheet objects
- Or prefix with underscore if intentionally unused

### Color Literals
- Define colors in constants/theme files
- Use semantic color names

### Missing Dependencies
- Add missing dependencies to useEffect dependency arrays
- Or use ESLint disable comments if intentionally excluded

### Unused Variables
- Remove unused variables
- Prefix with underscore if needed for API compatibility

## Pre-commit Integration

Consider adding these commands to your pre-commit hooks:
```bash
npm run check
```

This ensures all code meets quality standards before committing.