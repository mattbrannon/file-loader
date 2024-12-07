import FileLoader from '.';

(async () => {
  try {
    await FileLoader.loadModule('eslint');
    console.log(FileLoader.resolveModule('eslint'));
    console.log('loaded External Module');
    await FileLoader.loadModule('package.json');
    console.log(FileLoader.resolveModule('package.json'));
    console.log('loaded JSON Module');
    await FileLoader.loadModule('dist/cjs/index.cjs');
    console.log(FileLoader.resolveModule('dist/cjs/index.cjs'));
    console.log('loaded CommonJS Module');
    await FileLoader.loadModule('dist/esm/index.mjs');
    console.log(FileLoader.resolveModule('dist/esm/index.mjs'));
    console.log('loaded ESM Module');
  }
  catch (error) {
    console.error(error);
  }

})();