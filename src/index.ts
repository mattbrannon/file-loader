import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';

export default class FileLoader {
  static #require;

  static {
    this.#require = createRequire(pathToFileURL(process.cwd() + '/index').href);
  }

  static async loadModule(moduleName: string, useCache = true) {
    const pathToModule = this.resolveModule(moduleName);

    try {
      return this.#requireModule(pathToModule, useCache);
    }
    catch {
      return this.#importModule(pathToModule, useCache);
    }
  }

  static resolveModule(moduleName: string) {
    try {
      return this.#require.resolve(moduleName);
    }
    catch {
      const sanitizedPath = this.#normalizeFilePath(moduleName);
      return this.#require.resolve(sanitizedPath);
    }
  }

  static async #importModule(pathToModule: string, useCache = true) {
    const importPath = useCache ? pathToModule : `${pathToModule}?${Date.now()}`;

    switch (true) {
      case pathToModule.endsWith('.json'): {
        return await this.#importJson(importPath);
      }
      default: {
        return await this.#dynamicImport(importPath);
      }
    }
  }

  static #requireModule(pathToModule: string, useCache = true) {
    if (!useCache) {
      delete this.#require.cache[this.#require.resolve(pathToModule)];
    }
    return this.#require(pathToModule);
  }

  static async #importJson(pathToModule: string) {
    try {
      const supportsJsonImports = process.versions.node >= '17.1.0';
      if (supportsJsonImports) {
        return await import(pathToModule, { assert: { type: 'json' } });
      }
      const content = await readFile(fileURLToPath(pathToModule), 'utf-8');
      return JSON.parse(content);
    }
    catch (error) {
      throw new Error(`Error: Could not import JSON module: ${pathToModule}`, { cause: error });
    }
  }
  
  static async #dynamicImport(pathToModule: string) {
    try {
      return await import(pathToModule);
    }
    catch (error) {
      throw new Error(`Error: Could not import module: ${pathToModule}`, { cause: error });
    }
  }
  
  static #normalizeFilePath(modulePath: string) {
    const fileUrl = pathToFileURL(modulePath).href;
    const filepath = fileURLToPath(fileUrl);
    return filepath;
  }

}