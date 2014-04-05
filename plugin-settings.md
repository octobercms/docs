# Plugin Settings & Configuration

- [Database Settings](#database-settings)
- [File-based Configuration](#file-configuration)



<a name="database-settings"></a>
## Database Settings

You can create models used for storing settings easily by implementing the **SettingsModel** behavior. You do not need to create a database table or a controller.

Settings models can be registered in the [Plugin registration file](http://octobercms.com/docs/plugin/registration#backend-settings) to appear on the Settings page.

    class Settings extends Model
    {
        public $implement = ['System.Behaviors.SettingsModel'];

        // A unique code
        public $settingsCode = 'october_user_settings';

        // Reference to field configuration
        public $settingsFields = 'fields.yaml';
    }

#### Writing to a settings model

    // Set a single value
    Settings::set('api_key', 'ABCD');

    // Set an array of values
    Settings::set(['api_key' => 'ABCD']);

    // Set object values
    $settings = Settings::instance();
    $settings->api_key = 'ABCD';
    $settings->save();

#### Reading from a settings model

    // Outputs: ABCD
    echo Settings::instance()->api_key;

    // Get a single value
    echo Settings::get('api_key');

    // Get a value and return a default value if it doesn't exist
    echo Settings::get('is_activated', true);



<a name="file-configuration"></a>
## File-based Configuration

Modules and plugins can have configuration files in the /config directory.

#### Accessing configuration settings

    // Get a localization string from the CMS module
    echo Config::get('cms::errors.page.not_found');

    // Get a localization string from the october/blog plugin.
    echo Config::get('october.blog::messages.post.added');

#### Overriding localization strings

System users can override localization strings without altering the modules' and plugins' files. This is done by adding localization files to the app/lang directory. To override a plugin's localization:

    app/
      config/
        acme/
          blog/
            en/
              file.php

Example: app/config/october/blog/errors.php

To override a module's config:

    app/
      lang/
        module/
          en/
            file.php

Example: app/config/cms/errors.php
