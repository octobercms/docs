---
subtitle: 表单小部件
shortname: Page Finder
---
# Page Finder 字段

`pagefinder` - 渲染一个用于选择页面链接的字段。展开该字段将显示选择器以查找页面。选择的结果是一个包含类型和引用的字符串。

```yaml
featured_page:
    label: Featured Page
    type: pagefinder
```

选定的值以以下格式存储。

```
october://<TYPE>@link/<REFERENCE>?<PARAM>=<VALUE>
```

以下[字段属性](../form-fields.md)受支持且常用。

属性 | 描述
------------- | -------------
**label** | 向用户显示表单字段时使用的名称。
**default** | 指定默认字符串值，可选。
**comment** | 在字段下方放置描述性注释。
**singleMode** | 仅允许选择解析为单个 URL 的项目。默认值：`false`

::: tip
使用 [linkage 列类型](../lists/column-linkage.md)在列表中解析 `pagefinder` 值。
:::

## 链接到页面

使用 [`|link` Twig 过滤器](../../markup/filter/link.md)将页面查找器值转换为 URL。

```twig
{{ featured_page|link }}
```

使用 [`|content` Twig 过滤器](../../markup/tag/content.md)处理 HTML 标记并替换内容中的所有链接。

```twig
{{ blog_html|content }}
```

## 创建新页面类型

插件可以使用各种事件为页面查找器扩展新的页面类型。订阅事件最常见的位置是插件注册文件的 `boot` 方法。

```php
public function boot()
{
    Event::listen('cms.pageLookup.listTypes', function() {
        // ...
    });

    Event::listen('cms.pageLookup.getTypeInfo', function($type) {
        // ...
    });

    Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
        // ...
    });
}
```

### 注册新页面类型

`cms.pageLookup.listTypes` 事件处理程序返回插件支持的页面类型列表。处理程序应返回一个关联数组，索引中为类型代码，值中为类型名称。强烈建议在类型代码中使用插件名称，以避免与其他页面类型提供者冲突。例如：

```php
Event::listen('cms.pageLookup.listTypes', function() {
    return [
        'blog-post' => 'Blog Post'
    ];
});
```

对于支持嵌套子项的页面类型，例如链接到所有博客文章，类型名称值应为一个数组，其中最后一项设置为 `true`。这将在只能选择一个链接的场景中排除它。以下将 **blog-posts** 类型标记为支持嵌套。

```php
Event::listen('cms.pageLookup.listTypes', function() {
    return [
        'blog-posts' => ['All Blog Posts', true]
    ];
});
```

### 返回页面类型信息

`cms.pageLookup.getTypeInfo` 事件处理程序返回有关支持的页面类型的详细信息。处理程序获取一个参数——页面类型代码（您使用 `cms.pageLookup.listTypes` 处理程序注册的代码之一）。处理程序代码必须检查请求的项目类型代码是否属于该插件。处理程序应返回以下格式的关联数组。

```php
Event::listen('cms.pageLookup.getTypeInfo', function($type) {
    if ($type == 'blog-post') {
        return [
            'references' => [
                11 => 'News',
                12 => 'Tutorials',
                13 => 'Philosophy',
            ],
            'cmsPages' => Page::withComponent('blogPosts')->all()
        ];
    }
});
```

#### 引用

`references` 元素是页面可以引用的对象列表。例如，**Blog Category** 页面类型返回博客类别列表。某些对象支持嵌套，例如完整的页面列表。其他对象不支持嵌套，例如博客类别。`references` 值的格式取决于引用是否有子项。没有子项的引用格式如下。

```php
'references' => [
    'item-key' => 'Item title'
]
```

有子项的引用格式如下。

```php
'references' => [
    'item-key' => [
        'title' => 'Item title',
        'items' => [...]
    ]
]
```

以下迭代器可用于在模型具有子级时生成引用。

```php
$iterator = function($records) use (&$iterator) {
    $result = [];
    foreach ($records as $record) {
        if (!$record->children) {
            $result[$record->id] = $record->title;
        }
        else {
            $result[$record->id] = [
                'title' => $record->title,
                'items' => $iterator($record->children)
            ];
        }
    }
    return $result;
};

return ['references' => $iterator($records)];
```

#### CMS 页面

`cmsPages` 是可以显示页面类型支持的对象的 CMS 页面列表。例如，对于 **Blog Category** 项目类型，页面列表包含托管 `blogPosts` 组件的页面。该组件可以显示博客类别内容。`cmsPages` 元素应为 `Cms\Classes\Page` 对象的数组。

以下 `withComponent` 方法将查找当前主题中所有使用 `blogPosts` 组件的页面。

```php
'cmsPages' => Page::withComponent('blogPosts')->all();
```

使用 `whereComponent` 查找所有使用 `section` 组件且 `handle` 属性设置为 **Your\Handle** 的页面。

```php
'cmsPages' => Page::whereComponent('section', 'handle', 'Your\Handle')->all();
```

使用 `inTheme` 通过传递主题代码在另一个主题中查找页面。

```php
'cmsPages' => Page::inTheme('demo')->withComponent('blogPosts')->all();
```

### 解析页面链接

当页面查找器生成链接时，每个项目都应由提供该项目类型的插件进行**解析**。解析过程包括生成真实的项目 URL、确定项目是否处于活动状态以及生成子项（如果需要）。

`cms.pageLookup.resolveItem` 事件处理程序解析页面信息并返回实际的项目 URL、标题、项目当前是否活动的指示器以及子项（如果有）。事件处理程序接受四个参数：

- `$type` - 项目类型名称。插件必须仅处理它们提供的项目类型，并忽略其他类型。
- `$item` - 项目对象（`Cms\Models\PageLookupItem`）。项目对象表示用户提供的项目配置。该对象具有以下属性：`title`、`type`、`reference`、`cmsPage`。
- `$url` - 指定当前绝对 URL，小写形式。始终使用 `Url::to()` 辅助函数生成项目链接并与当前 URL 进行比较。
- `$theme` - 当前主题对象（`Cms\Classes\Theme`）。

事件处理程序应检查匹配的 `type` 并返回一个数组。

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    if ($type === 'blog-post') {
        return [...];
    }

    if ($item->type == 'all-blog-posts') {
        return [...];
    }
});
```

`url` 和 `isActive` 元素是指向特定页面的项目所必需的。

```php
return [
    'title' => 'Some Category',
    'url' => 'https://example.tld/blog/category/some-category',
    'isActive' => true
];
```

### 解析嵌套页面链接

已解析的页面链接也可以返回多个项目。例如，**All Pages** 项目类型不会有特定的页面指向，因为它可以有多个链接。

在这些情况下，当 `$item` 参数的 `nesting` 属性设置为 true 时，解析器将请求子项。

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    // 解析项目
    $result = [...];

    // 请求子项
    if ($item->nesting) {
        $result['items'] = [...];
    }

    return $result;
});
```

项目应列在 `items` 元素中。`items` 元素应仅为标记为嵌套的项目提供。

```php
return [
    'url' => 'https://example.tld/blog/category/another-category',
    'isActive' => true,
    'items' => [
        [
            'title' => 'Another category',
            'url' => 'https://example.tld/blog/category/another-category',
            'isActive' => true
        ],
        [
            'title' => 'News',
            'url' => 'https://example.tld/blog/category/news',
            'isActive' => false
        ]
    ]
];
```

### 解析其他站点链接

已解析的页面链接可以返回包含此页面链接的其他站点。这里 `$item` 参数可能包含一个设置为 true 的 `sites` 属性。`Site` 和 `Cms` 门面在这里很有用，请参阅以下示例。

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    // 解析项目
    $result = [...];

    $page = \Cms\Classes\Page::loadCached($theme, $item->reference);

    // 请求站点
    if ($item->sites) {
        $sites = [];
        if (Site::hasMultiSite()) {
            foreach (Site::listEnabled() as $site) {
                $url = Cms::siteUrl($page, $site, [
                    'id' => $record->id,
                    'slug' => $record->slug,
                    'fullslug' => $record->fullslug
                ]);

                $sites[] = [
                    'url' => $url,
                    'id' => $site->id,
                    'code' => $site->code,
                    'locale' => $site->hard_locale,
                ];
            }
        }
        $result['sites'] = $sites;
    }

    return $result;
});
```

结果项目应包含一个 `sites` 数组，其中包含站点定义对象，每个对象都设置了 `url`。

### 使用示例

以下是通过查找模型和使用 `Cms\Classes\Controller` 类及 `pageUrl` 方法解析页面 URL 的基本示例。当使用 `$item->nesting` 请求时，它还使用模型上的 `children` 关系递归处理子项。

```php
Event::listen('cms.pageLookup.resolveItem', function($type, $item, $url, $theme) {
    if ($type !== 'my-model') {
        return;
    }

    $model = MyModel::find($item->reference);
    if (!$model) {
        return;
    }

    $controller = new Controller($theme);

    $pageUrl = $controller->pageUrl($item->cmsPage, [
        'id' => $model->id,
        'slug' => $model->slug
    ]);

    $result = [
        'url' => $pageUrl,
        'isActive' => $pageUrl == $url,
        'title' => $model->title,
        'mtime' => $model->updated_at,
    ];

    if (!$item->nesting) {
        return $result;
    }

    $iterator = function($children) use (&$iterator, &$item, &$theme, $url, $controller, $model) {
        $branch = [];

        foreach ($children as $child) {
            $childUrl = $controller->pageUrl($item->cmsPage, [
                'id' => $model->id,
                'slug' => $model->slug
            ]);

            $childItem = [
                'url' => $childUrl,
                'isActive' => $childUrl == $url,
                'title' => $child->title,
                'mtime' => $child->updated_at,
            ];

            if ($child->children) {
                $childItem['items'] = $iterator($child->children);
            }

            $branch[] = $childItem;
        }

        return $branch;
    };

    $result['items'] = $iterator($model->children);

    return $result;
});
```

::: tip
由于解析过程在每次渲染前端页面时都会发生，因此如果可能的话，缓存解析项目所需的所有信息是个好主意。
:::
