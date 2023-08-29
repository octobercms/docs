---
subtitle: Twig Filter
---
# |media

The `|media` filter returns an address relative to the public path of the [media manager library](../../cms/media/introduction.md). The result is a URL to the media file specified in the filter parameter.

```twig
<img src="{{ 'banner.jpg'|media }}" />
```

If the media manager address is __https://cdn.octobercms.com__ the above example would output the following:

```html
<img src="https://cdn.octobercms.com/banner.jpg" />
```

## PHP Interface

You may generate URLs in PHP using the `Media\Classes\MediaLibrary` class and `url` method.

```php
MediaLibrary::url('relative/path/to/asset.jpg');
```
