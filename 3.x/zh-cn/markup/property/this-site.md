---
subtitle: Twig 属性
---
# this.site

您可以通过 `this.site` 访问当前活动站点，它返回 `System\Models\SiteDefinition` 对象，参见[当前站点定义](../../cms/resources/multisite.md)。

## 从站点检索数据

```twig
{{ this.site.id }}
{{ this.site.name }}
{{ this.site.code }}
{{ this.site.locale }}
{{ this.site.timezone }}
{{ this.site.theme }}
```

## 检查当前活动站点

```twig
{% if this.site.code === 'english' %}
    <h1>Only display for English</h1>
{% endif %}
```

## 获取当前选择的区域设置

`locale` 属性将返回当前区域设置（如果已指定），或者在未指定时返回空值。

```twig
<html lang="{{ this.site.locale }}">
```

使用 `hard_locale` 属性可以始终返回一个区域设置值，当未指定时会使用默认区域设置。

```twig
<html lang="{{ this.site.hard_locale }}">
```
