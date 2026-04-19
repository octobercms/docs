---
subtitle: Контентное поле
shortname: Mixin
---
# Поле Mixin

`mixin` — включает другой набор полей.

```yaml
_include1:
    type: mixin
    source: <uuid|handle>
```

::: tip
При использовании mixin рекомендуется добавлять к имени поля префикс в виде подчёркивания (\_), чтобы их было легко отличить.
:::

Для включения mixin вы можете ссылаться на `source` как handle блюпринта.

```yaml
_location_fields:
    type: mixin
    source: Fields\Location
```

Для более надёжной ссылки вы также можете указать UUID.

```yaml
_blog_fields:
    type: mixin
    source: 6d6a5efa-3ce7-4b9d-bddc-ac48867552cb
```

Подробнее об определении mixin см. в [статье о блюпринтах](../../cms/tailor/blueprints.md).


#### См. также

::: also
* [Блюпринты Tailor](../../cms/tailor/blueprints.md)
:::
