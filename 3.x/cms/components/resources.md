---
subtitle: Inject assets, variables and headers to the page.
---
# Resources

The `resources` component can create new variables, add headers and inject assets to the page. The resources component can be used on any page, layout or partial.

## Available Properties

The following properties are supported by the component.

Property | Description
-------- | -------------
**js** | Array of JavaScript files in the theme **assets/js** folder
**less** | Array of LESS files in the theme **assets/less** folder
**scss** | Array of SCSS files in the theme **assets/scss** folder
**css** | Array of Stylesheet files in the theme **assets/css** folder
**vars** | Includes variables available on the page or layout.
**headers** | Includes headers with the page response.

## Basic Usage

The following example uses the `vars` property to create a new variable called **activeNav** and this variable becomes available to the page life-cycle, this includes layouts for that page or partials that are used on the page. The variable is accessed using the `{{ activeNav }}` Twig variable.

```ini
[resources]
vars[activeNav] = 'blog'
==
{% if activeNav === 'blog' %}
    <p>The blog is active!</p>
{% endif %}
```

## Injecting Variables

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

## Injecting Assets

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

## Using Custom Headers

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
