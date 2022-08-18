---
subtitle: Available components used by Tailor.
---
# Components

## Section

The `section` component defines a website section with a supporting entry. This section will be used when previewing the entry from the backend panel.

### Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](../blueprints/entry.md).
**entrySlug** | The value to use to look up the entry by its `slug` attribute.
**fullSlug** | Use the full slug when looking up the entry, structured entries only. Default: `false`
**entryDefault** | Make this the default page when previewing the entry. Default: `true`.

### Basic Usage

The following creates a section for the **Blog\Author** entry and locates it using the `:slug` routing parameter. The component is assigned a name **author** using the component alias and this is the variable name that becomes available to the page. The author name is displayed as a title by accessing the `{{ author.title }}` Twig variable.

```ini
url = "author/:slug"

[section author]
handle = "Blog\Author"
entrySlug = "{{ :slug }}"
==
<h1>Posts by {{ author.title }}</h1>
```

### Checking Record Existence

In most cases you will want to display a 404 page when a record cannot be found. This is possible by using an `{% if %}` statement combined with the `abort(404)` function.

```twig
{% if author is empty %}
    {% do abort(404) %}
{% endif %}
```

### Accessing the Entry Type

When using the [Content Groups](../blueprints/entry.md) feature of the entry blueprint, you may access the group code using the `entry_type` attribute. For example, a post may have a content group of **regular_post** and **markdown_post** where the content is handled differently.

```twig
{% if post.entry_type == 'markdown_post' %}
    <!-- Render content as Markdown -->
    {{ post.content|md }}
{% else %}
    <!-- Render content as HTML -->
    {{ post.content|raw }}
{% endif %}
```

### Using the Full Slug

If the entry type is a `structure`, then it will have a **fullslug** attribute available. To use the full slug in the page URL it should be defined as a wildcard route parameter. The `fullSlug` property of the component should be enabled.

```ini
url = "/wiki/:slug*"

[section wiki]
handle = "Wiki\Article"
entrySlug = "{{ :slug }}"
fullSlug = 1
```

## Collection

The `collection` component displays a collection of entries on the page. The collection component can be used on any page, layout or partial.

### Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [entry blueprint](../blueprints/entry.md).

### Basic Usage

The following adds a collection of **Blog\Post** entries to the page. The component is assigned a name **posts** using the component alias and this is the variable name that becomes available to the page. The collection is looped over in Twig by accessing the `posts` collection and a `{% for %}` loop.

```ini
[collection posts]
handle = "Blog\Post"
==
{% for post in posts %}
    <h1>{{ post.title }}</h1>
{% endfor %}
```

### Applying Queries to the Collection

When accessing the component variable using a method it will switch to a database query. For example, to only show entries that have a field `color` with the value **blue** use the `where` query method. Using the `{% set %}` Twig tag will assign the result to a new variable.

```twig
<!-- Lists posts that have the color blue -->
{% set bluePosts = posts.where('color', 'blue').get() %}
```

To show only posts that have a related author, you can use the `whereRelation` query method. To complete the query, proceed with the `get()` method.

```twig
<!-- Lists posts that are owned by Bella Vista -->
{% set authorPosts = posts.whereRelation('author', 'slug', 'bella-vista').get() %}
```

You could also apply pagination to the collection with the `paginate()` method instead.

```twig
<!-- Paginate posts at 10 per page -->
{% set authorPosts = posts.whereRelation(...).paginate(10) %}

<!-- Display the pagination navigation -->
{{ authorPosts.links|raw }}
```

## Global

The `global` component makes a global record available to the page, layout or partial. The global component can be used on any page, layout or partial.

### Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**handle** | The handle of the [global blueprint](../blueprints/global.md).

### Basic Usage

The following adds a global using the handle **Blog\Config** to the page. The component is assigned a name of **blogConfig** using the component alias and this is the variable name that becomes available to the page. The page access the `about_this_blog` text field and displays it on the page.

```ini
[global blogConfig]
handle = "Blog\Config"
==
<p>{{ blogConfig.about_this_blog }}</p>
```

## Resources

The `resources` component can create new variables, add headers and inject assets to the page. The resources component can be used on any page, layout or partial.

### Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**js** | Array of JavaScript files in the theme **assets/js** folder
**less** | Array of LESS files in the theme **assets/less** folder
**scss** | Array of SCSS files in the theme **assets/scss** folder
**css** | Array of Stylesheet files in the theme **assets/css** folder
**vars** | Includes variables available on the page or layout.
**headers** | Includes headers with the page response.

### Basic Usage

The following example uses the `vars` property to create a new variable called **activeNav** and this variable becomes available to the page life-cycle, this includes layouts for that page or partials that are used on the page. The variable is accessed using the `{{ activeNav }}` Twig variable.

```ini
[resources]
vars[activeNav] = 'blog'
==
{% if activeNav === 'blog' %}
    <p>The blog is active!</p>
{% endif %}
```

### Injecting Variables

The resources component lets you define any number of variables on the page. These become available to the layout as a usual Twig variable.

```ini
[resources]
vars[activeNav] = 'blog'
```

You may also use parameters from the page cycle. In the following example the `activeNav` variable will contain the value found inside the `:slug` page route.

```ini
url = "mypage/:slug"

[resources]
vars[activeNav] = '{{ :slug }}'
```

This concept also works for component variables. The following example looks up the author by the `:slug` found in the page route and then assigns the `author.id` to the **authorIdPage** page variable.

```ini
url = "/author/:slug"

[section author]
handle = "Blog\Author"
entrySlug = "{{ :slug }}"

[resources]
vars[authorIdPage] = 'Author ID is: {{ author.id }}'
```

### Injecting Assets

If a layout includes the standard `{% scripts %}` and `{% styles %}` tags, then it is possible to inject assets to these placeholders. The assets will be bundled and combined to a single script/style reference.

Assets loaded using the resources component should be in a specific folder inside the theme as described in the available properties. An example could be a partial named **blocks/carousel.htm**

```ini
[resources]
less[] = "blocks/carousel.less"
js[] = "blocks/carousel.js"
==
<!-- Carousel Contents Here -->
```

Now when the partial is loaded on the page, the scripts and stylesheets will be injected to the layout. The assets should be located in the **assets/js/blocks/carousel.js** and **assets/less/blocks/carousel.less** directories respectively.

```twig
<!-- Assets for the carousel are injected automatically -->
{% partial 'blocks/carousel' %}
```

::: tip
Using the partial twice on the page will only inject the assets once.
:::

### Using Custom Headers

As an example of defining custom headers, you may wish to render XML content on a page instead of HTML content. This is possible by injecting a `Content-Type` header in to the page and giving it a value of **text/xml**. This header value will be sent with the response when the page loads.

```ini
url = "/blog/rss"

[resources]
headers[Content-Type] = 'text/xml'
==
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <!-- RSS contents here --/>
</rss>
```
