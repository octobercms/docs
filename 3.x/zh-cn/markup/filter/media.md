---
subtitle: Twig 过滤器
---
# |media

`|media` 过滤器返回相对于[媒体管理器库](../../cms/media/introduction.md)公共路径的地址。结果是过滤器参数中指定的媒体文件的 URL。

```twig
<img src="{{ 'banner.jpg'|media }}" />
```

如果媒体管理器地址是 __https://cdn.octobercms.com__，上面的示例将输出以下内容：

```html
<img src="https://cdn.octobercms.com/banner.jpg" />
```

## PHP 接口

您可以在 PHP 中使用 `Media\Classes\MediaLibrary` 类和 `url` 方法来生成 URL。

```php
\Media\Classes\MediaLibrary::url('relative/path/to/asset.jpg');
```
