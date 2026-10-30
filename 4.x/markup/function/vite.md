---
subtitle: Twig Function
---
# vite()

The `vite()` function renders the tags for assets that [Vite](https://vite.dev) builds inside the active theme. Pass the entry points, as they are listed in the theme's **vite.config.js** file.

```twig
{{ vite(['assets/css/theme.css', 'assets/js/app.js']) }}
```

The function reads the build manifest from the **assets/dist** directory of the theme and outputs the tags for the built files, including preload tags for their dependencies.

```html
<link rel="preload" as="style" href="https://octobercms.com/themes/mytheme/assets/dist/theme-B2xQ1h3a.css" />
<link rel="modulepreload" as="script" href="https://octobercms.com/themes/mytheme/assets/dist/app-C9kD2fRe.js" />
<link rel="stylesheet" href="https://octobercms.com/themes/mytheme/assets/dist/theme-B2xQ1h3a.css" />
<script type="module" src="https://octobercms.com/themes/mytheme/assets/dist/app-C9kD2fRe.js"></script>
```

A single entry point can be passed as a string.

```twig
{{ vite('assets/js/app.js') }}
```

The second argument sets a different build directory, relative to the theme directory.

```twig
{{ vite(['assets/js/app.js'], 'assets/build') }}
```

## Dev Server

While the Vite dev server runs, a **hot** file in the theme directory holds its address. The function then outputs the Vite client and the entry points from the dev server instead of the build.

```html
<script type="module" src="http://localhost:5173/@vite/client"></script>
<script type="module" src="http://localhost:5173/assets/js/app.js"></script>
```

See the [Vite article](../../cms/themes/vite.md) for setting up a theme and its **vite.config.js** file.

## Child Themes

In a [child theme](../../cms/themes/child-themes.md) that doesn't have its own build, the function uses the build of the parent theme.
