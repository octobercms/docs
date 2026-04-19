---
subtitle: Столбец списка
shortname: Number
---
# Столбец Number

`number` — отображает числовой столбец, выровненный по правому краю.

```yaml
age:
    label: Age
    type: number
```

Вы также можете указать пользовательский числовой формат, например, валюту **$99.00**.

```yaml
price:
    label: Price
    type: number
    format: "$%.2f"
```

::: tip
Свойство `format` следует правилам форматирования [PHP-функции sprintf()](https://secure.php.net/manual/en/function.sprintf.php).
:::

## Подсчёт отношений

Тип столбца `number` часто используется совместно со свойством `relationCount` для подсчёта количества связанных записей. Следующее определение подсчитает количество записей, связанных с отношением **users** модели.

```yaml
users_count:
    label: Users
    type: number
    relation: users
    relationCount: true
```
