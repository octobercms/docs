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

### Base Value Fallback Scopes

The `whereTranslation` and `orderByTranslation` scopes match and sort against stored translation rows only, so records with no translation for the requested locale are excluded from a `where` and sort as `NULL` in an order. When you want untranslated records to fall back to their default-locale value instead, use the `transWhere` and `transOrderBy` scopes.

Use the `transWhere` scope to filter by either the base value or the translated value for the locale. The locale defaults to the active locale when omitted.

```php
Product::transWhere('name', 'Produit', 'fr')->get();
```

Like `whereTranslation`, it accepts a comparison operator.

```php
Product::transWhere('name', '%Prod%', 'fr', 'like')->get();
```

Use the `transOrderBy` scope to sort by the translated value, falling back to the base column value for untranslated records. The locale defaults to the active locale when omitted.

```php
Product::transOrderBy('name', 'asc', 'fr')->get();
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

## File Attachments

To give each locale its own files, apply the `October\Rain\Database\Traits\TranslatableAttachments` trait alongside the `Translatable` trait, then add the name of an `$attachOne` or `$attachMany` relation to the `$translatable` property. Attachment relations not listed in `$translatable` are shared by every locale.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Translatable;
    use \October\Rain\Database\Traits\TranslatableAttachments;

    public $translatable = ['name', 'image', 'gallery'];

    public $attachOne = [
        'image' => \System\Models\File::class,
        'manual' => \System\Models\File::class
    ];

    public $attachMany = [
        'gallery' => \System\Models\File::class
    ];
}
```

In the example above, the `image` and `gallery` relations store their files per locale, while the `manual` file is the same for every locale. Without the `TranslatableAttachments` trait, attachment relations listed in `$translatable` are shared by every locale.

### Reading Translated Files

Accessing the relation as a property returns the files for the active locale. When the locale has no files of its own, the files for the default locale are returned instead.

```php
$product->setLocale('fr');
$product->image; // French image, or the default image when there is none
```

The fallback applies to the whole relation. When a locale has its own files for an `$attachMany` relation, only those files are returned and the default files are not merged in. For example, if the default gallery has six images and the French gallery has one, the French gallery contains one image.

Eager loading and relation queries such as `has` and `withCount` use the same fallback, so each record resolves to its own locale files or the default files.

```php
Product::with('gallery')->get();
Product::has('image')->get();
Product::withCount('gallery')->get();
```

Querying the relation method directly returns only the files stored for the active locale, without the fallback. Use this when you need to know which files a locale has of its own.

```php
$product->setLocale('fr');
$product->gallery()->get(); // Only the French files
```

### Writing Translated Files

Files are added for the active locale. Set the locale on the model, then assign or add files the same way as an untranslated attachment.

```php
$product->setLocale('fr');
$product->image = $uploadedFile;
$product->save();
```

```php
$product->setLocale('fr');
$product->gallery()->add($file);
```

Adding a file for one locale never changes the files of another locale. Replacing the French image of an `$attachOne` relation removes the previous French image and keeps the default image.

### Checking and Deleting Translated Files

Use the `hasAttachmentTranslation` method to check if a locale has files of its own, and the `getTranslatedAttachmentLocales` method to list the locales that do. The locale defaults to the active locale when omitted.

```php
$product->hasAttachmentTranslation('image', 'fr'); // true if French has its own image
$product->getTranslatedAttachmentLocales('image'); // ['fr', 'de']
```

Use the `forgetAttachmentTranslation` method to remove the files for a locale. The locale then falls back to the default files again.

```php
$product->forgetAttachmentTranslation('image', 'fr');
```

Use the `forgetAttachmentTranslations` method to remove the files for every locale except the default locale.

```php
$product->forgetAttachmentTranslations('image');
```

::: tip
The record-level methods of the `Translatable` trait, such as `hasTranslations`, `getTranslatedLocales` and `forgetAllTranslations`, only consider attribute translations. Call the attachment methods for each name returned by `getTranslatableAttachments` to include files.
:::

When the record is deleted, the files for every locale are deleted with it, or detached when the relation definition sets `delete` to `false`. Soft deleted records keep their files so they can be restored.

### Translating Files in the Backend

File upload fields for translated attachments show the translate icon like other translatable fields. Click the icon and select a site to upload or remove the files for that locale in a popup, then click **Save** to keep the changes. Closing the popup without saving discards the uploads. Files can also be translated by switching the site using the site selector and uploading them in the main form.

In a non-default locale, the file upload field lists only the files of that locale, and an empty field means the default files are used.

### How Files Are Stored

Translated files are stored in the `system_files` table along with every other attachment. The locale is added to the `field` column, while files for the default locale are stored without a suffix, the same as an untranslated attachment.

```
| attachment_type | attachment_id | field    | file_name    |
|-----------------|---------------|----------|--------------|
| Product         | 42            | image    | product.jpg  |
| Product         | 42            | image:fr | produit.jpg  |
| Product         | 42            | image:de | produkt.jpg  |
```

Since the default files are stored without a suffix, adding an existing relation to `$translatable` keeps its current files as the default files, with no migration required.

::: tip
Each locale stores its own file records, so the file title and description can be different for each locale. The title and description of a file shared by every locale cannot be translated.
:::

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
`whereTranslation($key, $locale, $value, $operator = '=')` | Filter by a stored translated value only.
`orderByTranslation($key, $locale, $direction = 'asc')` | Sort by a stored translated value (untranslated rows sort as `NULL`).
`transWhere($key, $value, $locale = null, $operator = '=')` | Filter by the base or translated value, defaulting to the active locale.
`transOrderBy($key, $direction = 'asc', $locale = null)` | Sort by the translated value, falling back to the base value.

The `TranslatableAttachments` trait adds the following methods.

Method | Description
------------- | -------------
`getTranslatableAttachments()` | Get the `$translatable` names that are file attachment relations.
`hasAttachmentTranslation($key, $locale = null)` | Check if a locale has files of its own for an attachment.
`getTranslatedAttachmentLocales($key)` | Get the non-default locales with files of their own for an attachment.
`forgetAttachmentTranslation($key, $locale)` | Delete the files of a locale for an attachment.
`forgetAttachmentTranslations($key)` | Delete the files of every non-default locale for an attachment.

#### See Also

::: also
* [Introduction](./introduction.md)
* [Multisite Trait](./multisite.md)
* [MultisiteGroup Trait](./multisite-group.md)
* [Tailor Localization](../../cms/multisite/tailor.md)
:::
