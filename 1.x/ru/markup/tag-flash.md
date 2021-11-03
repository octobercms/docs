# {% flash %}

Теги `{% flash %}` и `{% endflash %}` отображают любые сообщения, которые храняться в сессии пользователя и добавляются при помощи PHP класса `Flash`. Переменная `message` содержит текст сообщения.

```twig
<ul>
    {% flash %}
        <li>{{ message }}</li>
    {% endflash %}
</ul>
```

Вы можете использовать переменную `type`, чтобы изменить тип сообщения. Доступны следующие значения: **success**, **error**, **info**, **warning**.

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

Вы также можете отфильтровать сообщения по типу. Пример:

```twig
{% flash success %}
    <div class="alert alert-success">{{ message }}</div>
{% endflash %}
```

## Настройка

Сообщения могут быть указаны в [Компонентах](./cms/components) или внутри страницы/шаблона в [PHP секции](./cms/themes#php-section). Пример:

```php
<?php

function onSave()
{
    // Sets a successful message
    Flash::success('Settings successfully saved!');

    // Sets an error message
    Flash::error('Error saving settings');

    // Sets a warning message
    Flash::warning('There was a problem but no worries');

    // Sets an informative message
    Flash::info('Just a heads up about the settings');
}
```
