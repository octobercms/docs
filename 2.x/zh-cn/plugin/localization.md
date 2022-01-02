# 本地化

Plugins can have localization files in the **lang** subdirectory of the plugin directory. Plugin localization files are detected by the system automatically. Using localization strings are supported natively in the back-end user interface menus, form labels, etc. - if you provide the localization key instead of a real string, the system will try to load it from the localization file. In other cases you need to load the localization string [with the API](#accessing-localization-strings).

> **Note**: For translating front-end content, [there are plugins that can be used](http://octobercms.com/plugin/rainlab-translate) for this purpose.

## Localization Directory and File Structure

Below is an example of the plugin's **lang** directory:

```
plugins/
  acme/
    todo/             <=== Plugin Directory
      lang/           <=== Localization Directory
        en/           <=== Language Directory
          lang.php    <=== Localization File
        fr/
          lang.php
```

The **lang.php** file should define and return an array of any depth, for example:

```php
return [
    'app' => [
        'name' => 'October CMS',
        'tagline' => 'Getting Back to Basics'
    ]
];
```

The **validation.php** file has a similar structure to the **lang.php** and is used to specify your [custom validation](https://octobercms.com/docs/services/validation#localization) messages in a language file, for example:

```php
return [
    'required' => 'We need to know your xxx!',
    'email.required' => 'We need to know your e-mail address!',
];
```

## Accessing Localization Strings

The localization strings can be loaded with the `Lang` class. The parameter it accepts is the localization key string that consists of the plugin name, the localization file name and the path to the localization string inside the array returned from the file. The next example loads the **app.name** string from the plugins/acme/blog/lang/en/lang.php file (the language is set with the `locale` parameter in the `config/app.php` configuration file):

```php
echo Lang::get('acme.blog::lang.app.name');
```

## Overriding Localization Strings

System users can override plugin localization strings without altering the plugins' files. This is done by adding localization files to the **lang** directory. For example, to override the lang.php file of the **acme/blog** plugin you should create the file in the following location:

```
lang/               <=== App Localization Directory
  en/               <=== Language Directory
    acme/           <=== Plugin / Module Directory
      blog/         <===^
        lang.php    <=== Localization Override File
```

The file could contain only strings you want to override, there is no need to replace the entire file. Example:

```php
return [
    'app' => [
        'name' => 'October CMS!'
    ]
];
```
