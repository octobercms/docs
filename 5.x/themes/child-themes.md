---
previousPath: cms/themes/child-themes.md
subtitle: Customize a theme without changing its files by creating a child theme that inherits from it.
---
# Child Themes

A child theme inherits everything from a parent theme and overrides only the files you change. Use one to customize a third-party theme, or a theme in read-only mode, without losing your changes when the parent is updated.

```bash
php artisan theme:copy demo demo-child --child
```

## How Child Themes Work

A child theme references a parent and uses it as a fallback source. If a page named `home.htm` exists in the parent theme but not in the child, the child behaves as if it had the page: the URL is active and you can open the page as normal. When you save the page in the admin panel, a new file is created in the child theme to override the parent's contents.

## Creating a Child Theme

The `theme:copy` command with the `--child` option creates a child theme. The command above creates the **demo-child** theme, which contains a copy of the parent's **theme.yaml** file with the `parent` field set to `demo`.

To turn an existing theme into a child theme, go to **Settings → Site Theme**, select **Manage → Edit Properties** for the theme, and choose a parent from the **Parent Theme** dropdown list on the **Advanced** tab.

### Copying a Theme

Without the `--child` option, the `theme:copy` command copies the source theme directory and its contents to a new theme. The following command creates the **demo-copy** theme from the **demo** theme. The `.themelock` file is removed during the copy.

```bash
php artisan theme:copy demo demo-copy
```

## Protecting a Theme with a Lock File

When a theme is installed from a third party with Composer, updating the theme can overwrite all its files, along with any customizations made to them. As a safety mechanism, a theme can include a `.themelock` file to protect it from changes that would be lost during a system update.

When the `.themelock` file is present in the theme directory:

- The theme can only be selected as a parent theme.
- The theme does not appear in the admin panel.
- The theme cannot be selected as active.

To customize a locked theme, create a child theme from it. The [`theme:check` command](../setup/console-commands.md) does this for you: it finds themes installed with Composer, creates a child theme for each one and adds the `.themelock` file. A theme that contains a `.themenolock` file is never locked.

```bash
php artisan theme:check
```

#### See Also

::: also
* [Theme Customization](./customization.md)
* [Building Assets with Vite](./vite.md#using-vite-with-child-themes)
* [Storing Themes in the Database](./database-themes.md)
:::
