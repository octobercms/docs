---
subtitle: Bridge the gap between developers and publishers.
---
# Snippets

Snippets are blocks inserted into the [rich editor](../../element/form/widget-richeditor.md) or [markdown editor](../../element/form/widget-markdown.md), and configured with the [inspector tool](../../element/inspector-types.md). When the feature is available, an insert snippets button is shown in toolbar, and selecting a snippet will insert it into the editor.

Snippets can be defined as [partials](./partials.md) or [components](./components.md), allowing developers to define reusable and configurable pieces of content. There are many possible applications and examples of using snippets:

- Embedded videos - output a configured YouTube video or Twitch streams.
- Google Maps snippet - outputs a map centered on specific coordinates with predefined zoom factor. That snippet would be great for pages that explain directions.
- Universal commenting system - allows visitors to post comments to any page.
- Third-party integrations - for example with Yelp or TripAdvisor for displaying extra information on a page.

When including snippets in your page content, the [`|content` Twig filter](../../markup/tag/content.md) is needed to process and render the snippets as part of the output.

```twig
{{ blog_html|content }}
```

## Creating Snippets from Partials

Partial-based snippets provide simpler functionality and usually are just containers for HTML markup, or markup generated with Twig in a snippet.

To create snippet from a partial, open a partial in the Editor and click the **Snippet** button. From here, you can enter the snippet code, name and description in the partial form.

The snippet properties are optional and can be defined with the grid control on the partial settings form. The table has the following columns.

Column         | Description
-------------- | -----------
Property Title | specifies the property title, visible to the end user in the snippet inspector popup window.
Code           | specifies the property code, used for accessing the property values in the partial markup.
Type           | the property type, available types are `string`, `dropdown` and `checkbox`.
Default        | the default property value, for checkbox properties use `0` and `1` values.
Options        | the option list for the dropdown properties.

When defining **options**, list should have the following format: `key:Value | key2:Value`. The keys represent the internal option value, and values represent the string that users see in the drop-down list. The pipe character separates individual options. Example: `us:US | ca:Canada`. The key is optional, if it's omitted (`US | Canada`), the internal option value will be zero-based integer (`0`, `1`, ...). It's recommended to always use explicit option keys. The keys can contain only Latin letters, digits and characters `-` and `_`.

Any property defined in the property list can be accessed within the partial markdown as a usual variable, for example:

```twig
The country name is {{ country }}
```

In addition, properties can be passed to the partial components using [external property values](../themes/components.md).

## Creating Snippets from Components

Any [CMS component](./components.md) can be registered as a snippet using the `registerPageSnippets` method in your plugin class in the [registration file](../../extend/system/plugins.md). The API for registering a snippet is similar to the one for [registering components](../../extend/cms-components.md). The method should return an array with class names in keys and aliases in values.

```php
public function registerPageSnippets()
{
    return [
        \RainLab\Weather\Components\Weather::class => 'weather'
    ];
}
```

::: tip
The same component can be registered with `registerPageSnippets` and `registerComponents` to be used in CMS pages and content editors.
:::

To enable the use of AJAX, rendered snippets are be wrapped in an [AJAX partial](../../markup/tag/ajax-partial.md) by default. You may disable this by setting `snippetAjax` to `false` in the [component class definition](../../extend/cms-components.md).

```php
public function componentDetails()
{
    return [
        // ...
        'snippetAjax' => false
    ];
}
```

## Usage Examples

These are some practical examples of how snippets can be used.

### Viewing a Tailor Record

The following snippet displays a blog post summary from a tailor entry record. It includes a [section component](../components/section.md) and sets the lookup `value` from the `post_id` snippet property using external property values.

The publisher sets the **Blog Post ID** for the blog post, and it outputs a link to the blog post as a card element.


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

The following snippet implements a YouTube embed video as a [CMS partial](./partials.md). It includes a method for extracting the YouTube code from a browser URL and converting a time string to seconds.

The publisher sets the **Video URL** and **Start At** snippet values, and it outputs a standard YouTube embed code using an inline frame element.

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
snippetProperties[url][type] = "string"
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

The next snippet displays a basic contact form and provides a way to handle the submission logic, it does not include code for [validating the form](../features/validation.md) and [sending the email](../../extend/system/sending-mail.md).

The snippet has no properties, the publisher only needs to include the widget on the page, and it outputs a contact form with a success message.

::: cmstemplate
```ini
## partials/snippets/contact-form.htm

[viewBag]
snippetCode = "contactForm"
snippetName = "Contact Form"
snippetDescription = "Display a contact form"
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
* [CMS Partials](./partials.md)
* [Developing Components](../../extend/cms-components.md)
:::
