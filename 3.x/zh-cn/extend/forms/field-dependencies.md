---
subtitle: 了解字段如何依赖于其他字段。
---
# 字段依赖

类似于[表单字段条件](../../element/form-fields.md)，表单字段可以通过定义 `dependsOn` 表单字段属性来声明对其他字段的依赖关系。这提供了一种更强大的服务端解决方案，当依赖项被修改时更新字段。

当声明为依赖项的字段发生更改时，定义字段将使用 AJAX 框架进行更新。这提供了使用 `filterFields` 方法与字段属性交互或更改提供给字段的可用选项的机会。

```yaml
country:
    label: Country
    type: dropdown

state:
    label: State
    type: dropdown
    dependsOn: country
```

在上面的示例中，当 `country` 字段的值发生更改时，`state` 表单字段将刷新。此时，当前表单数据将填充到模型中，以便下拉选项可以使用它。

```php
public function getCountryOptions()
{
    return ['au' => 'Australia', 'ca' => 'Canada'];
}

public function getStateOptions()
{
    if ($this->country == 'au') {
        return ['act' => 'Capital Territory', 'qld' => 'Queensland', ...];
    }
    elseif ($this->country == 'ca') {
        return ['bc' => 'British Columbia', 'on' => 'Ontario', ...];
    }
}
```

## 过滤字段

您可以通过在所使用的模型中覆盖 `filterFields` 方法来过滤表单字段定义。这允许您根据模型数据操纵字段的可见性和其他属性。该方法接受两个参数：**$fields** 代表已由[字段配置](../../element/form-fields.md)定义的字段对象，**$context** 代表当前活动的表单上下文。

```php
public function filterFields($fields, $context = null)
{
    if ($this->source_type === 'http') {
        $fields->source_url->hidden = false;
        $fields->git_branch->hidden = true;
    }
    elseif ($this->source_type === 'git') {
        $fields->source_url->hidden = false;
        $fields->git_branch->hidden = false;
    }
    else {
        $fields->source_url->hidden = true;
        $fields->git_branch->hidden = true;
    }
}
```

在显示和保存表单时，`$context` 值将包含表单上下文（create、update 等），但是当表单被刷新时，上下文将始终设置为 **refresh**。这对于用新值填充字段而不强制其成为保存值非常有用。以下示例将在刷新期间父值更改时重置父名称值，但不会影响保存值。

```php
public function filterFields($fields, $context = null)
{
    if ($context === 'refresh' && $this->parent) {
        $fields->parent_name->value = $this->parent->name;
    }
}
```

上述逻辑将通过检查模型属性 `source_type` 的值来设置某些字段的 `hidden` 标志。此逻辑将在表单首次加载时以及由已定义的字段依赖项更新时应用。例如，以下是关联的表单字段定义。

```yaml
source_type:
    label: Source Type
    type: dropdown
    options:
        git: Git
        http: Http
        upload: Upload

source_url:
    label: Source URL
    type: text
    dependsOn: source_type

git_branch:
    label: Git Branch
    type: text
    dependsOn: source_type
```

## 使用 AJAX 更新

在某些情况下，您可能希望在字段值更改时手动运行 AJAX 处理程序。您可以使用 `changeHandler` 属性指定 AJAX 处理程序。以下示例将在值更改时调用 **onChangeContent** AJAX 处理程序。

```yaml
content:
    label: Content
    type: textarea
    changeHandler: onChangeContent
```

可以按常规方式将 AJAX 处理程序添加到控制器中。以下示例在字段更新时使用 `Flash` facade 显示一条消息。

```php
public function onChangeContent()
{
    Flash::success('Great job!');
}
```

如果您希望更新其他字段，请使用表单控制器提供的 `formRefreshFields` 方法。

```php
public function onChangeContent()
{
    return $this->formRefreshFields('is_positive');
}
```

您也可以通过传递数组一次更新多个字段。

```php
public function onChangeContent()
{
    return $this->formRefreshFields(['is_positive', 'internal_comments']);
}
```

#### 另请参阅

::: also
* [表单字段条件](../../element/form-fields.md)
:::
