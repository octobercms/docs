import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Base directory of the documentation source (the repo root, which now holds
// the markdown tree directly). This file lives in .vitepress/lib, so ../.. .
export const srcDir = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../..'
);

export function loadYamlConfig(filePath) {
    try {
        const doc = yaml.load(fs.readFileSync(path.join(srcDir, filePath)));
        return doc;
    }
    catch (e) {
        console.log(e);
    }
}
