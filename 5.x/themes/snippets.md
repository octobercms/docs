---
previousPath: cms/themes/snippets.md
subtitle: Let editors insert configurable partials and components into rich editor content as snippets.
---
# Snippets

Snippets are reusable blocks that editors insert into the [rich editor](../handbook/form-fields/richeditor.md) or [markdown editor](../handbook/form-fields/markdown.md), and configure with the [Inspector](../handbook/inspector-types.md). Developers define snippets from [partials](./partials.md) or [components](./components.md), so publishers can place configurable content without writing code.

::: cmstemplate
```ini
[viewBag]
snippetCode = "callout"
snippetName = "Callout"
snippetDescription = "Highlight a message"
snippetProperties[message][title] = "Message"
snippetProperties[message][type] = "string"
```
```twig
<div class="callout">{{ message }}</div>
```
:::

When snippets are available, the editor toolbar shows an insert snippets button. Selecting a snippet inserts it into the content as a block, or as an [inline snippet](#inline-snippets) within a line of text. Some common uses for snippets include:

- Embedded videos, such as a configured YouTube video or Twitch stream.
- A map centered on specific coordinates with a predefined zoom level, for pages that explain directions.
- A commenting system that lets visitors post comments on any page.
- Third-party integrations, for example showing extra information from Yelp or TripAdvisor.

## Rendering Snippets in Content

Content that contains snippets needs the [`|content` Twig filter](../handbook/twig-tags/content.md#parsing-content-as-a-string), which processes the snippets and renders them as part of the output.

```twig
{{ blog_html|content }}
```

## Creating Snippets from Partials

Partial snippets are the simpler kind. They are usually containers for HTML markup, or for markup generated with Twig.

To turn a partial into a snippet, open the partial in the Editor and click the **Snippet** button. Then enter the snippet code, name and description in the form. The settings are saved to the `viewBag` section of the partial's configuration, as shown in the example above.

Snippet properties are optional. Define them in the properties table of the snippet form, which has the following columns.

Column         | Description
-------------- | -----------
Property Title | the property title, shown to the publisher in the snippet Inspector.
Code           | the property code, used to read the property value in the partial markup.
Type           | the property type, either `string`, `dropdown` or `checkbox`.
Default        | the default property value. For checkbox properties, use `0` and `1`.
Options        | the option list for dropdown properties, see below.

Every property is available in the partial markup as a regular variable.

```twig
The country name is {{ country }}
```

Properties can also be passed to components in the partial using [external property values](./components.md#setting-properties-from-url-and-partial-variables).

### Defining Dropdown Options

Write the **options** list in the format `key:Value | key2:Value`. The keys are the internal option values, and the values are the labels users see in the dropdown list. A pipe character separates options, for example `us:US | ca:Canada`.

The key is optional. If you leave it out, as in `US | Canada`, the internal option values are zero-based integers (`0`, `1`, ...). Always using explicit keys is recommended. Keys can only contain Latin letters, digits and the `-` and `_` characters.

The **options** value can also be a reference to a static PHP class method, written as `Class::method`.

## Creating Snippets from Components

Register any [component](./components.md) as a snippet with the `registerPageSnippets` method in your [plugin registration file](../backend/plugins/introduction.md). The method works like [registering components](./extending/components.md): it returns an array with class names as keys and aliases as values.

```php
public function registerPageSnippets()
{
    return [
        \RainLab\Weather\Components\Weather::class => 'weather'
    ];
}
```

::: tip
Register the same component with both `registerPageSnippets` and `registerComponents` to use it on CMS pages and in content editors.
:::

## Inline Snippets

By default, a snippet is inserted as a block on its own line. An inline snippet sits within a line of text instead, which suits small pieces of content such as a phone number, a price or a formatted value.

For a partial snippet, open the partial in the Editor, click the **Snippet** button, and check the **Inline Snippet** option.

For a component snippet, set `snippetInline` to `true` in the [component class definition](./extending/components.md).

```php
public function componentDetails()
{
    return [
        // ...
        'snippetInline' => true
    ];
}
```

An inline snippet should render an inline element, such as a `<span>`, so it sits correctly within the surrounding text.

```twig
<span class="price">{{ amount }}</span>
```

## Using AJAX Handlers in Snippets

To let a snippet use AJAX handlers, it can be rendered as an [AJAX partial](../handbook/twig-tags/ajax-partial.md). For a partial snippet, check the **AJAX Enabled** option in the snippet form, which sets `snippetAjax` in the `viewBag` section, as in the [contact form example](#basic-contact-form). For a component snippet, set `snippetAjax` to `true` in the [component class definition](./extending/components.md).

```php
public function componentDetails()
{
    return [
        // ...
        'snippetAjax' => true
    ];
}
```

## Snippet Examples

The following examples show some practical uses for snippets.

### Viewing a Tailor Record

The following snippet displays a summary of a blog post stored in a Tailor entry. It uses the [section component](../handbook/tailor-components/section.md) and sets the lookup `value` from the `post_id` snippet property using external property values.

The publisher sets the **Blog Post ID**, and the snippet outputs a card that links to the blog post.

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

### Embedding a YouTube Video

The following snippet embeds a YouTube video as a [partial](./partials.md). It includes functions that extract the YouTube code from a browser URL and convert a time string to seconds.

The publisher sets the **Video URL** and **Start At** values, and the snippet outputs the standard YouTube embed code using an inline frame.

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

### Basic Contact Form

The next snippet displays a basic contact form and handles the submission. It does not include code for [validating the form](./ajax/validation.md) or [sending the email](../backend/services/mail.md).

The snippet has no properties, so the publisher only needs to place it on the page. It outputs a contact form, followed by a success message. The `snippetAjax` setting is `1` to enable AJAX handlers.

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

#### See Also

::: also
* [Partials](./partials.md)
* [Building Components](./extending/components.md)
* [Content Twig Tag](../handbook/twig-tags/content.md)
:::
