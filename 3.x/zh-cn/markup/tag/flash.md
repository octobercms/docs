---
subtitle: Twig 标签
---
# {% flash %}

::: aside
查看[闪存消息文章](../../cms/features/flash-messages.md)了解更多关于使用闪存消息的信息。
:::

`{% flash %}` 和 `{% endflash %}` 标签将渲染存储在用户会话中的任何闪存消息，这些消息由 `Flash` PHP 类设置。内部的 `message` 变量将包含闪存消息文本，内部的标记会对多条闪存消息重复显示。

```twig
<ul>
    {% flash %}
        <li>{{ message }}</li>
    {% endflash %}
</ul>
```

你可以使用 `type` 变量来表示闪存消息类型 &mdash; **success**、**error**、**info** 或 **warning**。

```twig
{% flash %}
    <div class="alert alert-{{ type }}">
        {{ message }}
    </div>
{% endflash %}
```

你也可以指定 `type` 来过滤给定类型的闪存消息。以下示例将只显示 **success** 消息，如果有 **error** 消息，它不会被显示。

```twig
{% flash success %}
    <div class="alert alert-success">{{ message }}</div>
{% endflash %}
```

## 将闪存消息设置为 Twig 变量

在任何模板中，你可以使用 `flash()` 函数将闪存消息设置为变量。这允许你在显示之前操作输出。该函数返回一个数组，每种类型包含一条闪存消息。

```twig
{% set messages = flash() %}
```

第一个参数可以指定消息类型，此时返回的消息为字符串。

```twig
{% set successMessage = flash('success') %}
```

如果第一个参数设置为 **all**，则会返回一个类型数组，每个类型是所有闪存消息的数组。

```twig
{% set allMessages = flash('all') %}
```

#### 参见

::: also
* [闪存消息](../../cms/features/flash-messages.md)
:::
