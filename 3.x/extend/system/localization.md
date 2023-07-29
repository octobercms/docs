---
subtitle: Learn how to translate messages in the backend area.
---
# Localization

::: aside
The language strings defined here will only be loaded in the backend panel. For translating frontend content, visit the [Theme Localization article](../../cms/themes/settings.md).
:::

Plugins can have localization files inside **lang** subdirectory. Plugin localization files use the JSON format and detected by the system automatically in the backend panel. Using localization strings are supported natively in the backend user interface menus, form labels, etc.

## Active Language

The default language for your application is stored in the `config/app.php` configuration file's locale configuration option. You are free to modify this value to suit the needs of your application. Each user can set their preferred locale setting via the **User Menu → Backend Preferences**.

You can check the active language in PHP using the `App::getLocale` method and set the active language using `App::setLocale` that takes the language code as the first argument.

```php
App::getLocale();

App::setLocale('fr');
```

## Localization File Structure

Below is an example of the plugin's **lang** directory.

::: dir
├── plugins
|   └── acme
|       └── todo
|           └── `lang`
|               ├── en.json  _← Localization File_
|               └── fr.json  _← Localization File_
:::

Using JSON files for localization is the preferred method of translation where strings use the "default" translation of the string as the key. For example, if your application has a French translation, you should create a `lang/fr.json` file.

```json
{
    "I love programming.": "j'adore programmer"
}
```

::: tip
Laravel offers a PHP-based translation method as a supported alternative to using JSON. View the [Laravel Localization article](https://laravel.com/docs/10.x/localization) to learn more.
:::

## Accessing Localization Strings

The localization strings can be loaded with the `__()` helper function by passing the default translation of your string.

```php
echo __('I love programming.');
```

Replacing parameters in translation strings is possible by passing an array as the second argument. Every parameter is prefixed with a `:` character.

```php
echo __(':name loves programming.', ['name' => 'Jeff']);
```

### Pluralized Values

Different languages can have a variety of complex rules for pluralization. Using the `|` character, you may distinguish singular and plural forms of a string.

```json
{
    "There is one apple|There are many apples": "Il y a une pomme|Il y a beaucoup de pommes"
}
```

More complex pluralization rules can specify translation strings for multiple ranges of values.

```json
{
    "{0} There are none|[1,19] There are some|[20,*] There are many": "..."
}
```

The `trans_choice` function is used to process pluralized values.

```php
echo __('There is one apple|There are many apples', 3);
```

## Overriding Localization Strings

System users can override plugin localization strings without altering the plugins' files. This is done by adding localization files to the **lang** directory. For example, to override the French translations you should create the file in the following location:

::: dir
├── app
|   └── `lang`
|       └── fr.json  _← Override File_
:::

The file could contain only strings you want to override, there is no need to replace the entire file. Example:

```json
{
    "I love programming.": "Coding is the best!"
}
```

Some plugins may ship with their own PHP-based language files. You may override these in the same location. Use the complete language key in the JSON file, for example, to override the `rainlab.blog::lang.post_label` value.

```json
{
    "rainlab.blog::lang.post_label": "Article"
}
```

You may also use a nested folder structure to override a file using the PHP format. For example, a plugin name **Acme.Blog** places the file at `lang/acme/blog/en/lang.php`.

::: dir
├── app
|   └── lang
|       └── `acme`  _← Plugin Author_
|           └── `todo`  _← Plugin Name_
|               └── en
|                   └── lang.php  _← Override File_
:::

### Programatically Overriding Strings

You can override language strings in PHP by using the `Lang::set` method. This takes the language key and new translated value as the arguments.

```php
Lang::set('I love programming.', 'Coding is the best!');
```

By default this will override the active locale, the third argument can specify an explicit locale. The following example replaces the value for French.

```php
Lang::set('I love programming.', 'Le codage est le meilleur!', 'fr');
```

## Contributing Language Strings

October CMS uses a service called Crowdin to better manage translations for popular languages. It also performs automated machine translations using Google's translation API for all other languages. If you discover missing or incorrect translations in October CMS, please follow the instructions below.

### Using Crowdin

You may check to see if your language is supported by the Crowdin project using the link below. This service allows you to contribute translations using a streamlined interface.

- [October CMS Crowdin Project Page](https://crowdin.com/project/octobercms)

If your language does not appear on this page, please follow the GitHub instructions below. Languages are added to Crowdin when we notice a language is becoming more active on GitHub.

### Using GitHub

You may visit the [repository on GitHub](https://github.com/octobercms/october/tree/develop/modules) to suggest updates for your language using a pull request. The language files are found in the various modules, so you may need to check multiple files to find the correct language string. In this example, we will modify the Dutch language using the `nl` language code and we know the string is located in the Tailor module.

1. Open the [GitHub repository](https://github.com/octobercms/october/tree/develop/modules).
2. Click on **tailor**, then **lang** to open the language directory for Tailor
3. Click on the **nl.json** file to open the language file for Dutch
4. At the top right, click the pencil icon to **Edit this file**

In the file you will see the English version on the left side and the Dutch version on the right side, for example:

```json
{
  "Manage Entries": "Invoer beheren",
  "Create :name Entry": "Maak :name invoer"
}
```

When making the update, only modify the right side which contains the translated value. Some values may contain variables such as `:name` and these should be left intact. Once completed, click the **Commit changes** button to submit a new Pull Request. It will be reviewed by the team and included in subsequent releases.

::: tip
If the language key does not exist or you cannot find it, you may [contact us for assistance](https://octobercms.com/contact).
:::

#### See Also

::: also
* [Theme Localization](../../cms/themes/localization.md)
* [Laravel Localization](https://laravel.com/docs/10.x/localization)
:::
