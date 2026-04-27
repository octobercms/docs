---
subtitle: Столбец списка
shortname: Currency
---
# Столбец Currency

`currency` — отображает значение как отформатированную валюту.

```yaml
total_amount:
    label: Loan amount
    type: currency
```

::: tip
Этот столбец доступен после установки [плагина Currency](https://octobercms.com/plugin/responsiv-currency) из маркетплейса October CMS. Вы можете установить его следующей командой.

```bash
php artisan plugin:install Responsiv.Currency
```
:::

Поддерживаются следующие свойства.

Свойство | Описание
------------- | -------------
**format** | формат отображения. Поддерживаемые значения: `long`, `short`, `null`.
**fromCode** | указать код исходной валюты.
**toCode** | указать код отображаемой валюты.
**site** | отображать валюту, используя контекст определения мультисайта. По умолчанию: `false`

Используйте свойство `format` для отображения значения столбца в более длинном формате.

```yaml
total_amount:
    label: Loan amount
    type: currency
    format: long
```

Установите свойство `site` в `true`, если значение модели хранится с использованием определения мультисайта. Это автоматически установит значения `toCode` и `fromCode` для определения сайта.

```yaml
total_amount:
    label: Loan amount
    type: currency
    site: true
```

::: also
* [Twig-фильтр Currency](../../markup/filter/currency.md)
* [Виджет формы Currency](../../element/form/widget-currency.md)
* [Страница плагина Currency](https://octobercms.com/plugin/responsiv-currency)
:::
