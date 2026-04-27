---
subtitle: Twig 函数
---
# carbon()

`carbon()` 函数可用于在 Twig 中处理日期和时间，它使用 [Carbon 对象](https://carbon.nesbot.com/docs/)及其所有可用方法。

提供的值将根据 `cms.timezone` 配置设置自动转换为当前时区，该设置可以通过[站点定义](../../cms/resources/multisite.md)进行配置。

输出当前日期时间值：

```twig
{{ carbon('now') }}
```

指定自定义值：

```
{{ carbon('2024-01-01 02:13:23') }}
```

## format

`format` 方法可用于应用各种格式。

```twig
Meeting starts at {{ carbon(event.start_at).format('H:i') }} in Johannesburg.
```

## formatLocalized

根据区域设置格式化本地时间/日期，这等同于 PHP 中的 `strftime`。

```twig
{{ carbon(article.created_at).formatLocalized('%d.%m.%Y %H:%M:%S') }}
```

## diffForHumans

`diffForHumans` 方法将以人类可读的文本形式呈现日期与当前时间之间的差异。

```twig
{{ carbon(post.published_at).diffForHumans() }}
```

## 缓存清除 URL

您可以使用格式化功能来生成缓存清除 URL。

```twig
// Outputs: 10.26.22.22.53.31
carbon('now').format('m.d.y.H.i.s')
```

然后按如下方式构建 URL。

```twig
<img src="{{ 'assets/images/image_file.jpg'|theme }}?{{ carbon('now').format('m.d.y.H.i.s') }}" alt="" />
```

## 日期格式速查表

以下值可用于格式化日期和时间。您可以将这些代码与 `format` 方法一起使用。

日格式  | 示例
----------- | -------------
`d` | 01 到 31
`D` | Mon 到 Sun
`j` | 1 到 31
`l` | Sunday 到 Saturday
`N` | 1（Monday）到 7（Sunday）
`S` | st, nd, rd, th
`w` | 0（Sunday）到 6（Saturday）
`z` | 0 到 365

周格式  | 示例
------------ | -------------
`W` | 42（一年中的第 42 周）

月格式  | 示例
------------- | -------------
`F` | January 到 December
`m` | 01 到 12
`M` | Jan 到 Dec
`n` | 1 到 12
`t` | 28 到 31

年格式  | 示例
------------ | -------------
`Y` | 1985, 1991, 2012, 2014, ...
`y` | 85, 91, 12, 14, ...
`o` | 与 `Y` 相同，但基于周末计算
`L` | 1（闰年），否则为 0

时间格式  | 示例
------------ | -------------
`a` | am 或 pm
`A` | AM 或 PM
`B` | 000 到 999
`g` | 1 到 12
`G` | 0 到 23
`h` | 01 到 12
`H` | 01 到 23
`i` | 00 到 59
`u` | 123456（微秒）

时区格式  | 示例
---------------- | -------------
`e` | UTC, GMT, Atlantic/Azores
`I` | 1（夏令时），否则为 0
`O` | +0200
`P` | +02:00
`T` | EST, MDT, ...
`Z` | -43200 到 50400（时区偏移量）

日期和时间格式  | 示例
----------------- | -------------
`c` | 2004-02-12T15:19:21+00:00
`r` | Thu, 21 Dec 2000 16:01:07 +0200
`U` | 自 1970 年 1 月 1 日 00:00:00 GMT 以来的秒数
