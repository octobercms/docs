---
subtitle: Узнайте, как перенаправить на другую страницу или URL.
---
# Перенаправления

В некоторых случаях вам может потребоваться перенаправить пользователя на новую страницу после отправки формы или любого AJAX-запроса.

```html
<form data-request="onSignup">
    <div>
        <label>Email</label>
        <input name="email" />
    </div>

    <button data-attach-loading>
        Sign Up
    </button>
</form>
```

Внутри вашего [AJAX-обработчика](../ajax/handlers.md) вы можете вернуть [тип ответа](../../extend/services/response-view.md) `Redirect`, где метод `to` принимает относительный или абсолютный URL (первый аргумент).

```php
function onSignup()
{
    return Redirect::to('/signup-complete');
}
```

Вы можете использовать метод `refresh` для обновления текущей страницы. Также поддерживается использование [flash-сообщений](./flash-messages.md).

```php
function onSignup()
{
    Flash::success('Signup complete!');

    return Redirect::refresh();
}
```

## Перенаправление на CMS-страницу

Фасад `Cms` и метод `redirect` могут использоваться для перенаправления на конкретную CMS-страницу (первый аргумент) с необязательными параметрами маршрута (второй аргумент).

```php
function onRedirect()
{
    return Cms::redirect('blog/post', ['slug' => 'foobar']);
}
```

Вы можете использовать метод `pageUrl` для получения URL в виде строки.

```php
$postPage = Cms::pageUrl('blog/post', ['slug' => 'foobar']);
```

## Перенаправления в Twig

[Twig-функция `redirect()`](../../markup/function/redirect.md) может использоваться для перенаправления пользователя из разметки страницы.

```php
function onSignup()
{
    $this['success'] = true;
}
```

Эта функция принимает URL или имя CMS-страницы.

```twig
{% if success %}
    {% do redirect('/signup-complete') %}
{% endif %}
```

## Перенаправления в AJAX

[AJAX-фреймворк](../ajax/introduction.md) поддерживает перенаправления с помощью атрибута `data-request-redirect`. Значение атрибута должно указывать URL для перенаправления после успешного завершения AJAX-запроса.

```html
<button
    data-request="onAjax"
    data-request-redirect="/signup-complete">
    Save and Redirect
</button>
```

[Turbo-маршрутизатор](../ajax/turbo-router.md) поддерживает исторические перенаправления с помощью атрибута `data-browser-redirect-back`. Атрибут может быть прикреплён к любой гиперссылке или элементу AJAX-запроса, переопределяя ответ перенаправления, и срабатывает только при наличии предыдущего состояния истории браузера.

```html
<button
    data-request="onRedirect"
    data-browser-redirect-back>
    Save and Back
</button>
```

Значение атрибута также может использоваться с гиперссылками.

```html
<a
    href="/home"
    data-browser-redirect-back>
    Go Back
</a>
```

::: warning
Атрибут `data-browser-redirect-back` следует использовать в сочетании с традиционным перенаправлением в качестве резервного адреса.
:::

#### См. также

::: also
* [Twig-функция redirect](../../markup/function/redirect.md)
* [Ответы и представления](../../extend/services/response-view.md)
:::
