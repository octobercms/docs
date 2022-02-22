# |media

`|media` 过滤器返回相对于 [媒体管理器库](../cms/mediamanager.md) 的公共路径的地址。 结果是过滤器参数中指定的媒体文件的 URL。

```twig
<img src="{{ 'banner.jpg'|media }}" />
```

如果媒体管理器地址是 __https://cdn.octobercms.com__ 则上述示例将输出以下内容： 

```html
<img src="https://cdn.octobercms.com/banner.jpg" />
```
