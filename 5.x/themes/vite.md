---
previousPath: cms/themes/vite.md
subtitle: Bundle a theme's stylesheets and scripts with Vite, with a dev server that reloads them as you edit.
---
# Building Assets with Vite

[Vite](https://vite.dev) can bundle a theme's stylesheets and scripts, with a dev server that reloads them as you edit. Vite builds the assets into a directory inside the theme, and the [`vite()` Twig function](../handbook/twig-functions/vite.md) renders the tags that load them.

```twig
<head>
    {{ vite(['assets/css/theme.css', 'assets/js/app.js']) }}
</head>
```

The function reads everything from the theme directory, so it works the same whether the project serves files from its root, from a `public` folder created by `october:mirror`, or from a `public` folder kept in source control.

## Setting Up a Theme

Install Vite in the theme directory, which becomes the root of the Vite project.

```bash
cd themes/mytheme
npm install --save-dev vite
```

Add the scripts to the theme's **package.json** file.

```json
{
    "private": true,
    "type": "module",
    "scripts": {
        "dev": "vite",
        "build": "vite build"
    },
    "devDependencies": {
        "vite": "^8.0.0"
    }
}
```

Then create a **vite.config.js** file in the theme directory. It lists the entry points and writes the build to the **assets/dist** directory.

```js
import { defineConfig, loadEnv } from 'vite';
import { rmSync, writeFileSync } from 'node:fs';

const devServerUrl = 'http://localhost:5173';

export default defineConfig(({ command, mode }) => {
    // The website address, read from the project .env file
    const { APP_URL } = loadEnv(mode, '../..', 'APP_URL');

    return {
        // Asset URLs inside built files are relative, so fonts and images load
        // from wherever the theme is served
        base: command === 'build' ? './' : '/',
        publicDir: false,
        build: {
            outDir: 'assets/dist',
            assetsDir: '',
            emptyOutDir: true,
            manifest: 'manifest.json',
            rolldownOptions: {
                input: [
                    'assets/css/theme.css',
                    'assets/js/app.js',
                ],
            },
        },
        server: {
            origin: devServerUrl,
            // Localhost, as Vite allows by default, and the website address
            cors: {
                origin: [
                    /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/,
                    ...(APP_URL ? [new URL(APP_URL).origin] : []),
                ],
            },
        },
        plugins: [hotFile(devServerUrl)],
    };
});

/**
 * hotFile writes the dev server address to a "hot" file while the dev server
 * runs, which tells the vite() function to load assets from the dev server.
 */
function hotFile(url) {
    return {
        name: 'hot-file',
        apply: 'serve',
        configureServer(server) {
            server.httpServer?.once('listening', () => writeFileSync('hot', url));

            process.on('exit', () => rmSync('hot', { force: true }));
            for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
                process.on(signal, () => process.exit());
            }
        },
    };
}
```

The `vite()` function requires the following options.

Option | Why
------------- | -------------
`build.manifest: 'manifest.json'` | The function reads **manifest.json** from the build directory. With `manifest: true`, Vite writes it to a **.vite** subdirectory instead.
`base: './'` | Built stylesheets refer to fonts and images relative to themselves. The default absolute base would point them at the website root.
`build.outDir` | The build directory, **assets/dist** by default. Pass a different one as the second argument of the `vite()` function.
The hot file | Vite doesn't write one on its own. While the **hot** file exists in the theme directory, the function loads assets from the address inside it.

::: tip
Vite 7 and earlier use `rollupOptions` instead of `rolldownOptions`.
:::

## Loading the Assets

Render the entry points in the layout with the `vite()` function. List the same files as the `input` option in **vite.config.js**.

```twig
<head>
    {{ vite(['assets/css/theme.css', 'assets/js/app.js']) }}
</head>
```

## Running the Dev Server

Run the dev server from the theme directory.

```bash
npm run dev
```

While it runs, pages load the entry points from the dev server. Changes to stylesheets apply straight away, and changes to scripts reload the page. Besides localhost, the dev server only answers requests from the address in the project's `APP_URL` setting, so make sure it matches the address you use to open the website.

Stop the dev server with **Ctrl+C**, which removes the **hot** file. If the process stops another way, delete the **hot** file yourself. Otherwise pages keep loading assets from a dev server that isn't running.

## Building for Production

Build the assets from the theme directory.

```bash
npm run build
```

Vite writes the bundled files with hashed names to **assets/dist**, along with **manifest.json**. Deploy these files with the theme, either by committing them or by running the build during deployment. Add the **hot** file and the **node_modules** directory to the theme's **.gitignore** file.

```
/node_modules
/hot
```

The built files load through the same address as other theme assets, so they follow the `THEMES_ASSET_URL` setting when the theme assets are served from a CDN.

## Using Vite with Child Themes

A [child theme](./child-themes.md) without its own build uses the build of its parent theme. To bundle different assets in the child theme, set up Vite in the child theme directory, which then takes priority.

#### See Also

::: also
* [vite() Twig Function](../handbook/twig-functions/vite.md)
* [Child Themes](./child-themes.md)
* [Vite Documentation](https://vite.dev)
:::
