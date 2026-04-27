---
subtitle: 用于延迟加载和重复更新。
---
# 轮询

轮询是一种通过在请求元素上包含 `data-auto-submit` 属性来延迟或重复 AJAX 更新的技术。此功能应谨慎使用，因为在大规模使用时可能会增加服务器负载。为了缓解这一问题，该属性仅在用户的浏览器窗口处于活动状态时才会触发。

## 延迟加载请求

轮询请求通常与 [AJAX 部件 Twig 标签](../../markup/tag/ajax-partial.md)结合使用，因为它允许你自更新部件内容。以下是在页面上定义的 AJAX 处理程序，用于加载一些结果。假设这是一个开销较大的查询，我们可能希望在页面加载完成后再请求它。

```php
public function onFetchResults()
{
    $this['results'] = [1, 2, 3];
}
```

下一步是在页面的某个位置包含一个名为 **posts.htm** 的 AJAX 启用部件。

```twig
{% ajaxPartial 'posts' %}
```

在部件内部，如果 `results` 变量存在，内容将输出结果。否则，它会显示一条加载消息，并使用 `data-auto-submit` 请求作为二次请求来加载结果。

```twig
{% if results %}
    <h3>Found results</h3>
    {{ d(results) }}
{% else %}
    <h3>Loading the results...</h3>
    <div
        data-request="onFetchResults"
        data-request-update="{ _self: true }"
        data-auto-submit>
    </div>
{% endif %}
```

## 轮询请求

对于需要重复请求以更新内容的场景，你可以将 `data-auto-submit` 设置为一个值（以毫秒为单位），以在延迟后执行自动请求。例如，一个使用 `{% ajaxPartial %}` 渲染的部件包含以下标记。

```twig
<div>
    {% set launchDate = carbon('2025-01-01') %}
    {% set days = launchDate.diffInDays %}
    {% set hours = launchDate.subDays(days).diffInHours %}
    {% set minutes = launchDate.subHours(hours).diffInMinutes %}
    {% set seconds = launchDate.subMinutes(minutes).diffInSeconds %}

    <h2>
        Launch in...
        {{ days }} days,
        {{ hours }} hours,
        {{ minutes }} minutes,
        {{ seconds }} seconds
    </h2>
</div>

<div
    data-request="onAjax"
    data-request-update="{ _self: true }"
    data-auto-submit="2000"></div>
```

此部件显示倒计时器，并包含一个 "div" 元素以自动更新自身。生成的更新也包含该元素，因此请求每 2 秒持续重复。

可以通过在后续请求中不包含该元素来停止轮询，例如，如果 `launchDone` 变量设置为 true，以下代码将停止轮询。

```twig
{% if not launchDone %}
    <div
        data-request="onAjax"
        data-request-update="{ _self: true }"
        data-auto-submit="2000"></div>
{% endif %}
```

## 延迟加载部件

`data-auto-submit` 标签被 `{% ajaxPartial lazy %}` Twig 标签用于延迟加载部件。当页面首次渲染时，标记会自动包含以动态加载部件内容。

```twig
{% ajaxPartial 'posts' lazy %}
```

查看 [AJAX 部件 Twig 标签](../../markup/tag/ajax-partial.md)了解更多信息。

#### 参见

::: also
* [AJAX 部件 Twig 标签](../../markup/tag/ajax-partial.md)
:::
