---
subtitle: Twig-фильтр
---
# |currency

Фильтр `|currency` используется для отображения значения валюты.

```twig
{{ 100|currency }}
```

::: tip
Этот Twig-фильтр доступен после установки [плагина Currency](https://octobercms.com/plugin/responsiv-currency), доступного на маркетплейсе October CMS. Вы можете установить его следующей командой.

```bash
php artisan plugin:install Responsiv.Currency
```
:::

Фильтр принимает аргумент опций в виде массива, поддерживающего различные значения.

Опция | Описание
------ | -----------
**to** | В указанный код валюты
**from** | Из кода валюты
**format** | Формат отображения. Варианты: long, short, null.
**site** | Установите в `true` для использования кодов валюты из определения сайта. По умолчанию: `false`.

Например, для конвертации суммы из USD в AUD.

```php
{{ 1000|currency({ from: 'USD', to: 'AUD' }) }}
```

Если вы хотите использовать базовую и отображаемую валюту из определения сайта, установите опцию **site** в `true`.

```php
{{ 1000|currency({ site: true }) }}
```

Для отображения валюты в формате `long` или `short`.

```php
// $10.00
{{ 1000|currency({ format: '' }) }}

// $10.00 USD
{{ 1000|currency({ format: 'long' }) }}

// $10
{{ 1000|currency({ format: 'short' }) }}
```

## PHP-интерфейс

Вы можете взаимодействовать с функциями валюты через глобальный фасад `Currency`.

Например, для конвертации суммы из USD в AUD:

```php
Currency::format(1000, ['from' => 'USD', 'to' => 'AUD']);
```

Для отображения валюты в формате long или short

```php
// $10.00 USD
Currency::format(1000, ['format' => 'long']);

// $10
Currency::format(1000, ['format' => 'short']);
```


#### См. также

::: also
* [Виджет формы Currency](../../element/form/widget-currency.md)
* [Столбец списка Currency](../../element/lists/column-currency.md)
* [Страница плагина Currency](https://octobercms.com/plugin/responsiv-currency)
:::
