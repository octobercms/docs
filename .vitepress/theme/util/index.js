// Theme utility helpers.

export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^[a-z]+:/i

export function normalize (path) {
    return decodeURI(path)
        .replace(hashRE, '')
        .replace(extRE, '')
}

export function getHash (path) {
    const match = path.match(hashRE)
    if (match) {
        return match[0]
    }
}

export function isExternal (path) {
    return outboundRE.test(path)
}

export function ensureExt(path) {
    if (isExternal(path)) {
        return path;
    }

    const hashMatch = path.match(hashRE);
    const hash = hashMatch ? hashMatch[0] : '';
    const normalized = normalize(path);

    if (endingSlashRE.test(normalized)) {
        return path;
    }

    return normalized + '.html' + hash;
}

export function isActive (route, path) {
    const routeHash = decodeURIComponent(route.hash)
    const linkHash = getHash(path)
    if (linkHash && routeHash !== linkHash) {
        return false
    }
    const routePath = normalize(route.path)
    const pagePath = normalize(path)
    return routePath === pagePath
}

export function resolvePageBasic(pages, rawPath) {
    if (isExternal(rawPath)) {
        return {
            type: 'external',
            path: rawPath
        };
    }

    const path = normalize(rawPath);

    for (let i = 0; i < pages.length; i++) {
        if (normalize(pages[i].regularPath) === path) {
            return Object.assign({}, pages[i], {
                type: 'page',
                path: ensureExt(pages[i].path)
            });
        }
    }

    return false;
}

export function resolvePage(pages, rawPath, base) {
    if (isExternal(rawPath)) {
        return {
            type: 'external',
            path: rawPath
        };
    }

    if (base) {
        rawPath = resolvePath(rawPath, base);
    }

    const path = normalize(rawPath);

    for (let i = 0; i < pages.length; i++) {
        if (normalize(pages[i].regularPath) === path) {
            return Object.assign({}, pages[i], {
                type: 'page',
                path: ensureExt(pages[i].path)
            });
        }
    }

    console.error(`[vitepress] No matching page found for sidebar item "${rawPath}"`);

    return {};
}

function resolvePath (relative, base, append) {
    const firstChar = relative.charAt(0)
    if (firstChar === '/') {
        return relative
    }

    if (firstChar === '?' || firstChar === '#') {
        return base + relative
    }

    const stack = base.split('/')

    // Remove trailing segment if:
    // - not appending
    // - appending to trailing slash (last segment is empty)
    if (!append || !stack[stack.length - 1]) {
        stack.pop()
    }

    // Resolve relative path
    const segments = relative.replace(/^\//, '').split('/')
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i]
        if (segment === '..') {
            stack.pop()
        } else if (segment !== '.') {
            stack.push(segment)
        }
    }

    // Ensure leading slash
    if (stack[0] !== '') {
        stack.unshift('')
    }

    return stack.join('/')
}

/**
 * @param { Page } page
 * @param { string } regularPath
 * @param { SiteData } site
 * @param { string } localePath
 * @returns { SidebarGroup }
 */
export function resolveSidebarItems(page, regularPath, site, localePath, activeSet, activeVersion, localeConfig) {
    const { pages, themeConfig } = site;

    const sidebarConfig = resolveSidebarConfig(site, page, activeSet, activeVersion, localeConfig, themeConfig);

    if (!sidebarConfig) {
        return [];
    }
    else {
        let { base, config } = resolveMatchingConfig(regularPath, sidebarConfig, activeSet, activeVersion);

        if (!config) {
            const relativePath = regularPath.replace(/^\/[^/]+\//, '/');
            if (relativePath !== '/') {
                console.log('Could not resolve config for: ' + regularPath);
            }
            return [];
        }

        const resolved = config.map(item => {
            return resolveItem(item, pages, base);
        });

        return resolved;
    }
}

export function resolveSidebarConfig(site, page, activeSet, activeVersion, localeConfig, themeConfig) {
    if (page.frontmatter.sidebar) {
        return page.frontmatter.sidebar;
    }

    if (!activeSet) {
        return [];
    }

    const appliedConfig = activeSet.locales ? localeConfig.config : activeSet;

    let sidebarConfig;

    if (appliedConfig.sidebar) {
        sidebarConfig = appliedConfig.sidebar;
    }
    else if (themeConfig.sidebar) {
        sidebarConfig = themeConfig.sidebar;
    }

    if (activeVersion) {
        sidebarConfig = sidebarConfig[activeVersion];
    }

    return sidebarConfig;
}

/**
 * @param { Page } page
 * @param { string } regularPath
 * @param { SiteData } site
 * @param { string } localePath
 * @returns { SidebarGroup }
 */
export function resolveExtraSidebarItems(page, regularPath, site, localePath, activeSet, activeVersion, localeConfig) {
    const { pages, themeConfig } = site;

    const sidebarConfig = resolveExtraSidebarConfig(site, page, activeSet, activeVersion, localeConfig, themeConfig);

    if (!sidebarConfig) {
        return [];
    }
    else {
        let { base, config } = resolveMatchingConfig(regularPath, sidebarConfig, activeSet, activeVersion);

        if (!config) {
            const relativePath = regularPath.replace(/^\/[^/]+\//, '/');
            if (relativePath !== '/') {
                console.log('Could not resolve config for: ' + regularPath);
            }
            return [];
        }

        const resolved = config.map(item => {
            return resolveExtraItem(item, pages, base);
        });

        return resolved;
    }
}

export function resolveExtraSidebarConfig(site, page, activeSet, activeVersion, localeConfig, themeConfig) {
    if (!activeSet) {
        return [];
    }

    const appliedConfig = activeSet.locales ? localeConfig.config : activeSet;
    let sidebarConfig;

    if (appliedConfig.sidebarExtra) {
        sidebarConfig = appliedConfig.sidebarExtra;
    }
    else if (themeConfig.sidebarExtra) {
        sidebarConfig = themeConfig.sidebarExtra;
    }

    if (!sidebarConfig) {
        return [];
    }

    if (activeVersion) {
        sidebarConfig = sidebarConfig[activeVersion];
    }

    return sidebarConfig;
}

export function resolveHeaders(page) {
    const headers = groupHeaders(
        page.headers || [],
        page.frontmatter.sidebarLevel
    );

    return [
        {
            type: "group",
            collapsable: false,
            title: page.title,
            path: null,
            children: headers.map(h => ({
                type: "auto",
                title: h.title,
                basePath: page.path,
                path: page.path + "#" + h.slug,
                children: h.children || []
            }))
        }
    ];
}

export function groupHeaders(headers, level = 2) {
    // Normalize objects
    headers = headers.map(h => Object.assign({}, h));
    let lastHeadingAtLevel;

    // Collect children of target level
    headers.forEach(h => {
        if (h.level === level) {
            lastHeadingAtLevel = h;
        }
        else if (lastHeadingAtLevel) {
            (lastHeadingAtLevel.children || (lastHeadingAtLevel.children = [])).push(h);
        }
    });

    return headers.filter(h => h.level === level);
}

/**
 * @param { Route } route
 * @param { Array<string|string[]> | Array<SidebarGroup> | [link: string]: SidebarConfig } config
 * @returns { base: string, config: SidebarConfig }
 */
export function resolveMatchingConfig(regularPath, config, activeSet, activeVersion) {
    let base = "/";

    if (activeSet) {
        base += activeSet.baseDir;
    }

    if (activeSet && activeSet.versions) {
        base += "/" + activeVersion + "/";
    }

    base = fixDoubleSlashes(ensureEndingSlash(base));

    if (Array.isArray(config)) {
        return {
            base: base,
            config: config
        };
    }

    const modifiedRegularPath = getRelativeRegularPath(
        regularPath,
        activeSet,
        activeVersion
    );

    const activeBase = getRelativeActiveBaseFromConfig(
        modifiedRegularPath,
        config
    );

    if (activeBase) {
        return {
            base: fixDoubleSlashes(base + activeBase),
            config: config[activeBase]
        };
    }

    return {};
}

export function getRelativeRegularPath(regularPath, activeSet, activeVersion) {
    let modifiedRegularPath = regularPath;

    if (activeSet) {
        modifiedRegularPath = fixDoubleSlashes(modifiedRegularPath.replace(activeSet.baseDir, ""));
    }

    if (activeVersion) {
        modifiedRegularPath = fixDoubleSlashes(modifiedRegularPath.replace(activeVersion, ""));
    }

    return modifiedRegularPath;
}

export function getRelativeActiveBaseFromConfig(path, config) {
    if (Array.isArray(config)) {
        return;
    }

    for (const activeBase in config) {
        if (ensureEndingSlash(path).indexOf(encodeURI(activeBase)) === 0) {
            return activeBase;
        }
    }

    return;
}

function ensureEndingSlash (path) {
    return /(\.html|\/)$/.test(path)
        ? path
        : path + '/'
}

export function fixDoubleSlashes(path) {
    return path.replace(/\/\//g, "/");
}

function resolveItem(item, pages, base, groupDepth = 1) {
    if (typeof item === "string") {
        return resolvePage(pages, item, base);
    }
    else if (Array.isArray(item)) {
        return Object.assign(resolvePage(pages, item[0], base), {
            title: item[1]
        });
    }
    else {
        const children = item.children || [];
        if (children.length === 0 && item.path) {
            return Object.assign(resolvePage(pages, item.path, base), {
                title: item.title
            });
        }
        const toggleChildren = item.toggleChildren || [];
        return {
            type: "group",
            path: item.path,
            title: item.title,
            icon: item.icon,
            sidebarDepth: item.sidebarDepth,
            children: children.map(child =>
                resolveItem(child, pages, base, groupDepth + 1)
            ),
            toggleChildren: toggleChildren.map(child =>
                resolveItem(child, pages, base, groupDepth + 1)
            ),
            collapsable: item.collapsable !== false
        };
    }
}

export function resolveExtraItem(item, pages, base, groupDepth = 1) {
    return {
        path: item.path,
        title: item.title,
        link: item.link,
        prefix: item.prefix ? item.prefix : item.link,
        icon: item.icon,
        sidebarDepth: item.sidebarDepth
    };
}

export function getDocSetDefaultUri(set) {
    let uri = set.baseDir !== "" ? "/" + set.baseDir : set.baseDir;

    if (set.versions && set.defaultVersion) {
        set.versions.forEach(key => {
            const version = key[0];
            if (version == set.defaultVersion) {
                uri += "/" + version;
            }
        });
    }

    return ensureEndingSlash(uri);
}

export function getAlternateVersion(page, activeVersion, targetVersion, pages, localOnly = false) {
    if (!activeVersion) {
        return false;
    }

    if (page.frontmatter.updatedVersion) {
        const updatedLocation = page.frontmatter.updatedVersion;

        if (isExternal(updatedLocation) && localOnly === false) {
            return updatedLocation;
        }

        const updatedPage = getPageWithRelativePath(pages, updatedLocation);

        if (updatedPage) {
            const anchorHash = getAnchorHash(updatedLocation);
            return updatedPage.relativePath + (anchorHash ? "#" + anchorHash : "");
        }
    }

    const targetPath = page.relativePath.replace(activeVersion, targetVersion);
    const updatedPage = getPageWithRelativePath(pages, targetPath);

    if (updatedPage) {
        return updatedPage.relativePath;
    }
}

export function getPageWithRelativePath(pages, relativePath) {
    for (let i = 0; i < pages.length; i++) {
        const sitePage = pages[i];

        if (sitePage.relativePath == getPathWithoutHash(relativePath)) {
            return sitePage;
        }
    }

    return null;
}

function getPathWithoutHash(path) {
    if (path.includes("#")) {
        let parts = path.split("#");
        return parts[0];
    }

    return path;
}

function getAnchorHash(path) {
    if (path.includes("#")) {
        let parts = path.split("#");
        return parts[1];
    }

    return false;
}

export function getDocSetLocaleSettings(docSet) {
    let localeSettings = [];

    if (docSet.locales) {
        for (const key in docSet.locales) {
            if (docSet.locales.hasOwnProperty(key)) {
                const settings = docSet.locales[key];
                let basePath = docSet.baseDir;

                if (docSet.versions) {
                    for (let i = 0; i < docSet.versions.length; i++) {
                        const version = docSet.versions[i];

                        let versionLabel = version[0];
                        if (basePath === "") {
                            basePath = "/";
                        }

                        let localeKey = `${basePath}${versionLabel}${key}`;
                        localeSettings[localeKey] = settings;
                    }
                }
                else {
                    let localeKey = `${basePath}${key}`;
                    localeSettings[localeKey] = settings;
                }
            }
        }
    }
    else {
        if (docSet.versions) {
            for (let i = 0; i < docSet.versions.length; i++) {
                let basePath = docSet.baseDir;

                const version = docSet.versions[i];

                let versionLabel = version[0];
                if (basePath === "") {
                    basePath = "/";
                } else {
                    basePath = "/" + basePath + "/";
                }

                let localeKey = `${basePath}${versionLabel}/`;
                localeSettings[localeKey] = docSet;
            }
        }
        else {
            let basePath = docSet.baseDir;

            if (basePath === "") {
                basePath = "/";
            }
            else {
                basePath = "/" + basePath + "/";
            }

            let localeKey = `${basePath}`;
            localeSettings[localeKey] = docSet;
        }
    }

    return localeSettings;
}

export function getSameContentForVersion(version, activeSet, activeVersion, page, pages, strict = false) {
    let targetPath = "/" + activeSet.baseDir + "/" + version + "/";

    const alternatePath = getAlternateVersion(
        page,
        activeVersion,
        version,
        pages,
        true
    );

    if (alternatePath) {
        const targetPage = getPageWithRelativePath(pages, alternatePath);
        const anchorHash = getAnchorHash(alternatePath);
        targetPath = "/" + targetPage.path + (anchorHash ? "#" + anchorHash : "");
    }
    else if (strict) {
        return false;
    }

    return fixDoubleSlashes(targetPath);
}
