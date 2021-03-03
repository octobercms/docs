# Directory Structure

<a name="package-descriptions"></a>
## Package Descriptions

There are many different moving parts that come together to make the October CMS platform work. Here we will describe the various packages you will likely encounter:

- **Modules** are the core packages that are included with October, you can think of them as "internal plugins" that provide core functionality. Modules use the package type `october-module` and are located within the `/modules` directory. They are loaded manually via configuration and at least one module must be present in the `cms.loadModules` configuration item for the system to operate.

- **Plugins** extend the core functionality of October and are packages of type `october-plugin`. They are located within the `/plugins` directory. The `System` module is responsible for the loading of plugins which happens automatically when found in the file system, unless they are explicitly disabled.

- **Themes** contain static file content that is used to manage the front end structure of your website and use the package type `october-theme`. They are located within the `/themes` directory. The `Cms` module is responsible for managing themes and determining what theme is currently active.

- **Vendor** packages are included via Composer in either the project's `/vendor` directory or can sometimes be found in plugin-specific `/vendor` directories. The project vendor directory takes priority over and plugin vendor directories that appear in the system.
