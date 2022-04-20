# Publishing Packages

October CMS uses [Composer](https://getcomposer.org/) to publish packages and is fully compatible, so their documentation applies as an extension of this article.

To publish your plugin or theme on the October CMS marketplace, you will need to first become an author and choose an author code. This code will determine the name of your packages and cannot be changed later.

Your package should reside in a source control repository that can be accessed by the October CMS gateway, such as [GitHub](https://github.com/) or [BitBucket](https://bitbucket.org/). For private packages, the server can access them using the credentials you provide during the publishing process.

Be sure to start your package `name` ends with **-plugin** or **-theme** respectively, this will help others find your package and is in accordance with the [Developer Guide](https://octobercms.com/help/guidelines/developer#package-naming).

<a id="oc-publishing-plugins"></a>
### Publishing Plugins

When publishing your plugin the `composer.json` file should have this JSON content at a minimum. Notice that the package name must end with **-plugin** and include the `composer/installers` package as a dependency.

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

A plugin with the code **Acme.Blog** will have a composer package name of `acme/blog-plugin` and will be installed in the **plugins/acme/blog** directory.

<a id="oc-publishing-themes"></a>
### Publishing Themes

When publishing your theme the `composer.json` file should have this JSON content at a minimum. Notice that the package name must end with **-theme** and include the `composer/installers` package as a dependency.

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

A plugin with the code **Acme.Boilerplate** will have a composer package name of `acme/boilerplate-theme` and be installed in the **themes/boilerplate** directory.

### Declaring Dependencies

Plugins and themes alike can require a specific version of October CMS and also depend on other packages, simply include them in your composer.json file.

#### Requiring a Version of October CMS

Simply require the `october/system` package to the desired [target version pattern](https://getcomposer.org/doc/articles/versions.md). The following will require that the platform installation uses version 2.1 of October CMS.

```json
"require": {
    "october/system": "^2.1"
}
```

#### Requiring Another Plugin

Navigate to your theme or plugin directory and open the composer.json file to include a dependency and its target version. The following will include the Acme.Blog plugin with a [version range of 1.2](https://getcomposer.org/doc/articles/versions.md).

```json
"require": {
    "acme/blog-plugin": "^1.2"
}
```

You should also make sure that this package is included in the `$require` property found in the [plugin registration file](../system/plugins.md).

#### Requiring Another Theme

Navigate to your theme or plugin directory and open the composer.json file to include a dependency and its target version. The following will include the Acme.Vanilla theme with a [version range of 1.2](https://getcomposer.org/doc/articles/versions.md).

```json
"require": {
    "acme/vanilla-theme": "^1.2"
}
```

Make sure that this package is included in the `require` property found in the [theme information file](../themes/development.md#oc-theme-dependencies).

#### Developing With Third Party Packages

To create a new plugin or theme that uses an external package or library, you should install it to your root composer file and then copy the definition across to your plugin composer file. For example, if you want your plugin `acme/blog-plugin` to depend on the `aws/aws-sdk-php` package.

1. In the root directory, run `composer require aws/aws-sdk-php`. This will install the package to the root composer file and ensure that it is compatible with other packages.

2. Once completed, open the root directory **composer.json** file to locate the newly defined dependency. For example, you will see something like this:

```json
"require": {
    "aws/aws-sdk-php": "^3.158"
}
```

3. Copy this definition from the root **composer.json** file and include it in the **plugins/acme/blog/composer.json** file for your plugin. Now the dependency is available to your app and also required by the plugin for others to use.

### Tagging a Release

Packages in October CMS follow semantic versioning and Composer uses git to determine the stability and impact of a given release.

#### Listing your tags

Use the `git tag` command to list the existing tags for your package.

```bash
$ git tag
v1.0
v2.0
```

#### Creating a new tag

To create a new tag add (`-a`) the version with an optional (`-m`) message.

```bash
git tag -a v2.0.1 -m "Version 2 is here!"
```

In addition to tagging, you should also increment the version file found in your [plugin version file](../system/plugins.md) or [theme settings](../../cms/themes/settings.md).

## Private Plugins and Themes

Composer allows you to add private repositories from GitHub and other providers to your October CMS projects. Make sure you have followed the same instructions for [publishing plugins](#oc-publishing-plugins) and [themes](#oc-publishing-themes) respectively.

In all cases, you should have a copy of your private plugin or theme stored somewhere available to the main project. The `plugin:install` and `theme:install` commands can be used to install private plugins from either a remote or local source. This will add the location to your composer file and install it like any other package.

#### Install from a remote source

Use the `--from` option to specify the location to your remote source when installing.

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git
```

To use a specific version or branch, use the `--want` option, for example to request the **develop** branch version.

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git --want=dev-develop
```

> **Note**: If you use the `git@` address of a repository, composer will prefer the source version and clone the repository so you can continue to push updates normally.

#### Install from a local source

To install a plugin using composer from the same project source.

```bash
php artisan plugin:install Acme.Blog --from=./plugins/acme/blog
```

You may also use a source found on a local or network drive.

```bash
php artisan plugin:install Acme.Blog --from=/home/sam/private-plugins/acme-blog
```