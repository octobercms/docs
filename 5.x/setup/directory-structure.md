---
previousPath: setup/directory-structure.md
subtitle: Find out what each directory in an October CMS project holds and which ones you work in.
---
# Directory Structure

October CMS uses a modular structure. Your own code lives in the `app`, `plugins` and `themes` directories, while the core features live in the `modules` directory.

::: dir
├── app  _← Application Code_
├── bootstrap  _← Framework Bootstrap_
├── config  _← Configuration Files_
├── modules  _← Core Modules_
├── plugins  _← Plugins_
├── storage  _← Generated Files_
├── themes  _← Website Themes_
└── vendor  _← Composer Packages_
:::

## Directories You Work In

### App Directory

The `app` directory contains application-specific files, including content, assets and business logic that doesn't belong in a [traditional plugin](../backend/plugins/introduction.md). Most plugin features are available in this directory. It includes a service provider file, **app/Provider.php**, that October CMS loads automatically.

- `app/assets` contains asset files, such as JavaScript, CSS and image files. This directory should be publicly accessible to the website.
- `app/blueprints` contains the [content blueprint](../themes/tailor/introduction.md) files used by Tailor.

You may create any other directory here, such as `models` or `controllers`, the same way you would in a plugin. These are autoloaded in the `App` namespace. For example, the file **app/models/Customer.php** is available in PHP as `App\Models\Customer`.

### Config Directory

The `config` directory contains the application configuration files. Each file controls part of how the application works, and you can change them to suit your requirements. System updates do not modify the configuration files.

### Plugins Directory

The `plugins` directory contains packages that extend the core functionality of October CMS. Plugins can modify the platform by introducing new features. By default, the system loads all plugins found in the filesystem. You can disable specific plugins with the `system.disable_plugins` configuration parameter.

### Themes Directory

The `themes` directory contains a subdirectory for each frontend website theme. Themes include the template files for the website pages, layouts and partials, along with assets and other files. The active theme is set with the `cms.active_theme` configuration parameter, and can be overridden on the settings page of the backend panel.

## Directories Managed for You

### Storage Directory

The `storage` directory contains log files, cache files, sessions and other files that October CMS generates. It includes several subdirectories:

* `app` contains application-specific storage files, such as media files, file uploads and automatically generated resources, for example resized images and combined asset files.
* `framework` is used by the Laravel framework to store its generated files and caches.
* `cms` is used by October CMS to store its generated files and caches.
* `logs` contains the application's log files.
* `temp` stores temporary application files.

### Modules Directory

The `modules` directory contains the core packages of October CMS, which provide the functionality shared across the system. By default, modules load automatically when they are present in the filesystem. You can choose which modules to load with the `system.load_modules` configuration parameter. The `system` module must always be loaded for the application to run.

* `system` defines the core functionality of October CMS and is required.
* `backend` displays the backend panel pages.
* `cms` renders the frontend website theme. It routes requests to pages, renders pages and handles AJAX requests.
* `dashboard` provides the customizable backend dashboards and their report widgets.
* `editor` provides the interface for editing CMS templates in the backend panel.
* `media` provides the media manager in the backend panel. Backend users can upload media files, such as images or video, and insert them elsewhere, for example in blog posts.
* `tailor` provides the October CMS Tailor features.

### Vendor Directory

The `vendor` directory contains the packages installed with Composer. Some plugins include their own vendor directory as well. The system vendor directory takes priority over plugin vendor directories.

### Bootstrap Directory

The `bootstrap` directory contains the **app.php** script that loads the Laravel framework, and the custom PHP class autoloader in **autoload.php**. You should not need to modify the files in this directory.

#### See Also

::: also
* [Configuration](./configuration.md)
* [Plugin Structure](../backend/plugins/introduction.md)
* [Theme Structure](../themes/structure.md)
:::
