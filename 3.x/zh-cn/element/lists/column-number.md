---
subtitle: 列表列
shortname: Number
---
# Number 列

`number` - 显示数字列，右对齐。

```yaml
age:
    label: Age
    type: number
```

您也可以指定自定义数字格式，例如货币 **$99.00**。

```yaml
price:
    label: Price
    type: number
    format: "$%.2f"
```

::: tip
`format` 属性遵循 [PHP sprintf() 函数](https://secure.php.net/manual/en/function.sprintf.php)的格式化规则
:::

## 计算关联数量

`number` 列类型通常与 `relationCount` 属性一起使用，以计算关联记录的数量。以下定义将计算与模型的 **users** 关系关联的记录数。

```yaml
users_count:
    label: Users
    type: number
    relation: users
    relationCount: true
```
