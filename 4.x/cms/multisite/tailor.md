---
subtitle: Learn how to translate Tailor content across multiple sites.
---
# Tailor Localization

<VideoBlockLink src="https://www.youtube.com/watch?v=_kX7P3SEHg8" title="Multisite Demo" description="This video demonstrates how to create multilingual sites with October CMS Multisite." prompt="Watch the demonstration" />

::: aside
View the [Multisite article](./multisite.md) to learn how to configure sites and languages.
:::

Tailor blueprints support multisite and localization, allowing content to be unique or synchronized across configured sites. This article covers enabling multisite on blueprints, controlling which fields are translatable, and synchronizing records across sites.

## Enabling Multisite

Blueprints do not use [multisite capabilities](./multisite.md) by default. You may use the `multisite` property to enable this. When enabled, records can be unique to each configured site.

```yaml
handle: Blog\Post
type: entry
# ...
multisite: true
```

When multisite is enabled, all fields in the blueprint become translatable. To keep the same value for a field, set the `translatable` property to false. In this example, when saving the record the **name** field will be copied to every site when it is saved.

```yaml
# ...
multisite: true

fields:
    name:
        label: Full Name
        type: text
        translatable: false
```

## Synchronization Modes

You may set the multisite value to **sync** to keep the records synchronized across sites, which is helpful for categories and tags. When using sync, each record will always exist on every site, although the content can be different.

```yaml
multisite: sync
```

When using [Site Groups](./multisite.md), the records will be propagated to all sites within that group. This can be changed by setting the `multisite` property to **all** to sync within all sites.

```yaml
multisite: all
```

Setting to **locale** will sync the records to all sites that share the same locale.

```yaml
multisite: locale
```

The following values are supported by the `multisite` property.

Value | Description
----- | -----------
`true` | Records are unique per site, all fields are translatable
`false` | Multisite is disabled (default)
`sync` | Records are synchronized within the site group
`all` | Records are synchronized across all sites
`locale` | Records are synchronized to sites sharing the same locale

## Propagating Content

When using the **sync** option for multisite, you may retroactively propagate records using the `tailor:propagate` command.

```bash
php artisan tailor:propagate
```

To propagate a single blueprint use the `--blueprint` option and specify its handle.

```bash
php artisan tailor:propagate --blueprint="Blog\Category"
```

#### See Also

::: also
* [Multisite](./multisite.md)
* [Theme Localization](./localization.md)
* [Tailor Blueprints](../tailor/blueprints.md)
* [Multisite Trait](../../extend/multisite/multisite.md)
* [Translatable Trait](../../extend/multisite/translatable.md)
:::
