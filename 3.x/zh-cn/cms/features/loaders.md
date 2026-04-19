---
subtitle: 指示页面当前正在加载。
---
# 加载指示器

当 AJAX 框架向服务器发出请求时，显示加载指示器是一个好做法，因为页面可能不会立即更新。有多种方法和标准加载指示器可以清楚地表明 AJAX 请求已触发并正在进行中。

## 进度条

AJAX 框架的一个显著特性是当 AJAX 请求运行时，页面顶部会显示一个进度条。进度条监听 AJAX 请求，当请求耗时超过 300 毫秒时出现，请求完成后再次隐藏。

要为某个请求禁用进度条，请将 `data-request-progress-bar` 属性设置为 `false`。

```html
<button
    data-request="onDoSomething"
    data-request-progress-bar="false">
    Do something
</button>
```

在 JavaScript 中，将 AJAX 请求的 `progressBar` 选项设置为 `false`。

```js
oc.ajax('onSilentRequest', { progressBar: false });
```

要全局禁用进度条，请使用样式表将 `visibility` 样式设置为 `hidden`。

```css
.oc-progress-bar {
    visibility: hidden;
}
```

你可以使用 JavaScript 通过 `oc.progressBar` 对象和 `show` / `hide` 函数来显示进度条。

```js
oc.progressBar.show();

oc.progressBar.hide();
```

## 加载按钮

提交表单时，用户可能会意外地双击按钮导致重复提交，加载按钮可以解决这个问题。在 AJAX 请求期间，具有 `data-attach-loading` 属性的按钮元素将被禁用，并添加 CSS 类 `oc-attach-loader`。此类将使用 `:after` CSS 选择器在按钮和锚点元素上生成一个加载旋转图标。

```html
<a href="#"
    data-request="onDoSomething"
    data-attach-loading>
    Do Something
</a>
```

当按钮位于包含 `oc-attach-loader` 属性的表单内时，将显示加载指示器。

```html
<form data-request="onSubmit">
    <button data-attach-loading>
        Submit
    </button>
</form>
```

由于输入元素不支持 `:after` CSS 选择器，因此会在它们后面插入一个新元素。该元素在 AJAX 请求完成后被移除。这在使用 `data-track-input` 属性监视输入变化并提交 AJAX 请求时非常有用。

```html
<input name="username"
    data-request="onCheckUsername"
    data-track-input
    data-attach-loading />
```

你可以使用 `oc.attachLoader` 对象和 `show` / `hide` 函数手动向按钮添加加载器，将元素选择器或对象作为第一个参数传递。

```js
oc.attachLoader.show('.my-element');

oc.attachLoader.hide('.my-element');
```

## 切换元素

你可以使用 `data-request-loading` 属性使元素在 AJAX 请求期间可见。该值是一个 CSS 选择器，使用 `block` 和 `none` 的 display 属性来管理元素的可见性。

```html
<button
    data-request="onPay"
    data-request-loading=".is-loading">
    Pay Now
</button>

<div style="display:none" class="is-loading">
    Processing Payment...
</div>
```

### 检测全局请求

你可以通过检查 HTML 元素上的 `data-ajax-progress` 属性来检测全局 AJAX 请求是否正在进行中。在样式表中表示如下。

```css
html[data-ajax-progress] {
    /* Display loading indicators */
}
```

该属性也会添加到表单元素上。

```css
form[data-ajax-progress] {
    /* The form is loading */
}
```

### 针对特定处理程序

在某些情况下，你可能希望为特定的 [AJAX 处理程序事件](../ajax/handlers.md) 显示加载指示器，`data-ajax-progress` 属性将包含最近的处理程序名称，这可以用于针对特定请求。

```html
<form>
    <button data-request="onPay">Pay Now</button>
    <button data-request="onCancel">Cancel</button>

    <div class="is-payment-loading">
        Processing Payment...
    </div>
</form>
```

这可以使用样式表属性值选择器来实现。

```css
.is-payment-loading {
    display: none;
}

form[data-ajax-progress=onPay] .is-payment-loading {
    display: block;
}
```

## 使用 JavaScript

对于更复杂的场景，你可以使用 `ajax:promise` 和 `ajax:always` 事件挂接到 [AJAX JavaScript API](../ajax/javascript-api.md)。这些事件可以附加到文档、表单或目标元素上。

```js
formElement.addEventListener('ajax:promise', function() {
    // A new request has started
});

formElement.addEventListener('ajax:always', function() {
    // A request has ended
});
```

以下示例将在请求运行期间禁用表单内的所有输入元素。

```js
addEventListener('ajax:promise', function(event) {
    event.target.closest('form').querySelectorAll('input').forEach(function(el) {
        el.disabled = true;
    });
});

addEventListener('ajax:always', function() {
    event.target.closest('form').querySelectorAll('input').forEach(function(el) {
        el.disabled = false;
    });
});
```
