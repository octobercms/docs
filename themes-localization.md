# Localization

- [Localization directory and file structure](#file-structure)

Themes can have localization files in the **lang** subdirectory of the theme directory. Theme's localization files
 are registered automatically when the theme is being edited in the backend. The localization strings are supported
  automatically in the back-end customization form labels - if you provide the localization key instead of a real
   string, the system will try to load it from the localization file.
   
> **Note**: For translating front-end content, [there are plugins that can be used](http://octobercms.com/plugin/rainlab-translate) for this purpose.

<a name="file-structure"></a>
## Localization directory and file structure

Below is an example of the theme's lang directory:

    themes/
      acme/               <=== Theme directory
        lang/             <=== Localization directory
          en/             <=== Language directory
            lang.php      <=== Localization file
          fr/
            lang.php


The **lang.php** file should define and return an array of any depth, for example:

    <?php

    return [
        'options' => [
            'website_name' => 'OctoberCMS'
        ]
    ];

> **Note**: the full localization key format is the following: theme.theme-code::lang.key. So for example above it
> would be `theme.theme-code::lang.options.website_name`