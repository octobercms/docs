---
subtitle: Learn how to translate individual model attributes across locales.
---
# Translatable

::: aside
For an overview of when to use this trait versus Multisite or MultisiteGroup, see the [Introduction](./introduction.md).
:::

Translatable models store translated attribute values in a separate table, with one row per model, per attribute, per locale. The active locale is resolved automatically from the `Site` facade. To make attributes translatable, apply the `October\Rain\Database\Traits\Translatable` trait and declare a `$translatable` property with an array containing the attributes to translate.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Translatable;

    public $translatable = ['name', 'description', 'slug'];
}
```

The trait automatically registers a `translations` morphMany relationship and stores translations in the `system_translate_attributes` table.

## How It Works

When the active site locale differs from the default locale, the trait intercepts `getAttribute` and `setAttribute` to read and write translated values instead of model attributes. When only one locale exists (or the default locale is active), the trait is invisible — no extra queries, no relationship loading, just a single string comparison on every attribute access.

Translated values are stored in the `system_translate_attributes` table:

```
| model_type | model_id | locale | attribute | value   |
|------------|----------|--------|-----------|---------|
| Product    | 42       | fr     | name      | Produit |
| Product    | 42       | fr     | slug      | produit |
| Product    | 42       | de     | name      | Produkt |
```

## Reading Translations

Translated values are returned automatically based on the active site locale when accessing model attributes.

```php
$product->name; // Returns translated value or falls back to default
```

Use the `getTranslation` method to read a translation for a specific locale.

```php
$product->getTranslation('name', 'fr');
```

By default, if no translation exists for the requested locale, the method falls back to the default locale value. To disable fallback and return `null` instead, pass `false` as the third argument.

```php
$product->getTranslation('name', 'fr', useFallback: false);
```

Use the `getTranslations` method to get all locale values for a single attribute.

```php
$product->getTranslations('name');
// Returns: ['en' => 'Product', 'fr' => 'Produit', 'de' => 'Produkt']
```

## Writing Translations

Translations are written automatically when the active locale is set and the model is saved.

```php
$product->setLocale('fr');
$product->name = 'Produit';
$product->save();
```

Use the `setTranslation` method to set a translation for a specific locale. The model must be saved afterward.

```php
$product->setTranslation('name', 'fr', 'Produit');
$product->save();
```

Use the `setTranslations` method to set multiple locales at once for a single attribute.

```php
$product->setTranslations('name', [
    'fr' => 'Produit',
    'de' => 'Produkt',
]);
$product->save();
```

::: tip
For non-default locales, attributes whose value matches the default locale value are not stored. They inherit from the model table via fallback, so changes to the default automatically propagate to untranslated locales.
:::

## Deleting Translations

Use the `forgetTranslation` method to remove a single translation.

```php
$product->forgetTranslation('name', 'fr');
```

Use the `forgetTranslations` method to remove all translations for an attribute across all locales.

```php
$product->forgetTranslations('name');
```

Use the `forgetAllTranslations` method to remove all translations for a locale, effectively "unpublishing" that language.

```php
$product->forgetAllTranslations('fr');
```

## Checking Translations

Use the `hasTranslation` method to check if a specific attribute has been translated.

```php
$product->hasTranslation('name', 'fr'); // true or false
```

Use the `hasTranslations` method to check if the model has any translations at all for a given locale.

```php
$product->hasTranslations('fr'); // true if ANY attribute has a translation for 'fr'
```

Use the `getTranslatedLocales` method to get a list of locales that have translations. Pass an attribute name to check locales for a specific attribute.

```php
$product->getTranslatedLocales(); // ['fr', 'de']
$product->getTranslatedLocales('name'); // ['fr', 'de']
```

## Locale Context

Use the `setLocale` method to override the locale for a model instance. This affects how `getAttribute` and `setAttribute` behave.

```php
$product->setLocale('fr');
$product->name; // Returns French translation
$product->getLocale(); // 'fr'
```

The `setLocale` method is chainable.

```php
$product->setLocale('fr')->name;
```

## Query Scopes

Use the `whereTranslation` scope to filter by translated attribute values.

```php
Product::whereTranslation('name', 'fr', 'Produit')->get();
```

The scope also supports a fourth argument for the comparison operator.

```php
Product::whereTranslation('name', 'fr', '%Prod%', 'like')->get();
```

Use the `orderByTranslation` scope to sort by translated attribute values.

```php
Product::orderByTranslation('name', 'fr', 'asc')->get();
```

## Eager Loading

Use the `withTranslation` scope to eager load translations for a single locale, avoiding N+1 queries.

```php
Product::withTranslation('fr')->get();
```

When called without arguments, it uses the current site locale.

```php
Product::withTranslation()->get();
```

Use the `withTranslations` scope to eager load all translations for all locales.

```php
Product::withTranslations()->get();
```

You can also use standard Eloquent eager loading with the `translations` relationship.

```php
Product::with('translations')->get();
```

## JSON and Array Attributes

Attributes declared as `$jsonable` on the model are handled transparently. Array values are serialized to JSON when stored in the translation table and deserialized back to arrays when read.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Translatable;

    public $translatable = ['options'];

    protected $jsonable = ['options'];
}

$product->setTranslation('options', 'fr', ['color' => 'rouge']);
$product->save();

$product->getTranslation('options', 'fr'); // ['color' => 'rouge']
```

## Method Reference

Method | Description
------------- | -------------
`getTranslation($key, $locale, $useFallback = true)` | Get translated value for attribute and locale.
`setTranslation($key, $locale, $value)` | Set translated value for attribute and locale.
`getTranslations($key)` | Get all locale values for an attribute.
`setTranslations($key, array $translations)` | Set multiple locales at once.
`hasTranslation($key, $locale = null)` | Check if a translation row exists for one attribute.
`hasTranslations($locale = null)` | Check if any translation rows exist for the locale (record-level).
`getTranslatedLocales($key = null)` | Get locales with translations.
`forgetTranslation($key, $locale)` | Delete a single translation row.
`forgetTranslations($key)` | Delete all translation rows for an attribute.
`forgetAllTranslations($locale)` | Delete all translation rows for a locale.
`setLocale($locale)` | Override the locale context for this instance.
`getLocale()` | Get the active locale.
`isTranslatableAttribute($key)` | Check if attribute should be translated right now.
`shouldTranslate()` | Check if translation is active (context !== default).
`getTranslatableAttributes()` | Get the `$translatable` attribute names.

#### See Also

::: also
* [Introduction](./introduction.md)
* [Multisite Trait](./multisite.md)
* [MultisiteGroup Trait](./multisite-group.md)
* [Tailor Localization](../../cms/multisite/tailor.md)
:::
