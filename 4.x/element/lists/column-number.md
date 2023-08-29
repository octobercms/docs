---
subtitle: List Column
---
# Number

`number` - displays a number column, aligned right.

```yaml
age:
    label: Age
    type: number
```

You may also specify a custom number format, for example currency **$99.00**.

```yaml
price:
    label: Price
    type: number
    format: "$%.2f"
```

::: tip
The `format` property follows the formatting rules of the [PHP sprintf() function](https://secure.php.net/manual/en/function.sprintf.php)
:::

## Counting Relations

The `number` column type is commonly used alongside the `relationCount` property to count the number of related records. The following definition will count the number of records associated to **users** relation of the model.

```yaml
users_count:
    label: Users
    type: number
    relation: users
    relationCount: true
```
