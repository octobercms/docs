---
subtitle: Twig-свойство
---
# this.site

Вы можете получить доступ к активному сайту через `this.site`, который возвращает объект `System\Models\SiteDefinition` [текущего определения сайта](../../cms/resources/multisite.md).

## Получение данных сайта

```twig
{{ this.site.id }}
{{ this.site.name }}
{{ this.site.code }}
{{ this.site.locale }}
{{ this.site.timezone }}
{{ this.site.theme }}
```

## Проверка активного сайта

```twig
{% if this.site.code === 'english' %}
    <h1>Only display for English</h1>
{% endif %}
```

## Получение текущей выбранной локали

Атрибут `locale` возвращает текущую локаль, если она указана, или пустое значение, если не указана.

```twig
<html lang="{{ this.site.locale }}">
```

Используйте атрибут `hard_locale`, чтобы всегда получать значение локали — он использует локаль по умолчанию, если ни одна не указана.

```twig
<html lang="{{ this.site.hard_locale }}">
```
