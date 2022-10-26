---
subtitle: Twig Function
---
# carbon()

The `carbon()` function can be used to handle dates and times using Twig, prepared with a [Carbon object](https://carbon.nesbot.com/docs/) and all its available functions.

The supplied value will be automatically converted to the current timezone, depending on the context of the request this will either be the `backend.timezone` or `cms.timezone` configuration setting.

To output the current date time value:

```
{{ carbon('now') }}
```

The `format` method can be used to apply various formats.

```twig
Meeting starts at {{ carbon(event.start_at).format('H:i') }} in Johannesburg.
```

Format a local time/date according to locale settings, this is the equivalent to `strftime` in PHP.

```twig
{{ carbon(article.created_at).formatLocalized('%d.%m.%Y %H:%M:%S') }}
```
