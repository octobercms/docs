// Isomorphic doc set context resolution. Works on both the Node side (data
// loaders, transformPageData) and the client (theme mixin).

/**
 * Resolves the doc set, version and language for a given page path.
 * @param {string} pagePath Path beginning with a slash, e.g. `/4.x/setup/installation.html`
 * @param {Array} docSets The `themeConfig.docSets` array
 */
export function getPageDocSetContext(pagePath, docSets) {
    let setBaseUri;

    let currentSet = false;
    let currentVersion = false;
    let currentLang = 'en-US';

    for (let index = 0; index < docSets.length; index++) {
        const set = docSets[index];

        if (set.versions) {
            for (let version of set.versions) {
                const key = version[0];
                const setVersionBase =
                    (set.baseDir ? '/' + set.baseDir : '') + '/' + key;
                const searchPattern = new RegExp('^' + setVersionBase, 'i');

                if (searchPattern.test(pagePath)) {
                    currentVersion = key;
                    currentSet = set;
                    setBaseUri = setVersionBase;
                    break;
                }
            }

            if (currentSet) {
                break;
            }
        }
        else {
            const setVersionBase = set.baseDir ? '/' + set.baseDir : '';
            const searchPattern = new RegExp('^' + setVersionBase, 'i');

            if (searchPattern.test(pagePath)) {
                currentSet = set;
                setBaseUri = setVersionBase;
                break;
            }
        }
    }

    if (currentSet && currentSet.locales) {
        const localeContentPath = pagePath.replace(setBaseUri, '');

        for (const key in currentSet.locales) {
            if (key !== '/' && localeContentPath.indexOf(key) !== -1) {
                currentLang = currentSet.locales[key].lang;
                break;
            }
        }
    }

    return {
        docSet: currentSet,
        primarySet: currentSet.primarySet || false,
        primaryVersion: !currentSet.versions || currentVersion === currentSet.defaultVersion,
        lang: currentLang,
        version: currentVersion
    };
}

/**
 * Converts a source-relative markdown file path into its page path,
 * e.g. `4.x/setup/installation.md` -> `/4.x/setup/installation.html`
 * and `4.x/README.md` -> `/4.x/`.
 */
export function relativePathToPath(relativePath) {
    return (
        '/' +
        relativePath
            .replace(/\\/g, '/')
            .replace(/(^|\/)README\.md$/i, '$1')
            .replace(/(^|\/)index\.md$/, '$1')
            .replace(/\.md$/, '.html')
    );
}
