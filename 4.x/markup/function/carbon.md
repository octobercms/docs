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

To specify a custom value:

```
{{ carbon('2024-01-01 02:13:23') }}
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

## Date Format Cheat Sheet

The following values are available when formatting dates and times. You can use these codes with the `format` method.

Day Format  | Example
----------- | -------------
`d` | 01 through 31
`D` | Mon through Sun
`j` | 1 through 31
`l` | Sunday through Saturday
`N` | 1 (Monday) to 7 (Sunday)
`S` | st, nd, rd, th
`w` | 0 (Sunday) through 6 (Saturday)
`z` | 0 through 365

Week Format  | Example
------------ | -------------
`W` | 42 (42nd week in year)

Month Format  | Example
------------- | -------------
`F` | January through December
`m` | 01 through 12
`M` | Jan through Dec
`n` | 1 through 12
`t` | 28 through 31

Year Format  | Example
------------ | -------------
`Y` | 1985, 1991, 2012, 2014, ...
`y` | 85, 91, 12, 14, ...
`o` | Same as `Y`, except based on week ending
`L` | 1 (leap year), 0 otherwise

Time Format  | Example
------------ | -------------
`a` | am or pm
`A` | AM or PM
`B` | 000 through 999
`g` | 1 through 12
`G` | 0 through 23
`h` | 01 through 12
`H` | 01 through 23
`i` | 00 through 59
`u` | 123456 (microseconds)

Timezone Format  | Example
---------------- | -------------
`e` | UTC, GMT, Atlantic/Azores
`I` | 1 (daylight), 0 otherwise
`O` | +0200
`P` | +02:00
`T` | EST, MDT, ...
`Z` | -43200 through 50400 (timezone offset)

Date & Time Format  | Example
----------------- | -------------
`c` | 2004-02-12T15:19:21+00:00
`r` | Thu, 21 Dec 2000 16:01:07 +0200
`U` | Seconds since Jan 1 1970 00:00:00 GMT
