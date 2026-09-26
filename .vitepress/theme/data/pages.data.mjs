/**
 * Build-time `$site.pages`: a light manifest of every page used for sidebar
 * resolution, prev/next links, version switching and the 404 redirect. Heavy
 * content lives in search.data.mjs instead.
 */
import { buildPageRecords, extractTitle } from '../../lib/source-pages.mjs';
import { getPageDocSetContext } from '../../lib/docset-context.js';
import octoberCms from '../../sets/october-cms.mjs';
import userGuide from '../../sets/user-guide.mjs';

const docSets = [octoberCms, userGuide];

export default {
    watch: ['../../../**/*.md'],

    load() {
        return buildPageRecords().map(record => {
            const { frontmatter, content, relativePath, pagePath } = record;

            const { docSet, version, lang, primarySet, primaryVersion } =
                getPageDocSetContext(pagePath, docSets);

            const fm = {};
            if (frontmatter.shortname) fm.shortname = frontmatter.shortname;
            if (frontmatter.updatedVersion) fm.updatedVersion = frontmatter.updatedVersion;

            return {
                key: pagePath,
                path: pagePath,
                regularPath: pagePath,
                relativePath: relativePath,
                title: extractTitle(frontmatter, content),
                frontmatter: fm,
                docSetHandle: docSet ? docSet.handle || false : false,
                version: version,
                lang: lang,
                isPrimary: !!(primarySet && primaryVersion)
            };
        });
    }
};
