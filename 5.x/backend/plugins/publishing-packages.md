---
previousPath: extend/resources/publishing-packages.md
subtitle: Publish plugins and themes to the October CMS Marketplace as Composer packages, and install private packages from your own sources.
---
# Publishing Packages

October CMS publishes plugins and themes as [Composer](https://getcomposer.org/) packages. Use this guide when you want to share a plugin or theme on the Marketplace, or install a private one into your projects.

```json
{
    "name": "acme/blog-plugin",
    "type": "october-plugin",
    "description": "Enter a meaningful description here",
    "require": {
        "composer/installers": "~1.0"
    }
}
```

October CMS is fully compatible with Composer, so the Composer documentation applies as an extension of this article.

## Preparing to Publish

To publish a plugin or theme on the October CMS Marketplace, first become an author and choose an author code. This code determines the name of your packages and cannot be changed later.

Store your package in a source control repository that the October CMS gateway can access, such as [GitHub](https://github.com/) or [BitBucket](https://bitbucket.org/). For private packages, the gateway uses the credentials you provide during the publishing process.

Make sure your package `name` ends with **-plugin** or **-theme**. This helps others find your package and follows the [Developer Guide](https://octobercms.com/help/guidelines/developer#package-naming).

::: warning
When you update your plugins or themes to be compatible with newer versions of October CMS, follow [Semantic Versioning](https://semver.org/) to protect older sites from breaking changes.
:::

## Publishing a Plugin

The plugin **composer.json** file needs the content shown at the top of this page at a minimum. The package name must end with **-plugin**, and the package must require `composer/installers`. The `create:plugin` command generates this file for you.

A plugin with the code **Acme.Blog** has the Composer package name `acme/blog-plugin` and is installed in the **plugins/acme/blog** directory.

## Publishing a Theme

The theme **composer.json** file needs this content at a minimum. The package name must end with **-theme**, and the package must require `composer/installers`.

```json
{
    "name": "acme/boilerplate-theme",
    "type": "october-theme",
    "description": "Enter a meaningful description here",
    "require": {
        "composer/installers": "~1.0"
    }
}
```

A theme with the code **Acme.Boilerplate** has the Composer package name `acme/boilerplate-theme` and is installed in the **themes/boilerplate** directory.

## Declaring Dependencies

Plugins and themes can require a specific version of October CMS and depend on other packages. Add them to the `require` section of your **composer.json** file.

### Requiring a Version of October CMS

Require the `october/rain` package with the [target version pattern](https://getcomposer.org/doc/articles/versions.md) you need. The following requires version 3.1 of October CMS or above.

```json
"require": {
    "october/rain": ">=3.1"
}
```

### Requiring Another Plugin

Open the **composer.json** file in your theme or plugin directory and add the dependency with its target version. The following requires the Acme.Blog plugin with a [version range of 1.2](https://getcomposer.org/doc/articles/versions.md).

```json
"require": {
    "acme/blog-plugin": "^1.2"
}
```

Also add the plugin to the `$require` property in the [plugin registration file](./introduction.md#requiring-other-plugins).

### Requiring Another Theme

Open the **composer.json** file in your theme or plugin directory and add the dependency with its target version. The following requires the Acme.Vanilla theme with a [version range of 1.2](https://getcomposer.org/doc/articles/versions.md).

```json
"require": {
    "acme/vanilla-theme": "^1.2"
}
```

Make sure that this package is included in the `require` property found in the [theme information file](../../themes/customization.md#theme-information-file).

### Using Third-Party Packages

To build a plugin or theme that uses an external package or library, install the package in your root Composer file, then copy the definition to your plugin's Composer file. For example, to make the `acme/blog-plugin` plugin depend on the `aws/aws-sdk-php` package, follow these steps.

1. In the root directory, run `composer require aws/aws-sdk-php`. This installs the package in the root Composer file and checks that it is compatible with other packages.

2. Open the root **composer.json** file and find the new dependency. It looks like this.

```json
"require": {
    "aws/aws-sdk-php": "^3.158"
}
```

3. Copy this definition from the root **composer.json** file to the **plugins/acme/blog/composer.json** file. The dependency is now available to your app and required by the plugin for others who install it.

::: warning
Do not commit the plugin's `vendor` directory to source control as a way to ship its dependencies. October CMS loads packages through Composer at the project level, and a bundled `vendor` directory inside a plugin can conflict with the project autoloader. Declare dependencies in the plugin `composer.json` instead, as described below.
:::

### Merging Plugin Dependencies into the Project

When a plugin declares its own dependencies in a **composer.json** file, the project needs a way to read and install them. The [wikimedia/composer-merge-plugin](https://github.com/wikimedia/composer-merge-plugin) package handles this by merging each plugin's **composer.json** into the project when Composer runs. A plugin can then ship its dependencies without bundling a `vendor` directory.

The merge plugin is not included by default, so add it to your project once.

1. In the root directory, require the merge plugin.

```bash
composer require wikimedia/composer-merge-plugin
```

2. Add a `merge-plugin` section to the `extra` property of the root **composer.json** file so that it includes every plugin's **composer.json** file.

```json
"extra": {
    "merge-plugin": {
        "include": ["plugins/*/*/composer.json"],
        "recurse": true,
        "replace": false,
        "merge-dev": false
    }
}
```

3. If Composer prompts you to allow the plugin, add it to the `allow-plugins` section of the `config` property.

```json
"config": {
    "allow-plugins": {
        "wikimedia/composer-merge-plugin": true
    }
}
```

Now when you run `composer update`, any dependency declared in a plugin's **composer.json** file is installed and managed at the project level.

## Tagging a Release

Packages in October CMS follow [semantic versioning](https://semver.org/), and Composer uses git tags to determine the stability and impact of a release.

### Following Semantic Versioning

Semantic versioning protects old sites from breaking changes. By default, Composer does not automatically update a major version.

Upgrading to a new major version is a **manual process**, for example:

- Upgrading from `v1.0.0` to `v2.0.0`

Composer **automatically updates** minor and patch versions, for example:

- Updating from `v1.2.0` to `v1.3.0`
- Updating from `v1.3.5` to `v1.3.6`

Read the Composer article on [Versions and Constraints](https://getcomposer.org/doc/articles/versions.md) to learn more.

### Listing Your Tags

Use the `git tag` command to list the existing tags for your package.

```bash
$ git tag
v1.0
v2.0
```

### Creating a New Tag

To create a new tag, add (`-a`) the version with an optional (`-m`) message.

```bash
git tag -a v2.0.1 -m "Version 2 is here!"
```

### Incrementing the Version File

Along with tagging, increment the version in your [plugin version file](./versions.md) or [theme version file](../../themes/customization.md#version-file). This file tells the October CMS gateway the latest version and holds the previous version history.

- The gateway uses the version file found in the **default branch** of the repository.
- Composer installs and updates using the **latest stable tag** of the repository.

This means the version file in the default branch should always match the latest stable tag in git.

## Installing Private Plugins and Themes

Composer lets you add private repositories from GitHub and other providers to your October CMS projects. Prepare the package the same way as for publishing a plugin or theme.

Store a copy of your private plugin or theme somewhere the main project can reach. The `plugin:install` and `theme:install` commands install private packages from either a remote or local source. They add the location to your Composer file and install it like any other package.

### Installing from a Remote Source

Use the `--from` option to set the location of your remote source.

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git
```

To use a specific version or branch, add the `--want` option. For example, to request the **develop** branch version:

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git --want=dev-develop
```

::: tip
If you use the `git@` address of a repository, Composer prefers the source version and clones the repository, so you can continue to push updates normally.
:::

### Installing from a Local Source

To install a plugin with Composer from the same project source, point `--from` to the plugin directory.

```bash
php artisan plugin:install Acme.Blog --from=./plugins/acme/blog
```

You can also use a source on a local or network drive.

```bash
php artisan plugin:install Acme.Blog --from=/home/sam/private-plugins/acme-blog
```

#### See Also

::: also
* [Version History](./versions.md)
* [Console Commands](../../setup/console-commands.md)
* [Semantic Versioning](https://semver.org/)
* [Composer Versions and Constraints](https://getcomposer.org/doc/articles/versions.md)
:::
