Modules and plugins can have localization files in the /lang directory. Plugins' localization files are registered automatically. Modules should register their localization namespaces in the boot() method with the following code:

    Lang::addNamespace('cms', __DIR__.'/lang');

## Accessing localization strings

````
// Get a localization string from the CMS module
echo Lang::get('cms::errors.page.not_found');

// Get a localization string from the october/blog plugin.
echo Lang::get('october.blog::messages.post.added');
````

## Overriding localization strings

System users can override localization strings without altering the modules' and plugins' files. This is done by adding localization files to the app/lang directory. To override a plugin's localization:

````
app
  lang
    vendorname
      pluginname
        en
          file.php
````
Example: app/lang/october/blog/en/errors.php

To override a module's localization:

````
app
  lang
    modulename
      en
        file.php
````
Example: app/lang/cms/en/errors.php