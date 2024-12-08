const FileLoader = require('../dist/cjs/index.cjs');

describe('FileLoader', () => {
  describe('loadModule', () => {
    it('should load external module (eslint)', async () => {
      const module = await FileLoader.loadModule('eslint');
      expect(module).toBeDefined();
    });

    it('should load JSON module (package.json)', async () => {
      const json = await FileLoader.loadModule('package.json');
      expect(json).toBeDefined();
    });

    it('should load CJS module', async () => {
      const module = await FileLoader.loadModule('dist/cjs/index.cjs');
      expect(module).toBeDefined();
      expect(module).toBe(FileLoader);
    });

    it('should load ESM module', async () => {
      const module = await FileLoader.loadModule('dist/esm/index.mjs');
      expect(module.default).toBeDefined();
      expect(module.default).not.toBe(FileLoader);
    });

    it('should throw error for non-existent module', async () => {
      await expect(FileLoader.loadModule('non-existent-module'))
        .rejects.toThrow();
    });
  });

  describe('resolveModule', () => {
    it('should resolve path to external module', () => {
      const path = FileLoader.resolveModule('eslint');
      expect(path).toContain('eslint');
      expect(path).toMatch(/[/\\]node_modules[/\\]eslint/);
    });

    it('should resolve path to JSON file', () => {
      const path = FileLoader.resolveModule('package.json');
      expect(path).toContain('package.json');
    });

    it('should throw error for non-existent module', () => {
      expect(() => FileLoader.resolveModule('non-existent-module'))
        .toThrow();
    });
  });
});