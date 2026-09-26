// Flexsearch 0.6 `doc` API service. Pages are supplied by the lazy-loaded
// search data chunk.
import Flexsearch from "flexsearch";
import { keyBy, uniqBy, groupBy, values, findLastIndex } from "lodash-es";

const FlexSearch = Flexsearch;

const defaultLang = "en-US";

let pagesByPath = null;
let indexes = [];
let cyrillicIndexes = [];
let cjkIndexes = [];
let indexed = false;

export default {
    isIndexed() {
        return indexed;
    },

    buildIndex(pages) {
        indexed = true;
        const indexSettings = {
            async: true,
            doc: {
                id: "key",
                // Fields we want to index
                field: ["title", "keywords", "headersStr", "content"]
            }
        };

        const globalIndex = new Flexsearch(indexSettings);
        globalIndex.add(
            pages.filter(page => {
                // Default language, primary set, and primary version (designated or versionless set)
                return page.lang === defaultLang && page.isPrimary;
            })
        );

        indexes["global"] = globalIndex;

        // Create sets keyed with format `setHandle|version|lang`
        let docSets = pages
            .map(page => {
                return page.docSetHandle;
            })
            .filter((handle, index, self) => {
                return handle && self.indexOf(handle) === index;
            });

        for (let i = 0; i < docSets.length; i++) {
            const docSet = docSets[i];

            const docSetPages = pages.filter(page => {
                return page.docSetHandle === docSet;
            });

            let versions = docSetPages
                .map(page => {
                    return page.version;
                })
                .filter((handle, index, self) => {
                    return handle && self.indexOf(handle) === index;
                });

            let languages = docSetPages
                .map(page => {
                    return page.lang;
                })
                .filter((handle, index, self) => {
                    return handle && self.indexOf(handle) === index;
                });

            if (versions.length) {
                for (let j = 0; j < versions.length; j++) {
                    const version = versions[j];

                    for (let k = 0; k < languages.length; k++) {
                        const language = languages[k];
                        let currentIndexSettings = indexSettings;

                        const setIndex = new FlexSearch(currentIndexSettings);
                        const setKey = `${docSet}|${version}|${language}`;
                        const setPages = pages.filter(page => {
                            return (
                                page.docSetHandle === docSet &&
                                page.lang === language &&
                                page.version === version
                            );
                        });

                        setIndex.add(setPages);
                        indexes[setKey] = setIndex;

                        const cyrillicSetPages = setPages.filter(p => p.charsets.cyrillic);
                        const cjkSetPages = setPages.filter(p => p.charsets.cjk);

                        if (cyrillicSetPages.length) {
                            const setCyrillicIndex = new Flexsearch({
                                ...indexSettings,
                                encode: false,
                                split: /\s+/,
                                tokenize: "forward"
                            });
                            setCyrillicIndex.add(cyrillicSetPages);
                            cyrillicIndexes[setKey] = setCyrillicIndex;
                        }
                        if (cjkSetPages.length) {
                            const setCjkIndex = new Flexsearch({
                                ...indexSettings,
                                encode: false,
                                tokenize: function(str) {
                                    return str.replace(/[\x00-\x7F]/g, "").split("");
                                }
                            });
                            setCjkIndex.add(cjkSetPages);
                            cjkIndexes[setKey] = setCjkIndex;
                        }
                    }
                }
            } else {
                // Docset-language
                for (let j = 0; j < languages.length; j++) {
                    const language = languages[j];

                    let currentIndexSettings = indexSettings;

                    const setIndex = new FlexSearch(currentIndexSettings);
                    const setKey = `${docSet}|${language}`;
                    const setPages = pages.filter(page => {
                        return page.docSetHandle === docSet && page.lang === language;
                    });

                    setIndex.add(setPages);
                    indexes[setKey] = setIndex;
                }
            }
        }

        pagesByPath = keyBy(pages, "path");
    },

    async match(queryString, queryTerms, docSet, version, language, limit = 7) {
        const index = resolveSearchIndex(docSet, version, language, indexes);
        const cyrillicIndex = resolveSearchIndex(
            docSet,
            version,
            language,
            cyrillicIndexes
        );
        const cjkIndex = resolveSearchIndex(docSet, version, language, cjkIndexes);

        const searchParams = [
            {
                field: "keywords",
                query: queryString,
                boost: 8,
                suggest: false,
                bool: "or",
            },
            {
                field: "title",
                query: queryString,
                boost: 10,
                suggest: false,
                bool: "or",
            },
            {
                field: "headersStr",
                query: queryString,
                boost: 7,
                suggest: false,
                bool: "or",
            },
            {
                field: "content",
                query: queryString,
                boost: 0,
                suggest: false,
                bool: "or",
            }
        ];
        const searchResult1 = await index.search(searchParams, limit);
        const searchResult2 = cyrillicIndex
            ? await cyrillicIndex.search(searchParams, limit)
            : [];
        const searchResult3 = cjkIndex
            ? await cjkIndex.search(searchParams, limit)
            : [];
        const searchResult = uniqBy(
            [...searchResult1, ...searchResult2, ...searchResult3],
            "path"
        );

        const result = searchResult.map(page => ({
            ...page,
            parentPageTitle: getParentPageTitle(page),
            ...getAdditionalInfo(page, queryString, queryTerms)
        }));

        const resultBySet = groupBy(result, "docSetTitle");

        return values(resultBySet)
            .map(arr =>
                arr.map((x, i) => {
                    if (i === 0) return x;
                    return { ...x, parentPageTitle: null };
                })
            )
            .flat();
    }
};

function resolveSearchIndex(docSet, version, language, indexes) {
    let key = docSet;

    if (version) {
        key += `|${version}`;
    }

    if (language) {
        key += `|${language}`;
    }

    return indexes[key] || indexes["global"];
}

function getParentPageTitle(page) {
    const pathParts = page.path.split("/");
    let parentPagePath = "/";
    if (pathParts[1]) parentPagePath = `/${pathParts[1]}/`;

    const parentPage = pagesByPath[parentPagePath] || page;
    return parentPage.title;
}

/**
 * Returns contextual details for displaying search result.
 * @param {*} page
 * @param {*} queryString
 * @param {*} queryTerms
 */
function getAdditionalInfo(page, queryString, queryTerms) {
    const query = queryString.toLowerCase();

    /**
     * If it’s an exact title match or the page title starts with the query string,
     * return the result with the full heading and no slug.
     */
    if (
        page.title.toLowerCase() === query ||
        page.title.toLowerCase().startsWith(query)
    ) {
        return {
            headingStr: getFullHeading(page),
            slug: "",
            contentStr: getBeginningContent(page),
            match: "title"
        };
    }

    /**
     * If our special (and pretty much invisible) keywords include the query string,
     * return the result using the page title, no slug, and opening sentence.
     */
    if (page.keywords.includes(query)) {
        return {
            headingStr: getFullHeading(page),
            slug: "",
            contentStr: getBeginningContent(page),
            match: "keywords"
        };
    }

    const match = getMatch(page, query, queryTerms);

    /**
     * If we can’t match the query string to anything specific, list the result
     * with only the page heading.
     */
    if (!match)
        return {
            headingStr: getFullHeading(page),
            slug: "",
            contentStr: null,
            match: "?"
        };

    /**
     * If we have a match that’s in a heading, display that heading and return
     * a link to it without any content snippet.
     */
    if (match.headerIndex != null) {
        // Header match
        return {
            headingStr: getFullHeading(page, match.headerIndex),
            slug: "#" + page.headers[match.headerIndex].slug,
            contentStr: null,
            match: "header"
        };
    }

    /**
     * Get the index of the nearest preceding header relative to the content match.
     */
    let headerIndex = findLastIndex(
        page.headers || [],
        h => h.charIndex != null && h.charIndex < match.charIndex
    );
    if (headerIndex === -1) headerIndex = null;

    return {
        headingStr: getFullHeading(page, headerIndex),
        slug: headerIndex == null ? "" : "#" + page.headers[headerIndex].slug,
        contentStr: getContentStr(page, match),
        match: "content"
    };
}

/**
 * Return the target heading in the context of its parents. (Like a breadcrumb.)
 * @param {*} page
 * @param {*} headerIndex
 */
function getFullHeading(page, headerIndex) {
    if (headerIndex == null) return page.title;
    const headersPath = [];
    while (headerIndex != null) {
        const header = page.headers[headerIndex];
        headersPath.unshift(header);
        headerIndex = findLastIndex(
            page.headers,
            h => h.level === header.level - 1,
            headerIndex - 1
        );
        if (headerIndex === -1) headerIndex = null;
    }
    return headersPath.map(h => h.title).join(" → ");
}

function getMatch(page, query, terms) {
    const matches = terms
        .map(t => {
            return getHeaderMatch(page, t) || getContentMatch(page, t);
        })
        .filter(m => m);
    if (matches.length === 0) return null;

    if (matches.every(m => m.headerIndex != null)) {
        return getHeaderMatch(page, query) || matches[0];
    }

    return (
        getContentMatch(page, query) || matches.find(m => m.headerIndex == null)
    );
}

function getHeaderMatch(page, term) {
    if (!page.headers) return null;
    for (let i = 0; i < page.headers.length; i++) {
        const h = page.headers[i];
        const charIndex = h.title.toLowerCase().indexOf(term);
        if (charIndex === -1) continue;
        return {
            headerIndex: i,
            charIndex,
            termLength: term.length
        };
    }
    return null;
}

function getContentMatch(page, term) {
    if (!page.contentLowercase) return null;
    const charIndex = page.contentLowercase.indexOf(term);
    if (charIndex === -1) return null;

    return { headerIndex: null, charIndex, termLength: term.length };
}

function getContentStr(page, match) {
    const snippetLength = 120;
    const { charIndex, termLength } = match;

    let lineStartIndex = page.content.lastIndexOf("\n", charIndex);
    let lineEndIndex = page.content.indexOf("\n", charIndex);

    if (lineStartIndex === -1) lineStartIndex = 0;
    if (lineEndIndex === -1) lineEndIndex = page.content.length;

    const line = page.content.slice(lineStartIndex, lineEndIndex);

    if (snippetLength >= line.length) return line;

    const lineCharIndex = charIndex - lineStartIndex;

    const additionalCharactersFromStart = (snippetLength - termLength) / 2;
    const snippetStart = Math.max(
        lineCharIndex - additionalCharactersFromStart,
        0
    );
    const snippetEnd = Math.min(snippetStart + snippetLength, line.length);
    let result = line.slice(snippetStart, snippetEnd);
    if (snippetStart > 0) result = "..." + result;
    if (snippetEnd < line.length) result = result + "...";
    return result;
}

/**
 * Returns the initial page content after the title.
 * @param {*} page
 */
function getBeginningContent(page) {
    const lines = page.contentLowercase.split("\n");
    const lowerFirstLine = (lines.length > 0 ? lines[0] : "").trim();
    const lowerPageTitle = page.title.toLowerCase()
    const firstLineIsTitle = lowerFirstLine === lowerPageTitle

    if (firstLineIsTitle) {
        // First line *is* title; start at second line
        return getContentStr(page, {
            charIndex: lowerFirstLine.length + 2,
            termLength: 0
        });
    }

    return getContentStr(page, { charIndex: 0, termLength: 0 });
}
