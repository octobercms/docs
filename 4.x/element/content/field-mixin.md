---
subtitle: Content Field
---
# Mixin

`mixin` - includes another set of fields.

```yaml
_include1:
    type: mixin
    source: <uuid|handle>
```

::: tip
When using a mixin, consider prefixing the field name with an underscore (\_) to make them easy to spot.
:::

To include a mixin, you may reference the `source` as the blueprint handle.

```yaml
_location_fields:
    type: mixin
    source: Fields\Location
```

For a more robust reference, you may also specify the UUID.

```yaml
_blog_fields:
    type: mixin
    source: 6d6a5efa-3ce7-4b9d-bddc-ac48867552cb
```

See the [Blueprints article](../../cms/tailor/blueprints.md) for more information on defining mixins.


#### See Also

::: also
* [Tailor Blueprints](../../cms/tailor/blueprints.md)
:::
