---
subtitle: 内容字段
shortname: Mixin
---
# Mixin 字段

`mixin` - 包含另一组字段。

```yaml
_include1:
    type: mixin
    source: <uuid|handle>
```

::: tip
使用 mixin 时，考虑在字段名称前加下划线 (\_) 以便于识别。
:::

要包含一个 mixin，您可以将 `source` 引用为蓝图 handle。

```yaml
_location_fields:
    type: mixin
    source: Fields\Location
```

要获得更可靠的引用，您也可以指定 UUID。

```yaml
_blog_fields:
    type: mixin
    source: 6d6a5efa-3ce7-4b9d-bddc-ac48867552cb
```

有关定义 mixin 的更多信息，请参阅[蓝图文章](../../cms/tailor/blueprints.md)。


#### 另请参阅

::: also
* [Tailor 蓝图](../../cms/tailor/blueprints.md)
:::
