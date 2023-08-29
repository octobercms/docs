---
subtitle: List Column
---
# Image

The `image` column displays an image column with the option to resize the output.

```yaml
avatar:
    label: Avatar
    type: image
```

The following properties are supported.

Property | Description
------------- | -------------
**sortable** | disables sorting of the column. Default: `false`
**width** | image thumbnail width to use, optional.
**height** | image thumbnail height to use, optional.
**options** | [image resizer](../../extend/services/resizer.md) options.

Use the `sortable` property to disable sorting.

```yaml
avatar:
    label: Avatar
    type: image
    sortable: false
```

Use the `width` and `height` properties to specify a custom image size.

```yaml
avatar:
    label: Avatar
    type: image
    width: 150
    height: 150
```

Use the `options` property to specify the resizer options.

```yaml
avatar:
    label: Avatar
    type: image
    options:
        quality: 80
```

See the [image resizing article](../../extend/services/resizer.md) for more information on what options are supported.

#### See Also

::: also
* [Image Resizer](../../extend/services/resizer.md)
:::
