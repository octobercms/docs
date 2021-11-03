# |media

Фильтр `|media` возвращает адрес относительно общедоступного пути [медиа-менеджера](../cms/mediamanager.md). Результатом является URL до медиа-файла, указанного в параметре фильтра.

```twig
<img src="{{ 'banner.jpg'|media }}" />
```

Если __https://cdn.octobercms.info__ - адрес медиа-менеджера, то результат будет следующим:

```html
<img src="https://cdn.octobercms.info/banner.jpg" />
```
