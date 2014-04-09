# Plugin Settings & Configuration

- [Database settings](#database-settings)
- [Back-end settings forms](#backend-forms)
- [File-based configuration](#file-configuration)

There are two ways to configure plugins - with the back-end settings forms and with the configuration files. The back-end settings forms provide the better user experience, but they are more complicated for the development.

<a name="database-settings" class="anchor" href="#database-settings"></a>
## Database settings

You can create models for storing settings in the database by implementing the `SettingsModel` behavior in a model class. This model can be used directly for creating the back-end settings form. You don't need to create a database table and a controller for creating the back-end settings forms based on the settings model.

The settings model classes should extend the Model class and implement the `System.Behaviors.SettingsModel` behavior. The settings models, like any other models, should be defined in the **models** subdirectory of the plugin directory. The model from the next example should be defined in the `plugins/acme/demo/models/Settings.php` script. 

    <?php namespace Acme\Demo;

    class Settings extends Model
    {
        public $implement = ['System.Behaviors.SettingsModel'];

        // A unique code
        public $settingsCode = 'acme_demo_settings';

        // Reference to field configuration
        public $settingsFields = 'fields.yaml';
    }

The `$settingsCode` property is required for settings models. It defines the the unique settings key which is used for saving the settings to the database. 

The `$settingsFields` property is required if are going to build a back-end settings form based on the model. The property specifies a name of the YAML file containing the form fields definition. The form fields are described in the [Backend forms](../backend/forms) article. The YAML file should be placed to the directory with the name matching the model class name in lowercase. For the model from the previous example the directory structure would look like this:

    plugins/
      acme/
        demo/
          models/
            settings/          <=== Model files directory
              fields.yaml      <=== Model form fields
            Settings.php       <=== Model script

Settings models can be registered in the [Plugin registration file](http://octobercms.com/docs/plugin/registration#backend-settings) to appear on the **back-end Settings page**, but it is not necessary - you can set and read settings values with the API.

<a name="writing-settings" class="anchor" href="#writing-settings"></a>
### Writing to a settings model

The settings model has the static `set()` method that allows to save individual or multiple values. You can also use the standard model features for setting the model properties and saving the model.

    use Acme\Demo\Settings;

    ...

    // Set a single value
    Settings::set('api_key', 'ABCD');

    // Set an array of values
    Settings::set(['api_key' => 'ABCD']);

    // Set object values
    $settings = Settings::instance();
    $settings->api_key = 'ABCD';
    $settings->save();

<a name="reading-settings" class="anchor" href="#reading-settings"></a>
### Reading from a settings model

The settings model has the static `get()` method that lets you to load individual properties. Also, when you instantiate a model with the `instance()` method it loads the properties from the database and you can access them directly.

    // Outputs: ABCD
    echo Settings::instance()->api_key;

    // Get a single value
    echo Settings::get('api_key');

    // Get a value and return a default value if it doesn't exist
    echo Settings::get('is_activated', true);

<a name="file-configuration" class="anchor" href="#file-configuration"></a>
## File-based configuration

Plugins can have a configuration file `config.php` in the `config` subdirectory of the plugin directory. The configuration files are PHP scriptsthat define and return an **array**. Example configuration file `plugins/acme/demo/config/config.php`:

    <?php

    return array(
        'maxItems' => 10,
        'display' => 5
    );


Use the `Config` class for accessing the configuration values defined in the configuration file. The `Config::get($name, $default=null)` method accepts the plugin and the parameter name in the following format: **Acme.Demo::maxItems**. The second optional parameter defines the default value to return if the configuration parameter doesn't exist. Example:

    use Config;

    ...

    $maxItems = Config::get('Acme.Demo::maxItems', 50);

A plugin configuration can be overridden by creating the configuration file `/app/config/author/plugin/config.php`, for example `/app/config/acme/todo/config.php`. Inside the overridden configuration file you can return only values you want to override:

    <?php

    return array(
        'maxItems' => 20
    );