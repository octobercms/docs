---
subtitle: Расширение Twig пользовательскими фильтрами и функциями.
---
# Создание Twig-тегов

Пользовательские фильтры и функции Twig могут быть зарегистрированы в CMS с помощью метода `registerMarkupTags` [класса регистрации плагина](../extend/extending.md). В этой статье описывается, как регистрировать собственные фильтры и функции Twig, которые можно использовать в CMS и почтовых шаблонах.

```php
public function registerMarkupTags()
{
    return [
        'filters' => [
            // ...Filters defined here
        ],
        'functions' => [
            // ...Functions defined here
        ]
    ];
}
```

## Регистрация фильтра

Ключ `filters` в массиве регистрации может использоваться для Twig-фильтров. Например, фильтр `|plural` может быть сопоставлен с глобальной PHP-функцией `str_plural()` следующим значением.

```php
'filters' => [
    'plural' => 'str_plural'
]
```

Вы также можете передать локальный метод. Например, `|uppercase` может быть сопоставлен с методом `$this->makeAllCaps()`.

```php
'filters' => [
    'uppercase' => [$this, 'makeTextAllCaps']
]
```

Это становится доступным в Twig следующим образом.

```twig
{{ 'my text'|uppercase }}
```

## Регистрация функции

Как и фильтры, ключ `functions` может использоваться для создания Twig-функции. Например, функция может быть сопоставлена с вызовом статического метода `Form::open()`.

```php
'functions' => [
    'form_open' => [Form::class, 'open']
]
```

Статические вызовы также поддерживают определения с подстановочными знаками. В этом примере вызов функции `url_foobar()` будет преобразован в вызов метода `Url::foobar` и так далее.

```php
'functions' => [
    'url_*' => [Url::class, '*'],
]
```

Также допускается передача замыкания для любого определения.

```php
'functions' => [
    'hello_world' => function() { return 'Hello World!'; }
]
```

Это теперь доступно в Twig следующим образом.

```twig
{{ hello_world() }}
```

## Экранирование вывода

Важно отметить, что пользовательские фильтры и функции Twig по умолчанию не экранируются. Для включения экранирования по умолчанию передайте последнее значение массива как `true` в определении.

```php
public function registerMarkupTags()
{
    return [
        'functions' => [
            // Escaped Functions
            'input' => ['input', true],

            // Raw Functions
            'link_to' => 'link_to',

            // Escaped Classes
            'str_*' => [\Str::class, '*', true],

            // Raw Classes
            'url_*' => [\Url::class, '*'],
        ],
        'filters' => [
            // Escaped Filters
            'display_name' => [fn ($user) => $user->getDisplayName(), true],

            // Raw Filters
            'avatar_url' => [fn ($user) => $user->getAvatarUrl()],

            // Escaped Classes
            'str_*' => [\Str::class, '*', true],

            // Raw Classes
            'url_*' => [\Url::class, '*'],
        ]
    ];
}
```

#### См. также

::: also
* [Расширение Twig](https://twig.symfony.com/doc/3.x/advanced.html)
:::
