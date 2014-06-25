# Localization

- [Localization directory and file structure](#file-structure)
- [Accessing localization strings](#accessing-strings)
- [Overriding localization strings](#overriding)

Plugins can have localization files in the **lang** subdirectory of the plugin directory. Plugins' localization files are registered automatically. The localization strings are supported automatically in the back-end user interface menus, form labels, etc. - if you provide the localization key instead of a real string, the system will try to load it from the localization file. In other cases you need to load the localization string [with the API](#accessing-strings). 

<a name="file-structure" class="anchor" href="#file-structure"></a>
## Localization directory and file structure

Below is an example of the of the plugin's lang directory:

    app
      plugins
        acme
          todo              <==== Plugin directory
            lang            <==== Localization directory
              en            <==== Language directory
                lang.php    <==== Localization file
              fr
                lang.php


The **lang.php** file should define and return an array of any deepness, for example:

    <?php

    return [
        'app' => [
            'name' => 'October CMS',
            'motto' => 'Getting back to basics',
        ]
    }

<a name="accessing-strings" class="anchor" href="#accessing-strings"></a>
## Accessing localization strings

The localization strings can be loaded with the `Lang` class. The parameter it accepts is the localization key string that consists of the plugin name, the localization file name and the path to the localization string inside the array returned from the file. The next example loads the **app.name** string from the plugins/acme/blog/lang/en/lang.php file (the language is set with the `locale` parameter in the `app/config/app.php` configuration file):

    echo Lang::get('acme.blog::lang.app.name');

<a name="overriding" class="anchor" href="#overriding"></a>
## Overriding localization strings

System users can override plugin localization strings without altering the plugins' files. This is done by adding localization files to the app/lang directory. For example, to override the lang.php file of the **acme/blog** plugin you should create the file in the following location:

    app/
      lang/
        acme/
          blog/
            en/
              lang.php

The file could contain only strings you want to override, there is no need to replace the entire file. Example:

    <?php

    return [
        'app' => [
            'name' => 'October CMS!'
        ]
    }