---
previousPath: extend/multisite/introduction.md
subtitle: Choose between locale strings, multisite records, translated attributes and site groups to support more than one language or website.
---
# Localization & Multisite

October CMS has several ways to support more than one language or more than one website. Pick the approach that matches what you need to translate and how your sites are structured. Most plugins use one or two of them.

Approach | What it does | Works at
------------- | ------------- | -------------
**Locale Strings** | Translates interface text using `lang/en.json` files | Interface text
**Multisite** | Stores a separate copy of the record for each site | Record
**Translatable** | Translates individual model attributes | Attribute
**MultisiteGroup** | Scopes records to a site group, such as a tenant | Site group
**MultisiteGroup + Translatable** | Scopes records to a tenant and translates their attributes | Combined

## Translating Interface Text

Use locale strings for text that is not stored in a database record, such as button labels, flash messages, form labels, navigation items and validation messages. Translations live in `lang/en.json` files inside your plugin or theme directory, and you read them with the `__()` helper in both PHP and Twig.

```php
echo __('Save Changes');
```

```twig
{{ __('Save Changes') }}
```

Locale strings work the same way whether you have one site or many. Every plugin should use them for its interface text.

Read the [Backend Localization article](./backend.md) for plugin language files, or the [Theme Localization article](../../themes/sites/localization.md) for theme language files.

## Giving Each Site Its Own Record

Use the Multisite trait when the **entire record** should exist separately for each site, with its own content. This is the right choice when a blog post on the English site has completely different content from the French site, rather than being a translation of the same post.

```php
class Post extends Model
{
    use \October\Rain\Database\Traits\Multisite;

    protected $propagatable = ['category_id'];
}
```

The trait uses the `site_id` and `site_root_id` columns to track which record belongs to which site. It can also copy shared attributes, such as a category, across every copy of the record.

Read the [Multisite Models article](./multisite.md) to learn more.

## Translating Model Attributes

Use the Translatable trait when a record is the **same entity** in every language but some of its attributes need translating. Only one record exists in the database, and the translations are stored in a separate table. This is the right choice when a product is called "Widget" in English and "Gadget" in French, but it is the same product with the same SKU and price.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Translatable;

    public $translatable = ['name', 'description'];
}
```

The trait swaps in the values for the active site locale, so your existing code reads and writes translations without any changes.

Read the [Translatable Models article](./translatable.md) to learn more.

## Separating Data by Site Group

Use the MultisiteGroup trait for **multi-tenancy**, where each site group should only see its own records. A site group usually represents a distinct website. For example, a "Dogs" website and a "Cats" website can share one October CMS installation but keep separate product catalogs.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\MultisiteGroup;
}
```

The trait applies a global scope that filters records by the `site_group_id` column, so each tenant only sees its own data.

Read the [Site Groups article](./site-groups.md) to learn more.

## Combining Approaches

MultisiteGroup and Translatable work well together for multi-tenant sites with translations. Each record belongs to a site group, and its attributes are translated into the languages used within that group.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\MultisiteGroup;
    use \October\Rain\Database\Traits\Translatable;

    public $translatable = ['name', 'description'];
}
```

Multisite and Translatable are generally not combined. The Multisite trait already creates one record per site, so there is nothing left to translate at the attribute level.

#### See Also

::: also
* [Backend Localization](./backend.md)
* [Multisite Models](./multisite.md)
* [Translatable Models](./translatable.md)
* [Site Groups](./site-groups.md)
* [Theme Localization](../../themes/sites/localization.md)
* [Tailor Localization](../../themes/sites/tailor.md)
* [Site Manager](../services/site.md)
:::
