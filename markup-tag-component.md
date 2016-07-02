# {% component %}

The `{% component %}` tag will parse the default markup content for a [CMS component](../cms/partials) and display it on the page. Not all components provide default markup, the documentation for the plugin will guide in the correct usage.

    {% component "blogPosts" %}

This will render the component partial with a fixed name of **default.htm** and is essentially an alias for the following:

    {% partial "blogPosts::default" %}

<a name="variables"></a>
## Variables

Some components support [passing variables](../cms/components#component-variables) at render time:

    {% component "blogPosts" postsPerPage="5" %}

<a name="customizing-components"></a>
## Customizing components

In most cases the `{% component %}` tag is not needed and the markup is provided as a usage example for the component API. Components are intended to be customized, this can be done in two ways:

1. [Moving default markup to a partial](../cms/components#moving-default-markup)
1. [Overriding component partials](../cms/components#overriding-partials)
