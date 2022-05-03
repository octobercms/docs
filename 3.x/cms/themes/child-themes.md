---
subtitle: Override a theme by creating a child version.
---
# Child Themes

Child themes allow for the possibility of theme inheritence. A good use of this is when you have a third party theme or a theme that is in read-only mode. A child theme will reference a parent and use it as a fallback source.

If a page named `home.htm` exists in the parent theme but not the child, it treats it the same as if it did; the URL is active, and you can open the page like normal. When saving the page in the backend area, a new file is created in the child theme to override the contents.

To enable this feature for a theme, navigate to **Settings → Frontend Theme**, select **Edit Properties** and select a parent from the **Parent Theme** dropdown list.

## Theme Lock File

When installing a theme from a third party using Composer, it is important to note that when the theme is updated, all the files can be overwritten. This could result in any customizations made to the theme being lost. As a safety mechanism, a file called `.themelock` is included to protect a theme from any changes that may be lost during a system update.

When the file `.themelock` is present in the theme directory:

- The theme can only be selected as a parent theme
- The theme does not appear in the backend UI
- The theme cannot be selected as active

## Creating a New Child Theme

The `theme:copy` command can be used to create new themes, including child themes. The following command creates a new theme called `demo-copy` from the source theme `demo` by copying the directory and its contents. The `.themelock` file will be removed during this process.

```bash
php artisan theme:copy demo demo-copy
```

To create a child theme that inherits the parent theme, specify the `--child` option.

```bash
php artisan theme:copy demo demo-child --child
```
