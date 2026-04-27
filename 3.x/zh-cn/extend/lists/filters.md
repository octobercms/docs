---
subtitle: 了解如何过滤列表中的记录。
---
# 过滤记录

October CMS 提供了过滤数据库记录的功能。对于支持过滤器的行为，您可以定义 **filter** 选项来启用该功能。作用域通常存储在模型配置目录中，命名为 **scopes.yaml**。

## 配置行为

[列表控制器](./list-controller.md)和[关联控制器](../forms/relation-controller.md)后台行为可以通过在配置中添加 **filter** 属性来进行过滤。定义后，可用的过滤器将显示在列表上方。

```yaml
# config_list.yaml

# ...

# Displays the list filter
filter: $/october/test/models/user/scopes.yaml
```

## 定义过滤器作用域

::: aside
可用的过滤器作用域属性可在[过滤器作用域定义](../../element/filter-scopes.md)页面找到。
:::

同样，过滤器由其自己的配置文件驱动，该文件包含过滤器**作用域**。每个作用域是列表可以被过滤的一个方面。以下示例展示了过滤器定义文件的典型内容。

```yaml
# scopes.yaml
scopes:

    category:
        label: Category
        modelClass: Acme\Blog\Models\Category
        conditions: category_id in (:value)
        nameFrom: name

    status:
        label: Status
        type: group
        conditions: status in (:value)
        options:
            pending: Pending
            active: Active
            closed: Closed

    published:
        label: Hide published
        type: checkbox
        default: 1
        conditions: is_published <> true

    approved:
        label: Approved
        type: switch
        default: 2
        conditions:
            - is_approved <> true
            - is_approved = true

    created_at:
        label: Date
        type: date
        conditions:
            after: created_at >= ':value'
            between: created_at >= ':after' AND created_at <= ':before'
```

### 过滤器依赖

过滤器作用域可以通过定义 `dependsOn` 属性来声明对其他作用域的依赖关系，这提供了一种服务端解决方案，当依赖项被修改时更新作用域。当声明为依赖项的作用域发生更改时，定义的作用域将动态重置和更新。这提供了更改提供给作用域的可用选项的机会。

```yaml
country:
    label: Country
    type: group
    conditions: country_id in (:value)
    modelClass: October\Test\Models\Location
    options: getCountryOptions

city:
    label: City
    type: group
    conditions: city_id in (:value)
    modelClass: October\Test\Models\Location
    options: getCityOptions
    dependsOn: country
```

在上面的示例中，当 `country` 作用域发生更改时，`city` 作用域将刷新。任何定义了 `dependsOn` 属性的作用域都将接收过滤器小部件的所有当前作用域对象（包括其当前值），作为按作用域名称为键的数组传递。

```php
public function getCountryOptions()
{
    return Country::lists('name', 'id');
}

public function getCityOptions($scopes = null)
{
    if (!empty($scopes['country']->value)) {
        return City::whereIn('country_id', $scopes['country']->value)->lists('name', 'id');
    }
    else {
        return City::lists('name', 'id');
    }
}
```

您可以通过在所使用的模型中覆盖 `filterScopes` 方法来过滤过滤器作用域定义。这允许您根据其他作用域值操纵可见性和其他作用域属性。该方法接受两个参数：**$scopes** 代表已由作用域配置定义的作用域对象，**$context** 代表当前活动的过滤器上下文。

```php
public function filterScopes($scopes, $context = null)
{
    if ($scopes->disable_roles->value) {
        $scopes->roles->hidden = true;
    }
}
```

上述逻辑将在 `disable_roles` 值被选中时隐藏 `roles` 作用域。此逻辑将在过滤器首次加载时以及由作用域依赖更新时应用。例如，以下是关联的过滤器作用域定义。

```yaml
disable_roles:
    type: checkbox
    label: Disable Roles

roles:
    type: text
    label: Role
    dependsOn: disable_roles
```
