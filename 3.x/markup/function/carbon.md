---
subtitle: Twig Function
---
# carbon()

The `carbon()` function can be used to handle dates and times using Twig, prepared with a [Carbon object](https://carbon.nesbot.com/docs/) and all its available functions.

The supplied value will be automatically converted to the current timezone depending on the `cms.timezone` configuration setting, which can be set using a [site definition](../../cms/resources/multisite.md).

To output the current date time value:

```twig
{{ carbon('now') }}
```

## format

The `format` method can be used to apply various formats.

```twig
Meeting starts at {{ carbon(event.start_at).format('H:i') }} in Johannesburg.
```

## formatLocalized

Format a local time/date according to locale settings, this is the equivalent to `strftime` in PHP.

```twig
{{ carbon(article.created_at).formatLocalized('%d.%m.%Y %H:%M:%S') }}
```

## diffForHumans

The `diffForHumans` method will render the difference between a date and now in human readible text.

```twig
{{ carbon(post.published_at).diffForHumans() }}
```

## Cache Busting URLs

You can use the format to produce cache busting URLs.

```twig
// Outputs: 10.26.22.22.53.31
carbon('now').format('m.d.y.H.i.s')
```

Then build the URL like the following.

```twig
<img src="{{ 'assets/images/image_file.jpg'|theme }}?{{ carbon('now').format('m.d.y.H.i.s') }}" alt="" />
```
