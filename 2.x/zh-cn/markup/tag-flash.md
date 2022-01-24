# {% flash %}

`{% flash %}` 和 `{% endflash %}` 标签将呈现存储在用户会话中的任何闪现消息，由 `Flash` PHP 类设置。里面的 `message` 变量将包含闪现消息文本，并且里面的标记将针对多个闪现消息重复。

```twig
<ul>
    {% flash %}
        <li>{{ message }}</li>
    {% endflash %}
</ul>
```

您可以使用表示闪现消息类型的 `type` 变量— **success**, **error**, **info** 或者 **warning**.

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

您还可以指定 `type` 来过滤给定类型的闪现消息。 下一个示例将仅显示 **success** 消息，如果有 **error** 消息将不会显示。

```twig
{% flash success %}
    <div class="alert alert-success">{{ message }}</div>
{% endflash %}
```

## 设置闪现消息

闪现消息可以通过 [组件](../cms/components.md) 或在页面以及布局 [PHP部分](../cms/themes.md#php-section) 中使用 `Flash` 类设置。

```php
function onSave()
{
    // 设置成功消息
    Flash::success('设置成功保存！');

    // 设置错误消息
    Flash::error('保存设置时出错');

    // 设置警告信息
    Flash::warning('有问题但不用担心');

    // 设置信息性消息
    Flash::info('只是对设置的提醒');
}
```
