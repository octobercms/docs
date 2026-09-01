---
subtitle: Understand the different approaches to localization and multisite in October CMS.
---
# Localization & Multisite

October CMS provides several approaches for handling multiple languages and multiple websites. Choosing the right approach depends on what you need to translate and how your sites are structured.

## Choosing an Approach

The following table summarizes the five approaches available. Most projects will use one or two of these.

| Approach | What it does | Level |
|---|---|---|
| **Locale Strings** | Translates UI strings via `lang/en.json` files | UI strings |
| **Multisite** | Duplicates the whole record per site | Record-level |
| **Translatable** | Translates individual model attributes | Attribute-level |
| **MultisiteGroup** | Scopes records to a site group (tenant) | Multi-tenancy |
| **MultisiteGroup + Translatable** | Multi-tenancy with translated attributes | Combined |

## Locale Strings

Use locale strings for UI text that is not tied to a database record: button labels, flash messages, form labels, navigation items, and validation messages. Translations are stored in `lang/en.json` files inside your plugin or theme directory and accessed with the `__()` helper in both PHP and Twig.

This approach works identically whether you have one site or many. Every plugin should use it for its interface strings.

```php
echo __('Save Changes');
```

```twig
{{ __('Save Changes') }}
```

Read the [Localization article](./localization.md) for plugin lang files, or the [Theme Localization article](../../cms/multisite/localization.md) for theme lang files.

## Multisite

Use the Multisite trait when the **entire record** should exist independently per site. Each site gets its own copy of the record with its own content. This is the right choice when a blog post on the English site is completely different content from the French site, not a translation of the same post.

The trait uses `site_id` and `site_root_id` columns to track which record belongs to which site, and can propagate shared attributes (like a category code) across all copies.

```php
class Post extends Model
{
    use \October\Rain\Database\Traits\Multisite;

    protected $propagatable = ['category_id'];
}
```

Read the [Multisite article](./multisite.md) for the full trait API.

## Translatable

Use the Translatable trait when a record is the **same entity** but needs translated attributes. One record exists in the database; translations are stored in a side table. This is the right choice when a product is called "Widget" in English and "Gadget" in French, but it is the same product with the same SKU and price.

The trait intercepts `getAttribute` and `setAttribute` based on the active site locale, so existing code reads and writes translations without any changes.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Translatable;

    public $translatable = ['name', 'description'];
}
```

Read the [Translatable article](./translatable.md) for the full trait API.

## MultisiteGroup

Use the MultisiteGroup trait for **multi-tenancy** — when records should be scoped to a site group. A site group typically represents a distinct website (e.g., a "Dogs" website and a "Cats" website that share the same CMS installation but have separate product catalogs).

The trait applies a global scope that filters records by `site_group_id`, so each tenant only sees its own data.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\MultisiteGroup;
}
```

Read the [MultisiteGroup article](./multisite-group.md) for the full trait API.

## Combining Approaches

**MultisiteGroup + Translatable** is the natural combination for multi-tenant sites with translations. Each record is scoped to a site group and its attributes can be translated across the languages within that group.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\MultisiteGroup;
    use \October\Rain\Database\Traits\Translatable;

    public $translatable = ['name', 'description'];
}
```

**Multisite + Translatable** is generally not combined because the Multisite trait already creates one record per site — there is nothing left to translate at the attribute level.

#### See Also

::: also
* [Localization](./localization.md)
* [Multisite Trait](./multisite.md)
* [Translatable Trait](./translatable.md)
* [MultisiteGroup Trait](./multisite-group.md)
* [Theme Localization](../../cms/multisite/localization.md)
* [Tailor Localization](../../cms/multisite/tailor.md)
* [Site Service](../services/site.md)
:::
