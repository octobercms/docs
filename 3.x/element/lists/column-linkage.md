# Linkage

The `linkage` column displays a hyperlink to the specified page.

```yaml
website:
    label: Website
    type: linkage
```

The following properties are supported.

Property | Description
------------- | -------------
**attributes** | an array of HTML attributes to pass to the anchor element.

Use the `attributes` property to add custom HTML attributes.

```yaml
website:
    label: Website
    type: linkage
    attributes:
        target: _blank
```

## Custom Link Text

By default, the value will be the URL to the linked location. For example, you may change the link text by returning an array value from the model.

```php
['https://octobercms.com', 'October CMS']
```

In your model, you may wish to use an attribute modifier to supply these values. The following creates a new `website_link` attribute on the model.

```php
public function getWebsiteLinkAttribute()
{
    return [$this->url, $this->name];
}
```

You may use the `displayFrom` property to keep sorting and searching intact on the database value. The following will search and sort using the `website` attribute and display the link using the `website_link` attribute.

```yaml
website:
    label: Website
    type: linkage
    displayFrom: website_link
```
