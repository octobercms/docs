---
subtitle: 了解如何使用 CMS 页面构建简单的 API。
---
# 构建 API 端点

::: aside
如果您更喜欢使用 PHP 定义 API 路由，请查看[路由文章](../../extend/system/routing.md)。
:::

在使用 Vue.js 或 React 等客户端框架时，需要使用服务器端 API。这些 API 可以使用您的主题来定义，其中每个页面代表一个 API 端点。

页面代表一个转换层，位于您的 CMS 组件和返回给应用程序的 JSON 响应之间。大多数对象（如模型和集合）都支持 JSON 序列化，可以直接作为响应返回。

## 发送响应

在最简单的形式中，可以通过使用 `response()` [Twig 函数](../../markup/function/response.md)返回 Twig 变量来组成 API 资源。此函数会覆盖页面内容并向浏览器返回自定义响应。

::: cmstemplate
```ini
url = "/api/foobar"
```
```twig
{% do response({ foo: 'bar' }) %}
```
:::

上述调用将返回一个内容类型为 `application/json` 的响应。

```json
{ "foo": "bar" }
```

在大多数情况下，您将把组件变量转换为响应。

```twig
{% do response({
    id: post.id,
    title: post.title,
    email: post.author.email,
    created_at: post.created_at,
    updated_at: post.updated_at
}) %}
```

### 集合

`collect()` [Twig 函数](../../markup/function/collect.md)用于构建响应的集合。`push` 方法用于将项目推入集合，可用于自定义每个结果。

```twig
{% set result = collect() %}

{% for post in posts %}
    {% do result.push({
        id: post.id,
        title: post.title,
        email: post.author.email,
        created_at: post.created_at,
        updated_at: post.updated_at
    }) %}
{% endfor %}

{% do response(result) %}
```

## 条件

所有 Twig 条件都可以在标记中使用以影响响应，最后一个 response 调用将被发送到浏览器。

### 检查 HTTP 方法

使用 `this.request.method` [Twig 属性](../../markup/property/this-request.md)检查请求方法。

```twig
{% if this.request.method == 'GET' %}
    <!-- Do GET Logic -->
{% else %}
    <!-- Method Unsupported -->
{% endif %}
```

### 中止请求

`abort()` [Twig 函数](../../markup/function/abort.md)可用于以 404 响应中止请求。

```twig
{% if post %}
    {% do response(post) %}
{% else %}
    {% do abort(404) %}
{% endif %}
```

## 使用页面和布局

由于 API 是在页面或布局的标记部分中定义的，因此所有组件和生命周期事件都可用。

### 将布局用作中间件

中间件允许您将通用逻辑应用于多个端点，例如检查身份验证或限制请求频率。[具有优先模式的 CMS 布局](../themes/layouts.md)可用于将逻辑应用于多个页面，布局逻辑在页面逻辑之前执行。

请记住包含 [`{% page %}` Twig 标签](../../markup/tag/page.md)以便包含页面逻辑。例如，名为 **api.htm** 的布局可以包含任意条件逻辑。

::: cmstemplate
```ini
description = "API Authentication"
is_priority = 1
```
```twig
{% if someCondition %}
    {% page %}
{% else %}
    {% do response({ message: 'Condition not met' }, 400) %}
{% endif %}
```
:::

使用该布局的每个页面都将应用布局的条件。

::: cmstemplate
```ini
layout = "api"
```
```twig
{% do response({ success: true }) %}
```
:::

::: warning
始终在[布局中使用优先模式](../themes/layouts.md)以确保布局内容首先运行。
:::

### 调用 AJAX 处理器

在某些情况下，您可能希望调用组件或页面内的 AJAX 处理器。这可以使用 [`ajaxHandler()` Twig 函数](../../markup/function/ajax-handler.md)来实现。

::: cmstemplate
```ini
url = "/api/signin

[account]
```
```twig
{% set result = ajaxHandler('onSignin') %}

{% if result.error %}
    {% do response({ message: 'Login Failed' }, 401) %}
{% else %}
    {% do response({ success: true }) %}
{% endif %}
```
:::

您也可以调用处理器并将其直接作为响应传递。响应包括页面上设置的变量以及函数返回的数组值。

```twig
{% do response(ajaxHandler('onSubmitPost')) %}
```

它还会自动处理重定向。有关更多详细信息，请参阅 [Twig 函数文章](../../markup/function/ajax-handler.md)。

## 使用资源

在使用模型和集合时，建议将数据包装在 **data** 属性中返回。包装响应提供了一致的接口。

### 模型和集合

返回模型资源。

::: cmstemplate
```ini
url = "/api/blog/post/:slug"

[section post]
handle = "Blog\Post"
identifier = "slug"
```
```twig
{% if post %}
    {% do response({
        data: post
    }) %}
{% else %}
    {% do abort(404) %}
{% endif %}
```
:::

返回集合资源。

::: cmstemplate
```ini
url = "/api/blog/posts"

[collection posts]
handle = "Blog\Post"
```
```twig
{% do response({
    data: posts
}) %}
```
:::

### 分页

在响应分页集合时，建议使用 `pager()` [Twig 函数](../../markup/function/pager.md)通过 **links** 和 **meta** 属性构建响应。

```twig
{% set posts = blog.paginate(3) %}

{% set pager = pager(posts) %}

{% do response({
    data: posts,
    links: pager.links,
    meta: pager.meta
}) %}
```

上述代码将输出以下 JSON 格式。

```json
{
    "data": {},
    "links": {
        "first": "https://yoursite.tld/api/blog/posts?page=1",
        "last": "https://yoursite.tld/api/blog/posts?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "path": "https://yoursite.tld/api/blog/posts",
        "per_page": 3,
        "total": 2,
        "current_page": 1,
        "last_page": 1,
        "from": 1,
        "to": 2
    }
}
```

## 使用示例

以下是一些代码片段的实际使用示例。

### 返回带有头像缩略图的用户

以下示例将 `users` 变量设置为 [User 插件](https://octobercms.com/plugin/rainlab-user)中找到的所有用户。`avatar` 关联在之后被预加载，然后为每个用户设置 `avatar_thumb` 属性，如果存在头像则为缩略图 URL。

::: cmstemplate
```ini
## pages/api/users.htm
url = "/api/users"
```
```php
function onStart()
{
    $this['users'] = \RainLab\User\Models\User::all();
}
```
```twig
{# Load up the avatar relation #}
{% do users.load('avatar') %}

{# Set the 'avatar_thumb' attribute on each user #}
{% for user in users %}
    {% do user.setAttribute(
        'avatar_thumb',
        user.avatar.getThumbUrl(100, 100, {mode: 'crop'})|default(null)
    ) %}
{% endfor %}

{# Respond with the user #}
{% do response({
    data: users
}) %}
```
:::

#### 另请参阅

::: also
* [Response Twig Function](../../markup/function/response.md)
* [AJAX Handler Twig Function](../../markup/function/ajax-handler.md)
:::
