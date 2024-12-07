# file-loader

A utility module for loading modules in both ESM and CJS environments, with support for conditional caching and JSON imports.

## Installation

```bash
npm install file-loader
```

## Features

- Supports both CommonJS and ESM modules
- Conditional module caching
- Support for JSON imports
- Lightweight with no dependencies

## Usage

```javascript
const FileLoader = require("file-loader");

// Load a module with caching (default)
const module1 = await FileLoader.loadModule("./path/to/module");

// Load a module without caching
const module2 = await FileLoader.loadModule("./path/to/module", false);

// Load a JSON file
const jsonData = await FileLoader.loadModule("./path/to/file.json");
```

## API

### `loadModule(moduleName, useCache = true)`

- `moduleName`: Path to the module
- `useCache`: Boolean to control module caching
- Returns: Promise that resolves to the loaded module

### `resolveModule(moduleName)`

- `moduleName`: Path to the module
- Returns: Resolved absolute path to the module

## License

MIT © Matt Brannon
