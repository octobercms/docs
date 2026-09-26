// Slugifier that produces the anchor slugs the site's URLs depend on.
//
// The character classes are built with String.fromCharCode so the source stays
// pure ASCII, which keeps the ranges portable across JS engines (JavaScriptCore
// rejects some literal Unicode ranges that other engines accept).
const cc = String.fromCharCode;

// Control characters u0000-u001f
const rControl = new RegExp('[' + cc(0) + '-' + cc(31) + ']', 'g');

// Whitespace + special characters, including curly quotes (u201C u201D u2018
// u2019) and en/em dashes (u2013 u2014)
const rSpecial = new RegExp(
    '[\\s~`!@#$%^&*()\\-_+=[\\]{}|\\\\;:"\'' +
    cc(0x201c) + cc(0x201d) + cc(0x2018) + cc(0x2019) + cc(0x2013) + cc(0x2014) +
    '<>,.?/]+',
    'g'
);

// Combining diacritical marks u0300-u036F
const rCombining = new RegExp('[' + cc(0x0300) + '-' + cc(0x036f) + ']', 'g');

export default function slugify(str) {
    // Split accented characters into components
    return str.normalize('NFKD')
        // Remove accents
        .replace(rCombining, '')
        // Remove control characters
        .replace(rControl, '')
        // Replace special characters
        .replace(rSpecial, '-')
        // Remove continuous separators
        .replace(/\-{2,}/g, '-')
        // Remove prefixing and trailing separators
        .replace(/^\-+|\-+$/g, '')
        // Ensure it doesn't start with a number (#121)
        .replace(/^(\d)/, '_$1')
        // Lowercase
        .toLowerCase();
}
