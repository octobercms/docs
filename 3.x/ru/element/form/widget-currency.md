---
subtitle: Виджет формы
shortname: Currency
---
# Поле Currency

Виджет формы `currency` рендерит поле для ввода числового значения валюты. Это поле использует определение основной валюты или настройку **Base Currency**, выбранную в области [определения сайта](../../cms/resources/multisite.md).

::: tip
Это поле доступно после установки [плагина Currency](https://octobercms.com/plugin/responsiv-currency) из маркетплейса October CMS. Вы можете установить его следующей командой.

```bash
php artisan plugin:install Responsiv.Currency
```
:::

Для отображения поля ввода валюты определите поле формы следующим образом:

```yaml
total_amount:
    label: Total amount
    type: currency
```

Свойство | Описание
------------- | -------------
**format** | необязательный формат при предпросмотре поля формы: `long`, `short` или `null`. По умолчанию: `null`.

Используйте свойство `format` для изменения формата при отображении поля формы в контексте предпросмотра.

```yaml
total_amount:
    label: Total amount
    type: currency
    format: short
```

#### См. также

::: also
* [Twig-фильтр Currency](../../markup/filter/currency.md)
* [Столбец списка Currency](../../element/lists/column-currency.md)
* [Страница плагина Currency](https://octobercms.com/plugin/responsiv-currency)
:::
