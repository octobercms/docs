---
subtitle: Twig-свойство
---
# this.session

Вы можете получить доступ к текущему менеджеру сессий через `this.session`, который возвращает объект `Illuminate\Session\Store` [текущей конфигурации сессии](../../extend/services/session.md).

## this.session.get()

Вы можете извлечь данные из сессии, передав имя ключа в `this.session.get` в качестве первого аргумента.

```twig
{{ this.session.get('key') }}
```

Вы также можете передать значение по умолчанию в качестве второго аргумента.

```twig
{{ this.session.get('key', 'default') }}
```

## this.session.has()

Метод `this.session.has` позволяет определить, существует ли элемент в сессии.

```twig
{% if this.session.has('key') %}
    <h1>We found key in the session</h1>
{% endif %}
```

## this.session.put()

Метод `this.session.put` используется для сохранения данных в сессии.

```twig
{% do this.session.put('my-preference', 'value') %}
```

## this.session.forget()

Метод `this.session.forget` удалит один ключ (первый аргумент) из сессии.

```twig
{% do this.session.forget('key') %}
```

Чтобы удалить все данные сессии, используйте `this.session.flush`.

```twig
{% do this.session.flush() %}
```

#### См. также

::: also
* [Сервис сессий](../../extend/services/session.md)
:::
