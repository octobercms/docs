# Filters

October CMS provides features for filtering database records. For behaviors that support filters, you can define a **filter** option to enable the feature. Scopes are often stored in the model configuration directory as **scopes.yaml**.

## Configuring a Behavior

可以通过 [添加过滤器定义](../backend/lists.md#oc-filtering-the-list) 到列表配置来过滤列表。

```yaml
# ===================================
#  List Behavior Config
# ===================================

# ...

# Displays the list filter
filter: $/october/test/models/user/scopes.yaml
```

<a id="oc-defining-filter-scopes"></a>
## Defining Filter Scopes

类似地，过滤器由它们自己的包含过滤器范围的配置文件驱动，每个范围都是可以过滤列表的一个方面。下一个示例显示了过滤器定义文件的典型内容。

```yaml
# ===================================
# Filter Scope Definitions [过滤范围定义]
# ===================================

scopes:

    category:
        label: 类别
        modelClass: Acme\Blog\Models\Category
        conditions: category_id in (:value)
        nameFrom: name

    status:
        label: 状态
        type: group
        conditions: status in (:value)
        options:
            pending: Pending
            active: Active
            closed: Closed

    published:
        label: 隐藏已发布
        type: checkbox
        default: 1
        conditions: is_published <> true

    approved:
        label: 批准
        type: switch
        default: 2
        conditions:
            - is_approved <> true
            - is_approved = true

    created_at:
        label: 日期
        type: date
        conditions:
            after: created_at >= ':value'
            between: created_at >= ':after' AND created_at <= ':before'
```

<a id="oc-scope-options"></a>
### 范围选项

对于每个范围，您可以指定这些选项(如果适用)：

选项 | 描述
------------- | -------------
**label** | 向用户显示过滤器范围时的名称。
**type** | 定义应如何呈现此范围(请参阅下面的 [范围类型](#oc-available-scope-types))。默认值：group。
**conditions** | 指定要应用于列表模型查询的原始 where 查询语句，`:filtered` 参数表示过滤后的值。
**scope** | 指定**列表模型**中定义的[查询范围方法](../database/model.md#oc-query-scopes)以应用于列表查询。第一个参数将包含查询对象(根据常规范围方法)，第二个参数将包含过滤后的值
**options** | 如果按多个项目过滤时使用的选项，此选项可以在 `modelClass` 模型中指定数组或方法名称。
**emptyOption** | 故意为空的选择的可选标签。
**nameFrom** | 如果按多个项目过滤，则为名称显示的属性，取自`modelClass`模型的所有记录。
**default** | 可以是整数(开关、复选框、数字)或数组(组、日期范围、数字范围)或字符串(日期)。
**permissions** | 当前后端用户必须拥有的 [权限](users.md#oc-users-and-permissions) 才能使用过滤器范围。支持单个权限的字符串或仅需要一个权限即可授予访问的权限数组。
**dependsOn** | 此范围[依赖](#oc-filter-scope-dependencies)的字符串或其他范围名称的数组。当修改其他范围时，此范围将更新。
**nameFrom** | a model attribute name used for displaying the filter label. Default: name.
**valueFrom** | defines a model attribute to use for the source value. Default comes from the scope name.

<a id="oc-filter-scope-dependencies"></a>
### 过滤依赖项

过滤器作用域可以通过定义`dependsOn` [作用域选项](#oc-scope-options)来声明对其他作用域的依赖关系，它提供了一个服务器端解决方案，用于在修改它们的依赖关系时更新作用域。当声明为依赖项的范围发生变化时，定义范围将动态更新。这提供了更改要提供给范围的可用选项的机会。

```yaml
country:
    label: 国家
    type: group
    conditions: country_id in (:filtered)
    modelClass: October\Test\Models\Location
    options: getCountryOptions

city:
    label: 城市
    type: group
    conditions: city_id in (:filtered)
    modelClass: October\Test\Models\Location
    options: getCityOptions
    dependsOn: country
```

在上面的示例中，当 `country` 范围发生变化时，`city` 范围将刷新。任何定义了 `dependsOn` 属性的作用域都将作为由作用域名称作为键的数组传递给过滤器小部件的所有当前作用域对象，包括它们的当前值。

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

You can filter the filter scope definitions by overriding the `filterScopes` method inside the Model used. This allows you to manipulate visibility and other scope properties based on other scope values. The method takes two arguments **$scopes** will represent an object of the fields already defined by the [scope configuration](#oc-defining-filter-scopes) and **$context** represents the active filter context.

```php
public function filterScopes($scopes, $context = null)
{
    if ($scopes->disable_roles->value) {
        $scopes->roles->hidden = true;
    }
}
```

The above logic will hide the `roles` scope if the `disable_roles` value is checked. The logic will be applied when the filter first loads and also when updated by a scope dependency. For example, here is the associated filter scope definitions.

```yaml
disable_roles:
    type: checkbox
    label: Disable Roles

roles:
    type: text
    label: Role
    dependsOn: disable_roles
```

> **注意**：仅在此阶段支持具有 `type: group` 的范围依赖项。

<a id="oc-available-scope-types"></a>
## 可用范围类型

这些类型可用于确定应如何显示过滤器范围。

<div class="content-list" markdown="1">

- [复选框](#filter-checkbox)
- [开关](#filter-switch)
- [文本](#filter-text)
- [数字](#filter-number)
- [Dropdown](#filter-dropdown)
- [分组](#filter-group)
- [日期](#filter-date)

</div>

<a name="filter-checkbox"></a>
### 复选框

`checkbox` - 用作二进制复选框以将预定义的条件或查询应用于列表，打开或关闭。使用 0 表示关闭，使用 1 表示默认值

```yaml
published:
    label: 隐藏已发布
    type: checkbox
    default: 1
    conditions: is_published <> true
```

<a name="filter-switch"></a>
### 开关

`switch` - 用作在两个预定义条件或对列表的查询之间切换的开关，可以是不确定的，也可以是打开的或关闭的。使用 0 表示关闭，1 表示不确定，2 表示默认值

```yaml
approved:
    label: 批准
    type: switch
    default: 1
    conditions:
        - is_approved <> true
        - is_approved = true
```

<a name="filter-text"></a>
### 文本

`text` - 显示要输入的字符串。 您可以指定将在输入大小属性中注入`size`属性(默认值：10)。

```yaml
username:
    label: 用户名
    type: text
    conditions: username = :value
    size: 2
```

<a name="filter-number"></a>
### 数字

`number` - 显示单个数字的输入。 该值可在条件属性中用作 `:filtered`。

```yaml
age:
    label: 年龄
    type: number
    default: 14
    conditions: age >= ':filtered'
```

<a name="filter-dropdown"></a>
### Dropdown

`dropdown` - filter using a single selection of multiple items.

```yaml
status:
    label: Status
    type: dropdown
    options:
        pending: Pending
        active: Active
        closed: Closed
```

You may pass custom SQL to the conditions as a string where `:value` contains the filtered value.

```yaml
status:
    label: Status
    type: dropdown
    conditions: status = :value
    # ...
```


You may dynamically supply `options` by passing a model method.

```yaml
roles:
    label: Status
    type: dropdown
    options: getStatusOptions
```

<a name="filter-group"></a>
### 分组

`group` - 按一组项目过滤列表，通常按相关模型，并且需要 `nameFrom` 或 `options` 定义。例如：状态名称为打开、关闭等。

```yaml
status:
    label: 状态
    type: group
    conditions: status in (:filtered)
    default:
        pending: 待办
        active: 处理
    options:
        pending: 待办
        active: 处理
        closed: 关闭
```

<a name="filter-date"></a>
### 日期

`date` - 显示要选择的单个日期的日期选择器。可在条件属性中使用的值是：

- `:filtered`: 选择的日期格式为 `Y-m-d`
- `:before`：选择的日期格式为 `Y-m-d 00:00:00`，从后端时区转换为应用时区
- `:after`：选择的日期格式为 `Y-m-d 23:59:59`，从后端时区转换为应用时区

```yaml
created_at:
    label: 日期
    type: date
    minDate: '2001-01-23'
    maxDate: '2030-10-13'
    yearRange: 10
    conditions: created_at >= ':filtered'
```
