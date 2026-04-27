---
subtitle: Twig-фильтр
---
# |media

Фильтр `|media` возвращает адрес относительно публичного пути [библиотеки менеджера медиа](../../cms/media/introduction.md). Результатом является URL к медиа-файлу, указанному в параметре фильтра.

```twig
<img src="{{ 'banner.jpg'|media }}" />
```

Если адрес менеджера медиа — __https://cdn.octobercms.com__, приведённый выше пример выведет следующее:

```html
<img src="https://cdn.octobercms.com/banner.jpg" />
```

## PHP-интерфейс

Вы можете генерировать URL в PHP с помощью класса `Media\Classes\MediaLibrary` и метода `url`.

```php
\Media\Classes\MediaLibrary::url('relative/path/to/asset.jpg');
```
