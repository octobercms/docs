---
subtitle: 弥合开发人员和发布者之间的差距。
---
# 片段

片段是插入到[富文本编辑器](../../element/form/widget-richeditor.md)或 [Markdown 编辑器](../../element/form/widget-markdown.md)中，并通过[检查器工具](../../element/inspector-types.md)进行配置的块。当此功能可用时，工具栏中会显示一个插入片段按钮，选择一个片段即可将其插入到编辑器中。

片段可以定义为[部件](./partials.md)或[组件](./components.md)，允许开发人员定义可复用且可配置的内容片段。片段有许多可能的应用和示例：

- 嵌入视频 - 输出配置好的 YouTube 视频或 Twitch 直播流。
- Google Maps 片段 - 输出以特定坐标为中心、具有预定义缩放因子的地图。该片段非常适合用于解释路线的页面。
- 通用评论系统 - 允许访客在任何页面上发表评论。
- 第三方集成 - 例如与 Yelp 或 TripAdvisor 集成，在页面上显示额外信息。

在页面内容中包含片段时，需要使用 [`|content` Twig 过滤器](../../markup/tag/content.md)来处理和渲染片段作为输出的一部分。

```twig
{{ blog_html|content }}
```

## 从部件创建片段

基于部件的片段提供更简单的功能，通常只是 HTML 标记的容器，或者是使用 Twig 在片段中生成的标记。

要从部件创建片段，请在编辑器中打开一个部件并点击**片段**按钮。从这里，您可以在部件表单中输入片段代码、名称和描述。

片段属性是可选的，可以通过部件设置表单上的网格控件来定义。该表格具有以下列。

列 | 描述
-------------- | -----------
属性标题 | 指定属性标题，在片段检查器弹出窗口中对最终用户可见。
代码 | 指定属性代码，用于在部件标记中访问属性值。
类型 | 属性类型，可用类型为 `string`、`dropdown` 和 `checkbox`。
默认值 | 默认属性值，对于 checkbox 属性使用 `0` 和 `1` 值。
选项 | dropdown 属性的选项列表（见下文）。

在属性列表中定义的任何属性都可以在部件标记中作为普通变量访问，例如：

```twig
The country name is {{ country }}
```

此外，可以使用[外部属性值](../themes/components.md)将属性传递给部件组件。

### 定义选项

定义**选项**时，列表应采用以下格式：`key:Value | key2:Value`。键代表内部选项值，值代表用户在下拉列表中看到的字符串。管道符分隔各个选项，例如：`us:US | ca:Canada`。

键是可选的，如果省略（`US | Canada`），内部选项值将是从零开始的整数（`0`、`1`、...）。建议始终使用显式的选项键。键只能包含拉丁字母、数字以及字符 `-` 和 `_`。

或者，**选项**属性也可以定义为对静态 PHP 类方法的引用（`Class::method`）。

## 从组件创建片段

任何 [CMS 组件](./components.md)都可以在[注册文件](../../extend/system/plugins.md)中使用插件类的 `registerPageSnippets` 方法注册为片段。注册片段的 API 与[注册组件](../../extend/cms-components.md)的 API 类似。该方法应返回一个以类名为键、别名为值的数组。

```php
public function registerPageSnippets()
{
    return [
        \RainLab\Weather\Components\Weather::class => 'weather'
    ];
}
```

::: tip
同一个组件可以同时使用 `registerPageSnippets` 和 `registerComponents` 注册，以便在 CMS 页面和内容编辑器中使用。
:::

要启用 AJAX 处理器的使用，可以使用 [AJAX 部件](../../markup/tag/ajax-partial.md)来渲染片段。您可以通过在[组件类定义](../../extend/cms-components.md)中将 `snippetAjax` 设置为 `true` 来启用此功能。

```php
public function componentDetails()
{
    return [
        // ...
        'snippetAjax' => true
    ];
}
```

## 使用示例

以下是片段使用方法的一些实际示例。

### 查看 Tailor 记录

以下片段显示来自 Tailor 条目记录的博客文章摘要。它包含一个 [Section 组件](../components/section.md)，并使用外部属性值从 `post_id` 片段属性设置查找 `value`。

发布者设置博客文章的**博客文章 ID**，然后输出一个指向博客文章的卡片元素链接。


::: cmstemplate
```ini
## partials/snippets/blog-post-reference.htm

[viewBag]
snippetCode = "blogPostReference"
snippetName = "Blog Post Reference"
snippetDescription = "Display a reference to a blog post"
snippetProperties[post_id][title] = "Blog Post ID"
snippetProperties[post_id][type] = "string"

[section post]
handle = "Blog\Post"
identifier = "id"
value = "{{ post_id }}"
```
```twig
{% if post is not empty %}
    <div class="card shadow-sm">
        <div class="card-body">
            <h4>{{ post.title }}</h4>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-between align-items-center">
                <a href="{{ 'blog/post'|page({ slug: post.slug }) }}" class="stretched-link">
                    {{ post.categories.first.title|default('') }}
                </a>
                <small class="text-muted">{{ post.published_at_date|date('j M Y') }}</small>
            </div>
        </div>
    </div>
{% else %}
    <!-- Post Missing: Unable to Find an Entry -->
{% endif %}
```
:::

### 嵌入 YouTube 视频

以下片段将 YouTube 嵌入视频实现为 [CMS 部件](./partials.md)。它包含一个从浏览器 URL 中提取 YouTube 代码的方法，以及一个将时间字符串转换为秒数的方法。

发布者设置**视频 URL** 和**起始时间**片段值，然后使用内联框架元素输出标准的 YouTube 嵌入代码。

::: cmstemplate
```ini
## partials/snippets/youtube-video.htm

[viewBag]
snippetCode = "youtubeVideo"
snippetName = "YouTube Video"
snippetDescription = "Embed a Youtube Video on the page"
snippetProperties[url][title] = "Video URL"
snippetProperties[url][type] = "string"
snippetProperties[start_at][title] = "Start At"
snippetProperties[start_at][type] = "string"
```
```php
// Converts https://www.youtube.com/watch?v=k_H2zJ7UZfs to k_H2zJ7UZfs
function urlToCode($link = '')
{
    $parts = parse_url($link);
    if (isset($parts['query'])) {
        parse_str($parts['query'], $qs);
        if (isset($qs['v'])){
            return $qs['v'];
        }
        elseif (isset($qs['vi'])){
            return $qs['vi'];
        }
    }
    if (isset($parts['path'])){
        $path = explode('/', trim($parts['path'], '/'));
        return $path[count($path)-1];
    }
    return null;
}

// Converts 15:00 to 900
function timeToSeconds($time = '')
{
    $parts = explode(':', $time);
    if (count($parts) === 3) {
        return $parts[0] * 3600 + $parts[1] * 60 + $parts[2];
    }
    elseif (count($parts) === 2) {
        return $parts[0] * 60 + $parts[1];
    }
    return $time ?: 0;
}
```
```twig
{% if url %}
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/{{ this.urlToCode(url) }}?start={{ this.timeToSeconds(start_at) }}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
{% else %}
    <!-- Video URL Missing -->
{% endif %}
```
:::

### 基本联系表单

下一个片段显示一个基本的联系表单，并提供处理提交逻辑的方法，它不包含[验证表单](../features/validation.md)和[发送邮件](../../extend/system/sending-mail.md)的代码。

该片段没有属性，发布者只需在页面上包含该小部件，它就会输出一个带有成功消息的联系表单。`snippetAjax` 属性设置为 `1` 以启用 AJAX 处理器的使用。

::: cmstemplate
```ini
## partials/snippets/contact-form.htm

[viewBag]
snippetCode = "contactForm"
snippetName = "Contact Form"
snippetDescription = "Display a contact form"
snippetAjax = 1
```
```php
function onSubmitContact()
{
    $this['submitted'] = true;
}
```
```twig
{% if not submitted %}
    <h3>Tell us what you think!</h3>
    <form data-request="onSubmitContact" data-request-update="{ _self: true }">
        <div class="row">
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input name="name" type="text" class="form-control">
                    <label>Name</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input name="email" type="email" class="form-control">
                    <label>Email Address</label>
                </div>
            </div>
        </div>
        <div class="mb-3 form-floating">
            <textarea class="form-control h-100"></textarea>
            <label>Message</label>
        </div>
        <div class="form-buttons d-flex pt-2">
            <div>
                <button type="submit" class="btn btn-primary btn-pill">Submit</button>
            </div>
        </div>
    </form>
{% else %}
    <div class="alert alert-success">
        Thanks for contacting us!
    </div>
{% endif %}
```
:::

#### 参见

::: also
* [CMS 部件](./partials.md)
* [开发组件](../../extend/cms-components.md)
:::
