---
subtitle: Столбец списка
shortname: Linkage
---
# Столбец Linkage

Столбец `linkage` отображает гиперссылку на указанную страницу.

```yaml
website:
    label: Website
    type: linkage
```

Поддерживаются следующие свойства.

Свойство | Описание
------------- | -------------
**linkText** | текст для отображения ссылки, необязательно.
**linkUrl** | указать URL вместо получения из значения записи.
**attributes** | массив HTML-атрибутов для передачи элементу anchor.

Используйте свойство `attributes` для добавления пользовательских HTML-атрибутов.

```yaml
website:
    label: Website
    type: linkage
    attributes:
        target: _blank
```

::: tip
Тип столбца `linkage` автоматически разрешает [значения ссылок page finder](../form/widget-pagefinder.md).
:::

Используйте `linkUrl` и `linkText` для явного указания URL, который может быть URI панели управления или полным URL. Атрибуты из записи будут разрешены автоматически.

```yaml
open_link:
    label: View
    type: linkage
    linkText: View Dashboard
    linkUrl: backend/index/:code/:id
```

## Пользовательский текст ссылки

По умолчанию значением будет URL на связанное расположение. Например, вы можете изменить текст ссылки, возвращая массив из модели.

```php
['https://octobercms.com', 'October CMS']
```

В вашей модели вы можете использовать модификатор атрибута для предоставления этих значений. Следующий пример создаёт новый атрибут `website_link` на модели.

```php
public function getWebsiteLinkAttribute()
{
    return [$this->url, $this->name];
}
```

Вы можете использовать свойство `displayFrom` для сохранения работоспособности сортировки и поиска по значению базы данных. Следующий пример будет искать и сортировать по атрибуту `website` и отображать ссылку через атрибут `website_link`.

```yaml
website:
    label: Website
    type: linkage
    displayFrom: website_link
```
