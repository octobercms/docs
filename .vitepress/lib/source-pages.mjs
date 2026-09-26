/**
 * Node-side helpers for enumerating and parsing the markdown source tree.
 * Shared by the pages/search data loaders.
 */
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { srcDir } from './config-loader.mjs';
import { relativePathToPath } from './docset-context.js';

export function listMarkdownFiles() {
    const results = [];

    // Skip the tooling and build directories that share the repo root with the
    // doc sets.
    const skipDirs = new Set([
        'node_modules', '.git', '.github',
        '.vitepress', 'dist', 'cache', 'public'
    ]);

    // Root-level markdown that is project meta, not site content. NOTE:
    // README.md is intentionally NOT skipped — it carries `home: true` and is
    // rewritten to the site's index page.
    const skipRootFiles = new Set(['LICENSE.md']);

    const walk = (dir, depth) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            if (entry.isDirectory() && skipDirs.has(entry.name)) {
                continue;
            }

            const full = path.join(dir, entry.name);

            if (entry.isDirectory()) {
                walk(full, depth + 1);
            }
            else if (entry.name.endsWith('.md')) {
                if (depth === 0 && skipRootFiles.has(entry.name)) {
                    continue;
                }
                results.push(full);
            }
        }
    };

    walk(srcDir, 0);

    return results;
}

export function parseFrontmatter(raw) {
    if (!raw.startsWith('---')) {
        return { frontmatter: {}, content: raw };
    }

    const end = raw.indexOf('\n---', 3);
    if (end === -1) {
        return { frontmatter: {}, content: raw };
    }

    let frontmatter = {};
    try {
        frontmatter = yaml.load(raw.slice(3, end)) || {};
    }
    catch (e) {
        frontmatter = {};
    }

    const content = raw.slice(raw.indexOf('\n', end + 4) + 1);

    return { frontmatter, content };
}

export function extractTitle(frontmatter, content) {
    if (frontmatter.title) {
        return String(frontmatter.title);
    }

    const match = content.match(/^#\s+(.*)$/m);
    if (!match) {
        return '';
    }

    // Strip markdown syntax from the header text
    return match[1]
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/(\*{1,2}|_{1,2}|`)(.*?)\1/g, '$2')
        .replace(/<[^>]*>/g, '')
        .trim();
}

export function buildPageRecords() {
    return listMarkdownFiles().map(file => {
        const raw = fs.readFileSync(file, 'utf-8');
        const { frontmatter, content } = parseFrontmatter(raw);

        const relativePath = path.relative(srcDir, file).replace(/\\/g, '/');
        const pagePath = relativePathToPath(relativePath);

        return { file, raw, frontmatter, content, relativePath, pagePath };
    });
}
