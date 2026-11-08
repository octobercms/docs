---
previousPath: extend/multisite/localization.md
subtitle: Translate the menus, form labels and messages of your plugin's backend pages using JSON language files.
---
# Backend Localization

Plugins translate their backend text using JSON files in the plugin's **lang** directory. The backend panel finds these files automatically, and localization strings work natively in menus, form labels and other parts of the backend interface.

::: aside
The language strings defined here are only loaded in the backend panel. To translate frontend content, see the [Theme Localization article](../../themes/sites/localization.md).
:::

For example, to add a French translation, create a **lang/fr.json** file in your plugin.

```json
{
    "I love programming.": "j'adore programmer"
}
```

Then pass the default text to the `__()` helper. It returns the French text when French is the active language.

```php
echo __('I love programming.');
```

## Creating Language Files

Each language has its own JSON file in the plugin's **lang** directory, named after the language code.

::: dir
├── plugins
|   └── acme
|       └── todo
|           └── `lang`
|               ├── en.json  _← Localization File_
|               └── fr.json  _← Localization File_
:::

JSON files are the preferred way to translate. Each key is the "default" translation of the string, and each value is the translated string.

::: tip
Laravel offers PHP-based translation files as a supported alternative to JSON. See the [Laravel Localization article](https://laravel.com/docs/12.x/localization) to learn more.
:::

## Translating Strings

Load a localization string with the `__()` helper function by passing the default translation of the string.

```php
echo __('I love programming.');
```

To replace parameters in a string, pass an array as the second argument. Each parameter in the string is prefixed with a `:` character.

```php
echo __(':name loves programming.', ['name' => 'Jeff']);
```

### Pluralizing Strings

Languages have different rules for plurals. Use the `|` character to separate the singular and plural forms of a string.

```json
{
    "There is one apple|There are many apples": "Il y a une pomme|Il y a beaucoup de pommes"
}
```

More complex rules can give a translation for each range of values.

```json
{
    "{0} There are none|[1,19] There are some|[20,*] There are many": "..."
}
```

Use the `trans_choice` function to pick the form that matches a number.

```php
echo trans_choice('There is one apple|There are many apples', 3);
```

## Setting the Active Language

The default language for your application is the `locale` option in the **config/app.php** configuration file. You can change this value to suit your application. Each administrator can also choose their preferred language under **User Menu → Backend Preferences**.

Use the `App::getLocale` method to check the active language, and the `App::setLocale` method to change it. The `setLocale` method takes the language code as its first argument.

```php
App::getLocale();

App::setLocale('fr');
```

## Overriding Plugin Strings

You can override a plugin's localization strings without changing the plugin's files. Add a localization file to the **lang** directory of the application. For example, to override French translations, create this file.

::: dir
├── app
|   └── `lang`
|       └── fr.json  _← Override File_
:::

The file only needs the strings you want to override, not the entire file.

```json
{
    "I love programming.": "Coding is the best!"
}
```

### Overriding PHP Language Files

Some plugins ship with PHP-based language files. You can override these in the same JSON file by using the complete language key. For example, this overrides the `rainlab.blog::lang.post_label` value.

```json
{
    "rainlab.blog::lang.post_label": "Article"
}
```

You can also override a PHP language file using a nested folder structure. For example, for a plugin named **Acme.Todo**, place the file at **lang/acme/todo/en/lang.php**.

::: dir
├── app
|   └── lang
|       └── `acme`  _← Plugin Author_
|           └── `todo`  _← Plugin Name_
|               └── en
|                   └── lang.php  _← Override File_
:::

### Overriding Strings in PHP

Use the `Lang::set` method to override a language string in PHP. It takes the language key and the new translated value.

```php
Lang::set('I love programming.', 'Coding is the best!');
```

The value is set for the active locale. Pass a locale as the third argument to set it for a different one. The following example replaces the value for French.

```php
Lang::set('I love programming.', 'Le codage est le meilleur!', 'fr');
```

## Contributing Translations to October CMS

October CMS uses a service called Crowdin to manage translations for popular languages, and accepts pull requests on GitHub for all other languages. If you find a missing or incorrect translation in October CMS, the [Contributing Translations to October CMS](https://octobercms.com/support/article/contributing-translations-to-october-cms) article explains how to submit a fix.

#### See Also

::: also
* [Localization & Multisite](./introduction.md)
* [Theme Localization](../../themes/sites/localization.md)
* [Laravel Localization](https://laravel.com/docs/12.x/localization)
:::
