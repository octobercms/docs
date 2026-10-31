---
previousPath: cms/multisite/tailor.md
subtitle: Translate Tailor content and keep records in sync across multiple sites.
---
# Tailor Localization

Tailor blueprints can store unique content for each site, or keep records synchronized across sites. Use this to translate Tailor content when your website has [sites in several languages](./multisite.md).

```yaml
handle: Blog\Post
type: entry
# ...
multisite: true
```

<VideoBlockLink src="https://www.youtube.com/watch?v=_kX7P3SEHg8" title="Multisite Demo" description="This video demonstrates how to create multilingual sites with October CMS Multisite." prompt="Watch the demonstration" />

## Enabling Multisite on a Blueprint

Blueprints do not use [multisite](./multisite.md) by default. Set the `multisite` property to `true`, as in the example above, so each record can be unique to each configured site.

### Keeping a Field the Same on Every Site

With multisite enabled, every field in the blueprint is translatable. To keep the same value for a field across sites, set its `translatable` property to `false`. In the following example, the **name** field is copied to every site when the record is saved.

```yaml
# ...
multisite: true

fields:
    name:
        label: Full Name
        type: text
        translatable: false
```

## Synchronizing Records Across Sites

Set the `multisite` property to `sync` to keep records synchronized across sites, which is helpful for categories and tags. With sync, each record always exists on every site, although its content can differ.

```yaml
multisite: sync
```

When you use [site groups](./multisite.md#site-groups), records propagate to all sites within the same group. Set the property to `all` to synchronize across all sites instead.

```yaml
multisite: all
```

Set it to `locale` to synchronize records to all sites that share the same locale.

```yaml
multisite: locale
```

The `multisite` property supports the following values.

Value | Description
----- | -----------
`true` | Records are unique per site, all fields are translatable
`false` | Multisite is disabled (default)
`sync` | Records are synchronized within the site group
`all` | Records are synchronized across all sites
`locale` | Records are synchronized to sites sharing the same locale

## Propagating Existing Records

When a blueprint uses a sync option, the `tailor:propagate` command copies existing records to the other sites, for example after you switch the blueprint to `sync`.

```bash
php artisan tailor:propagate
```

To propagate a single blueprint, use the `--blueprint` option with its handle.

```bash
php artisan tailor:propagate --blueprint="Blog\Category"
```

Use the `--site` option to choose the ID of the site to find the source records in.

```bash
php artisan tailor:propagate --site=1
```

#### See Also

::: also
* [Setting Up Multisite](./multisite.md)
* [Theme Localization](./localization.md)
* [Blueprints](../tailor/blueprints.md)
* [Blueprint Types](../../handbook/blueprint-types.md)
* [Multisite Models](../../backend/localization/multisite.md)
* [Translatable Models](../../backend/localization/translatable.md)
:::
