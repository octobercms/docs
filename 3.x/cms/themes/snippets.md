---
subtitle: Bridges the gap between publishers and developers.
---
# Snippets

Snippets are CMS partials that can be inserted into the [rich editor](../../element/form/widget-richeditor.md) and configured using the [inspector tool](../../element/inspector-types.md). When available, a button to insert snippets is displayed in toolbar and can be added into the editor with a mouse click.

This feature allows developers to define reusable and configurable pieces of content, and there are many possible applications and examples of using snippets:

- Embedded videos - output a configured YouTube video or Twitch streams.
- Google Maps snippet - outputs a map centered on specific coordinates with predefined zoom factor. That snippet would be great for pages that explain directions.
- Universal commenting system - allows visitors to post comments to any page.
- Third-party integrations - for example with Yelp or TripAdvisor for displaying extra information on a page.

## Creating Snippets from Partials

Partial-based snippets provide simpler functionality and usually are just containers for HTML markup, or markup generated with Twig in a snippet.

To create snippet from a partial, open a partial in the Editor and click the Snippet button. From here you can enter the snippet code, name and description in the partial form.

The snippet properties are optional and can be defined with the grid control on the partial settings form. The table has the following columns.

Column         | Description
-------------- | -----------
Property Title | specifies the property title, visible to the end user in the snippet inspector popup window.
Property Code  | specifies the property code, used for accessing the property values in the partial markup.
Type           | the property type, available types are `string`, `dropdown` and `checkbox`.
Default        | the default property value, for checkbox properties use `0` and `1` values.
Options        | the option list for the dropdown properties.

When defining options, list should have the following format: `key:Value | key2:Value`. The keys represent the internal option value, and values represent the string that users see in the drop-down list. The pipe character separates individual options. Example: `us:US | ca:Canada`. The key is optional, if it's omitted (`US | Canada`), the internal option value will be zero-based integer (`0`, `1`, ...). It's recommended to always use explicit option keys. The keys can contain only Latin letters, digits and characters `-` and `_`.

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
