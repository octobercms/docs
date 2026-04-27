---
subtitle: Twig 标签
---
# {% ajaxPartial %}

::: aside
此标签扩展了 [`{% partial %}` Twig 标签](./partial.md)。
:::

`{% ajaxPartial %}` 标签在页面上渲染部件内容，并包含对 [AJAX 处理器](../../cms/ajax/introduction.md)、自更新和简短更新语法的支持。这通常被称为自更新部件。

```twig
{% ajaxPartial "contact-form" %}
```

部件内容仅在首次加载时会被包裹在特定的 HTML 标签中。通过 AJAX 进行的后续部件更新不包含包裹标签。

```html
<div data-ajax-partial="contact-form">
    ... Contents go here ...
</div>
```

## 简短更新语法

使用 AJAX 部件时，你不再需要指定选择器来更新它。只需在使用 `data-request-update` 属性时向[数据属性 API](../../cms/ajax/attributes-api.md) 传递 `true` 即可。

```html
<button
    data-request="onRefresh"
    data-request-update="{ contact-form: true }">
    Refresh
</button>
```

你也可以使用 `_self` 作为部件名称从部件内部更新自身。

```html
<button
    data-request="onRefresh"
    data-request-update="{ _self: true }">
    Refresh
</button>
```

你还可以传递 `^` 符号来向容器前面添加内容，或传递 `@` 符号来向容器后面追加内容，而不是替换它。

```html
<button
    data-request="onRefresh"
    data-request-update="{ _self: '@' }">
    Append
</button>
```

## 延迟加载部件

`{% ajaxPartial %}` 接受一个 `lazy` 属性，该属性会将内容的渲染推迟到页面加载完成后。在以下示例中，**posts** 部件将在页面加载完成后更新。

```twig
{% ajaxPartial 'posts' lazy %}
```

`lazy body` 属性允许指定加载前的初始内容，后面跟着 `{% endpartial %}` 标签。

```twig
{% ajaxPartial 'posts' lazy body %}
    <p>Loading posts...</p>
{% endpartial %}
```

需要注意的是，`{% ajaxPartial lazy %}` 标签不会立即渲染部件。相反，它输出一些初始内容，其中包含[轮询请求](../../cms/features/polling.md)使用的 `data-auto-submit` 数据属性。该属性会在页面加载后执行 AJAX 请求来加载部件内容。该属性不会包含在后续的部件更新中，以防止无限循环。

以下是首次页面加载时在浏览器中的显示方式：

```html
<div
    data-request="onAjax"
    data-request-update="{ _self: true }"
    data-auto-submit>
    <p>Loading posts...</p>
</div>
```

::: tip
不要在你的部件中包含上述标记。`{% ajaxPartial lazy %}` 标签会自动为你包含它。
:::

## 调用 AJAX 处理器

当从 AJAX 部件内部调用 AJAX 处理器时，会触发一个捕获页面生命周期（见下文），该生命周期允许在请求的部件中使用 AJAX 处理器。

以下示例展示了如何使用自更新部件提交一个简单的联系表单。

::: cmstemplate
```ini
description = "Self Updating Partial"
```
```php
<?
function onSubmitContactForm()
{
    $this['submitted'] = true;
}
?>
```
```twig
{% if submitted %}
    <p>Thank you for contacting us!</p>
{% endif %}

<button
    data-request="onSubmitContactForm"
    data-request-update="{ _self: true }">
    Submit
</button>
```
:::

使用 [CMS 组件](../../cms/themes/components.md)的部件也可以使用其 AJAX 处理器。

::: cmstemplate
```ini
[contactForm]
```
```html
<button
    data-request="contactForm::onSubmit"
    data-request-update="{ _self: true }">
    Submit
</button>
```
:::

### 捕获生命周期

当从 AJAX 部件调用处理器时，会触发一个不同的生命周期，称为捕获生命周期。捕获生命周期渲染整个页面，但是将内容渲染到空白区域中。通过这种方式，页面被完整初始化，包括所有使用的部件和 AJAX 处理器。

由于这算作一次完整的页面渲染，这可能意味着在使用 AJAX 部件处理器时会调用 `onRun` [组件方法](../../extend/cms-components.md)。你可以使用 `Request::ajax()` [辅助方法](../../extend/services/request-input.md)来判断请求是否是 AJAX 请求的结果。
