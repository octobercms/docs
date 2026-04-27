---
subtitle: 了解 AJAX 框架如何路由链接。
---
# Turbo 路由器

Turbo 路由是 PJAX（push state 和 AJAX）的实现，它提供了单页应用的性能优势，而无需客户端框架的额外复杂性。当您点击链接时，页面会在客户端自动切换，而无需完整页面加载的开销。

```twig
{% framework turbo %}
```

## 路由链接

您可以使用以下方式以编程方式访问链接。

```js
oc.visit(location);
```

要在不将其添加到导航历史记录的情况下替换当前 URL（类似于 `window.history.replaceState`），请将 `action` 选项设置为 **replace**。

```js
oc.visit(location, { action: 'replace' });
```

要检查 Turbo 路由器是否已启用且应该使用。

```js
if (oc.useTurbo && oc.useTurbo()) {
    // Use PJAX
}
```

## 禁用路由

要在特定页面上禁用 PJAX 路由，您可以通过在页面的 head 部分添加值为 `reload` 的 `turbo-visit-control` meta 标签来触发完整重新加载。这仅会禁用传入请求的该功能。

```html
<head>
    <meta name="turbo-visit-control" content="reload" />
</head>
```

要在您的网站中完全禁用 PJAX，请将值设置为 `disable`。这将禁用所有传入和传出请求的该功能。

```html
<meta name="turbo-visit-control" content="disable" />
```

## 禁用特定链接

默认情况下，所有内部 HTML 链接都将使用 PJAX 路由，但您可以通过在链接或其父容器上标记 `data-turbo="false"` 来禁用此功能。被禁用的链接将由浏览器正常处理。

```html
<a href="/" data-turbo="false">Disabled</a>
```

当祖先元素已禁用时，您可以重新启用：

```html
<div data-turbo="false">
    <a href="/" data-turbo="true">Enabled</a>
</div>
```

## 禁用访问滚动

每次访问都会像浏览器中的大多数链接一样滚动到页面顶部。但是，在某些情况下保持滚动位置是有用的，例如链接充当过滤器的情况。您可以使用链接元素上的 `data-turbo-no-scroll` 属性来禁用访问滚动。

```html
<a href="/" data-turbo-no-scroll>Filter</a>
```

## 持久化页面元素

在某些情况下，您可能希望在页面上包含静态元素，这些元素在页面更新时不应被刷新。在父元素上使用 `data-turbo-permanent` 属性。该元素还必须提供 `id` 属性，以便原始页面可以与新页面匹配，包括事件监听器。

```html
<div id="main-navigation" data-turbo-permanent>...</div>
```

## 设置根路径

默认情况下，PJAX 用于同一域名内的所有链接，访问任何其他 URL 将回退到完整页面加载。在某些情况下，您的应用可能位于子目录中，链接应仅适用于根路径。

例如，如果您的网站位于 `/app`，而您不希望链接应用到 `/docs` 中的不同站点，那么您可以将链接限制在根路径中。您可以通过在页面的 head 部分添加 `turbo-root` meta 标签来设置根路径。

```html
<head>
    <meta name="turbo-root" content="/app">
</head>
```

## 原生错误页面

使用 PJAX 时，当服务器以错误代码响应（如 404 或 500 状态码）时，完整的 html 元素会被替换，包括脚本和样式表。这可以防止意外地将 body 元素替换为不是由同一应用程序代码生成的内容。

您可以通过在页面的 head 部分添加值为 `error` 的 `turbo-visit-control` meta 标签来禁用此行为。这将告诉 Turbo 路由器错误页面内容是由原生应用程序生成的。

```html
<meta name="turbo-visit-control" content="error">
```

## 页面缓存

启用缓存后，Turbo 路由器通过在不访问网络的情况下显示重新访问的页面来提升网站性能，使网站感觉更快。当点击链接时，内容从浏览器的本地存储中显示，同时页面在后台请求。当网络请求完成时显示最新页面，这意味着页面会渲染两次。

### 监听缓存事件

如果您需要在文档进入缓存之前准备文档，可以监听 `page:before-cache` 事件。您可以使用此事件来重置表单、折叠 UI 元素或销毁任何第三方控件，以便页面准备好再次显示。

```js
addEventListener('page:before-cache', function() {
    // Close any open submenus, etc.
});
```

### 检测缓存页面加载

您可以通过 HTML 元素上的 `data-turbo-preview` 属性来检测页面内容是否来自缓存。用 JavaScript 表示如下。

```js
if (document.documentElement.hasAttribute('data-turbo-preview')) {
    // Page shown is loaded from cache
}
```

或者使用样式表如下。

```css
html[data-turbo-preview] {
    /* Hide overlays from previous view */
}
```

### 禁用缓存

您可以通过在页面的 head 部分使用 `turbo-cache-control` meta 标签来禁用单个页面的页面缓存。将此值设置为 **no-cache** 将完全禁用缓存。您也可以将其设置为 **no-preview** 以在使用浏览器的前进和后退按钮导航时保留缓存版本。

```html
<head>
    <meta name="turbo-cache-control" content="no-cache">
</head>
```

## 使用 JavaScript

使用 PJAX 时，页面内容可能会动态加载，这与通常的浏览器行为不同。为了解决这个问题，可以使用 `render` 事件处理程序，它在每次页面加载时都会被调用，包括 [AJAX 更新](./update-partials.md)。

```js
addEventListener('render', function() {
    // Page has rendered something new
});
```

`oc.pageReady` 函数用于在页面和脚本准备就绪时调用代码。该函数返回一个 Promise，它在所有页面脚本加载完成后解析，或者如果它们已经加载则立即解析。

```js
oc.pageReady().then(() => {
    // Page has finished loading scripts
});
```

`oc.waitFor` 是另一个有用的函数，它会等待某个对象或变量存在。该函数返回一个 Promise，在找到变量时解析。

```js
oc.waitFor(() => window.propName).then(() => [
    // window.propName is now available
]);
```

第二个参数提供以毫秒为单位的超时间隔，以下代码将在两秒后停止等待。

```js
oc.waitFor(() => window.propName, 2000).then(() => {
    console.log('Found the variable!')
}).catch(() => {
    console.error('Gave up waiting...')
});
```

### 内联脚本元素

Turbo 路由器通过比较差异来维护页面 `<head>` 标签中的脚本。如果您在 `<body>` 标签中使用脚本标签，则脚本将在每次页面渲染时执行，这可能不是您想要的。

您可以包含 `data-turbo-eval="false"` 来仅允许脚本在首次页面加载时执行。该脚本不会在任何 PJAX 请求中被调用。

```html
<body>
    <script data-turbo-eval="false" src="{{ ['@framework.bundle']|theme }}"></script>
</body>
```
::: tip
如果您是出于性能原因将脚本放在 `<body>` 标签中，请考虑将其移动到 `<head>` 标签并使用 `<script defer>` 代替。
:::

要仅执行一次内联 JavaScript 代码（无论是首次页面加载还是 PJAX 请求），请为 `data-turbo-eval-once` 属性设置一个唯一值。唯一值（例如 `myAjaxPromise`）用于确定脚本是否之前已被执行过。

```html
<script data-turbo-eval-once="myAjaxPromise">
    // This script will run once only
    addEventListener('ajax:promise', function(event) {
        //
    });
</script>
```

### 使控件幂等

::: aside
October CMS 提供了一个配套库，用于简化[幂等控件](./hot-controls.md)的构建。
:::

当页面访问发生并初始化 JavaScript 组件时，重要的是这些函数是幂等的。简单来说，幂等函数可以安全地多次应用，而不会改变其初始应用之外的结果。

使函数幂等的一种技术是通过在每个已处理元素的 `dataset` 属性上添加值来跟踪您是否已经执行过它。这对于外部脚本很有用。

```js
addEventListener('page:loaded', function() {
    // Find my control
    var myControl = document.querySelector('.my-control');

    // Check if control has already been initialized
    if (!myControl.dataset.hasMyControl) {
        myControl.dataset.hasMyControl = true;

        // Initialize since this is the first time
        initializeMyControl(myControl);
    }
});
```

作为一般建议，更简单的方法是允许函数多次运行并在内部应用幂等技术。例如，在创建新的菜单分隔线之前先检查是否已存在。

### 销毁控件

在某些情况下，您可能仅为特定页面绑定全局事件，例如将热键绑定到某个操作。

```js
addEventListener('keydown', myKeyDownFunction);
```

为了防止此事件泄漏到其他页面，您应该使用 `page:unload` 方法移除事件，该方法将销毁任何事件和控件。该事件可以使用一次来安全地销毁控件和事件。

```js
addEventListener('page:unload', function() {
    removeEventListener('keydown', myKeyDownFunction);
}, { once: true });
```

::: tip
October CMS 包含一个用于[构建可销毁控件](./hot-controls.md)的配套库。
:::

### 暂停渲染

如果您想在加载新页面之前为某些元素（如下拉菜单或侧边栏菜单）添加动画，可以通过阻止 `page:before-render` 事件的默认行为并使用事件详细信息中的 `resume()` 函数来恢复来暂停渲染。

```js
addEventListener('page:before-render', async (event) => {
    event.preventDefault();

    await animateOut();

    event.detail.resume();
});
```

::: warning
请注意，**page:before-render** 事件可能会触发两次，一次来自缓存，一次来自请求新页面内容之后。
:::

## 全局事件

AJAX 框架在导航生命周期和页面响应期间触发多个事件。这些事件通常在 `document` 对象上触发，详细信息可通过 `event.detail` 属性获取。

事件 | 描述
------------- | -------------
**render** | 当页面通过 PJAX 或 AJAX 更新时触发。
**page:click** | 当点击 Turbo 路由的链接时触发。
**page:before-visit** | 在访问位置之前触发，使用浏览器历史记录导航时除外。
**page:visit** | 在点击访问开始后触发。
**page:request-start** | 在页面请求之前触发。
**page:request-end** | 在页面请求结束后触发。
**page:before-cache** | 在页面被缓存之前触发。
**page:before-render** | 在页面内容渲染之前触发。
**page:render** | 在页面渲染之后触发。这会触发两次，一次来自缓存，一次来自请求新页面内容之后。
**page:load** | 在初始页面加载后触发一次，之后每次页面访问时再次触发。
**page:loaded** | 与 `page:load` 相同，不同之处在于它会等待所有新添加的脚本加载完成。
**page:updated** | 类似于 `DOMContentLoaded`，但仅在页面被访问时触发。
**page:unload** | 当先前加载的页面应该被销毁时调用。

## 使用示例

以下 JavaScript 将在每次页面加载（包括脚本）时运行。

```js
addEventListener('page:loaded', function() {
    // ...
});
```

## 与热重载配合使用

在某些情况下，当您使用热重载或浏览器同步技术开发网站时，Turbo 路由器可能会产生干扰，例如使用 [Laravel Mix](https://laravel-mix.com/) 在开发模式下配合 `laravel-mix & browsersync`。要解决此问题，请在您的 webpack `browserSync` 配置中添加以下代码。

```js
snippetOptions: {
    rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
            return '<meta name="turbo-visit-control" content="disable" />';
        }
   }
}
```

#### 另请参阅

::: also
* [可观察控件](./hot-controls.md)
:::
