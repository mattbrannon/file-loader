const { describe, it } = require('node:test');
const assert  = require('node:assert');

const FileLoader = require('../dist/cjs/index.cjs');
const fs = require('fs');

describe('FileLoader', () => {
  describe('loadModule', () => {
    describe('should load a commonjs file (sample.js)', () => {
      it('using the cache', async () => {
        const module1 = await FileLoader.loadModule('test/fixtures/sample.js');
        fs.writeFileSync('test/fixtures/sample.js', 'module.exports = { isUsingCache: false };');
        const module2 = await FileLoader.loadModule('test/fixtures/sample.js');
        fs.writeFileSync('test/fixtures/sample.js', 'module.exports = { isUsingCache: true };');
        assert.equal(module1, module2);
      });

      it('without using the cache', async () => {
        const module1 = await FileLoader.loadModule('test/fixtures/sample.js');
        fs.writeFileSync('test/fixtures/sample.js', 'module.exports = { isUsingCache: false };');
        const module2 = await FileLoader.loadModule('test/fixtures/sample.js', false);
        fs.writeFileSync('test/fixtures/sample.js', 'module.exports = { isUsingCache: true };');
        assert.notEqual(module1, module2);
      });
    });

    describe('should load a esm file (sample.mjs)', () => {
      it('using the cache', async () => {
        const module1 = await FileLoader.loadModule('test/fixtures/sample.mjs');
        fs.writeFileSync('test/fixtures/sample.mjs', 'export default { isUsingCache: false };');
        const module2 = await FileLoader.loadModule('test/fixtures/sample.mjs');
        fs.writeFileSync('test/fixtures/sample.mjs', 'export default { isUsingCache: true };');
        assert.equal(module1, module2);
      });

      it('without using the cache', async () => {
        const module1 = await FileLoader.loadModule('test/fixtures/sample.mjs');
        fs.writeFileSync('test/fixtures/sample.mjs', 'export default { isUsingCache: false };');
        const module2 = await FileLoader.loadModule('test/fixtures/sample.mjs', false);
        fs.writeFileSync('test/fixtures/sample.mjs', 'export default { isUsingCache: true };');
        assert.notEqual(module1, module2);
      });
    });

    describe('should load a json file (sample.json)', () => {
      it('using the cache', async () => {
        const json1 = await FileLoader.loadModule('test/fixtures/sample.json');
        fs.writeFileSync('test/fixtures/sample.json', JSON.stringify({ isUsingCache: false }, null, 2));
        const json2 = await FileLoader.loadModule('test/fixtures/sample.json');
        fs.writeFileSync('test/fixtures/sample.json', JSON.stringify({ isUsingCache: true }, null, 2));
        assert.equal(json1, json2);
      });

      it('without using the cache', async () => {
        const json1 = await FileLoader.loadModule('test/fixtures/sample.json');
        fs.writeFileSync('test/fixtures/sample.json', JSON.stringify({ isUsingCache: false }, null, 2));
        const json2 = await FileLoader.loadModule('test/fixtures/sample.json', false);
        fs.writeFileSync('test/fixtures/sample.json', JSON.stringify({ isUsingCache: true }, null, 2));
        assert.notEqual(json1, json2);
      });
    });

    describe('should load an external module (typescript)', () => {
      it('using the cache', async () => {
        const module1 = await FileLoader.loadModule('typescript');
        const module2 = await FileLoader.loadModule('typescript');
        assert.equal(module1, module2);
      });

      it('without using the cache', async () => {
        const module1 = await FileLoader.loadModule('typescript');
        const module2 = await FileLoader.loadModule('typescript', false);
        assert.notEqual(module1, module2);
      });
    });

    it('should recognize a JSON file without a file extension (.eslintrc)', async () => {
      const isJson = await FileLoader.isJson('test/fixtures/.eslintrc');
      assert.equal(isJson, true);
    });

    it('should load a JSON file without a file extension (.eslintrc)', async () => {
      const json = await FileLoader.loadModule('test/fixtures/.eslintrc');
      assert.ok(json);
    });

    it('should throw error for non-existent module', async () => {
      await assert.rejects(FileLoader.loadModule('non-existent-module'));  
    });
  });

  describe('resolveModule', () => {
    it('should resolve path to commonjs file', () => {
      const path = FileLoader.resolveModule('test/fixtures/sample.js');
      assert.ok(path);
      assert.match(path, /[/\\]test[/\\]fixtures[/\\]sample.js/);  
    });
    it('should resolve path to esm file', () => {
      const path = FileLoader.resolveModule('test/fixtures/sample.mjs');
      assert.ok(path);
      assert.match(path, /[/\\]test[/\\]fixtures[/\\]sample.mjs/);  
    });

    it('should resolve path to JSON file', () => {
      const path = FileLoader.resolveModule('test/fixtures/sample.json');
      assert.ok(path);
      assert.match(path, /[/\\]test[/\\]fixtures[/\\]sample.json/);   
    });

    it('should resolve path to external module', () => {
      const path = FileLoader.resolveModule('typescript');
      assert.ok(path);
      assert.match(path, /[/\\]node_modules[/\\]typescript/);  
    });

    it('should throw error for non-existent module', () => {
      assert.throws(() => FileLoader.resolveModule('non-existent-module'));
    });
  });
});