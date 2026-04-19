# 助手

October CMS 包含各种"助手" PHP 函数。其中许多函数在 October 内部使用，但是，如果你觉得它们有用，也可以在你自己的插件和应用程序中自由使用。

### 数组

<div class="content-list-p" markdown="1">

[array_add](#method-array-add)
[array_divide](#method-array-divide)
[array_dot](#method-array-dot)
[array_undot](#method-array-undot)
[array_except](#method-array-except)
[array_first](#method-array-first)
[array_flatten](#method-array-flatten)
[array_forget](#method-array-forget)
[array_get](#method-array-get)
[array_only](#method-array-only)
[array_pluck](#method-array-pluck)
[array_pull](#method-array-pull)
[array_set](#method-array-set)
[array_sort](#method-array-sort)
[array_sort_recursive](#method-array-sort-recursive)
[array_where](#method-array-where)
[head](#method-head)
[last](#method-last)

</div>

### 路径

<div class="content-list-p" markdown="1">

[路径符号](#path-symbols)
[app_path](#method-app-path)
[base_path](#method-base-path)
[config_path](#method-config-path)
[database_path](#method-database-path)
[plugins_path](#method-plugins-path)
[public_path](#method-public-path)
[storage_path](#method-storage-path)
[temp_path](#method-temp-path)
[themes_path](#method-themes-path)
[cache_path](#method-cache-path)

</div>

### 字符串

<div class="content-list-p" markdown="1">

[camel_case](#method-camel-case)
[class_basename](#method-class-basename)
[e](#method-e)
[ends_with](#method-ends-with)
[snake_case](#method-snake-case)
[str_limit](#method-str-limit)
[starts_with](#method-starts-with)
[str_contains](#method-str-contains)
[str_finish](#method-str-finish)
[str_is](#method-str-is)
[str_plural](#method-str-plural)
[str_random](#method-str-random)
[str_singular](#method-str-singular)
[str_slug](#method-str-slug)
[studly_case](#method-studly-case)
[trans](#method-trans)
[trans_choice](#method-trans-choice)

</div>

### 其他

<div class="content-list-p" markdown="1">

[asset](#method-asset)
[config](#method-config)
[dd](#method-dd)
[env](#method-env)
[input](#method-input)
[get](#method-get)
[post](#method-post)
[files](#method-files)
[redirect](#method-redirect)
[request](#method-request)
[response](#method-response)
[route](#method-route)
[secure_asset](#method-secure-asset)
[trace_log](#method-trace-log)
[trace_sql](#method-trace-sql)
[url](#method-url)

</div>

## 数组

<a name="method-array-add"></a>
#### `array_add()`

`array_add` 函数将给定的键/值对添加到数组中（如果给定的键在数组中不存在）：

```php
$array = array_add(['name' => 'Desk'], 'price', 100);

// ['name' => 'Desk', 'price' => 100]
```

<a name="method-array-divide"></a>
#### `array_divide()`

`array_divide` 函数返回两个数组，一个包含键，另一个包含原始数组的值：

```php
list($keys, $values) = array_divide(['name' => 'Desk']);

// $keys: ['name']

// $values: ['Desk']
```

<a name="method-array-dot"></a>
#### `array_dot()`

`array_dot` 函数将多维数组展平为使用"点"表示法表示深度的单级数组：

```php
$array = array_dot(['foo' => ['bar' => 'baz']]);

// ['foo.bar' => 'baz'];
```

<a name="method-array-undot"></a>
#### `array_undot()`

`array_undot` 函数是 `array_dot` 方法的反向操作。它将点表示法的数组转换为标准关联数组：

```php
$array = array_undot([
    'foo.bar' => 'baz'
]);

// [
//    'foo' => [
//        'bar' => 'baz'
//    ]
// ]
```

<a name="method-array-except"></a>
#### `array_except()`

`array_except` 方法从数组中移除给定的键/值对：

```php
$array = ['name' => 'Desk', 'price' => 100];

$array = array_except($array, ['price']);

// ['name' => 'Desk']
```

<a name="method-array-first"></a>
#### `array_first()`

`array_first` 方法返回数组中通过给定真值测试的第一个元素：

```php
$array = [100, 200, 300];

$value = array_first($array, function ($key, $value) {
    return $value >= 150;
});

// 200
```

也可以将默认值作为第三个参数传递给该方法。如果没有值通过真值测试，将返回此值：

```php
$value = array_first($array, $callback, $default);
```

<a name="method-array-flatten"></a>
#### `array_flatten()`

`array_flatten` 方法将多维数组展平为单级数组。

```php
$array = ['name' => 'Joe', 'languages' => ['PHP', 'Ruby']];

$array = array_flatten($array);

// ['Joe', 'PHP', 'Ruby'];
```

<a name="method-array-forget"></a>
#### `array_forget()`

`array_forget` 方法使用"点"表示法从深度嵌套的数组中移除给定的键/值对：

```php
$array = ['products' => ['desk' => ['price' => 100]]];

array_forget($array, 'products.desk');

// ['products' => []]
```

<a name="method-array-get"></a>
#### `array_get()`

`array_get` 方法使用"点"表示法从深度嵌套的数组中获取值：

```php
$array = ['products' => ['desk' => ['price' => 100]]];

$value = array_get($array, 'products.desk');

// ['price' => 100]
```

`array_get` 函数还接受一个默认值，如果未找到指定的键，将返回该默认值：

```php
$value = array_get($array, 'names.john', 'default');
```

<a name="method-array-only"></a>
#### `array_only()`

`array_only` 方法将仅返回给定数组中指定的键/值对：

```php
$array = ['name' => 'Desk', 'price' => 100, 'orders' => 10];

$array = array_only($array, ['name', 'price']);

// ['name' => 'Desk', 'price' => 100]
```

<a name="method-array-pluck"></a>
#### `array_pluck()`

`array_pluck` 方法将从数组中提取给定键/值对的列表：

```php
$array = [
    ['developer' => ['name' => 'Brian']],
    ['developer' => ['name' => 'Stewie']]
];

$array = array_pluck($array, 'developer.name');

// ['Brian', 'Stewie'];
```

<a name="method-array-pull"></a>
#### `array_pull()`

`array_pull` 方法从数组中返回并移除一个键/值对：

```php
$array = ['name' => 'Desk', 'price' => 100];

$name = array_pull($array, 'name');

// $name: Desk

// $array: ['price' => 100]
```

<a name="method-array-set"></a>
#### `array_set()`

`array_set` 方法使用"点"表示法在深度嵌套的数组中设置值：

```php
$array = ['products' => ['desk' => ['price' => 100]]];

array_set($array, 'products.desk.price', 200);

// ['products' => ['desk' => ['price' => 200]]]
```

<a name="method-array-sort"></a>
#### `array_sort()`

`array_sort` 方法按给定闭包的结果对数组进行排序：

```php
$array = [
    ['name' => 'Desk'],
    ['name' => 'Chair'],
];

$array = array_values(array_sort($array, function ($value) {
    return $value['name'];
}));

/*
    [
        ['name' => 'Chair'],
        ['name' => 'Desk'],
    ]
*/
```

<a name="method-array-sort-recursive"></a>
#### `array_sort_recursive()`

`array_sort_recursive` 函数使用 `sort` 函数递归地对数组进行排序：

```php
$array = [
    [
        'Brian',
        'Shannon',
        'Alec',
    ],
    [
        'PHP',
        'Ruby',
        'JavaScript',
    ],
];

$array = array_sort_recursive($array);

/*
    [
        [
            'Alec',
            'Brian',
            'Shannon',
        ],
        [
            'JavaScript',
            'PHP',
            'Ruby',
        ]
    ];
*/
```

<a name="method-array-where"></a>
#### `array_where()`

`array_where` 函数使用给定的闭包过滤数组：

```php
$array = [100, '200', 300, '400', 500];

$array = array_where($array, function ($value, $key) {
    return is_string($value);
});

// [1 => 200, 3 => 400]
```

<a name="method-head"></a>
#### `head()`

`head` 函数简单地返回给定数组中的第一个元素：

```php
$array = [100, 200, 300];

$first = head($array);

// 100
```

<a name="method-last"></a>
#### `last()`

`last` 函数返回给定数组中的最后一个元素：

```php
$array = [100, 200, 300];

$last = last($array);

// 300
```

## 路径

<a name="path-symbols"></a>
#### 路径符号

路径前缀符号可用于创建动态路径。例如，以 `~/` 开头的路径将创建相对于应用程序的路径：

```yaml
list: ~/plugins/acme/pay/models/invoiceitem/columns.yaml
```

以下符号支持创建动态路径：

符号 | 描述
------------- | -------------
`$` | 相对于插件目录
`~` | 相对于应用程序目录
`#` | 相对于主题目录

<a name="method-app-path"></a>
#### `app_path()`

`app_path` 函数返回 `app` 目录的完整路径：

```php
$path = app_path();
```

你也可以使用 `app_path` 函数生成相对于应用程序目录的给定文件的完整路径：

```php
$path = app_path('Http/Controllers/Controller.php');
```

<a name="method-base-path"></a>
#### `base_path()`

`base_path` 函数返回项目根目录的完整路径：

```php
$path = base_path();
```

你也可以使用 `base_path` 函数生成相对于应用程序目录的给定文件的完整路径：

```php
$path = base_path('vendor/bin');
```

<a name="method-config-path"></a>
#### `config_path($path = '')`

`config_path` 函数返回应用程序配置目录的完整路径：

```php
$path = config_path();
```

你也可以使用 `config_path` 函数生成相对于配置目录的给定文件的完整路径：

```php
$path = config_path('dev/cms.php');
```

<a name="method-database-path"></a>
#### `database_path()`

`database_path` 函数返回应用程序数据库目录的完整路径：

```php
$path = database_path();
```

<a name="method-plugins-path"></a>
#### `plugins_path($path = '')`

`plugins_path` 函数返回应用程序插件目录的完整路径：

```php
$path = plugins_path();
```

你也可以使用 `plugins_path` 函数生成相对于插件目录的给定文件的完整路径：

```php
$path = plugins_path('author/plugin/routes.php');
```

<a name="method-public-path"></a>
#### `public_path()`

`public_path` 函数返回 `public` 目录的完整路径：

```php
$path = public_path();
```

<a name="method-storage-path"></a>
#### `storage_path($path = '')`

`storage_path` 函数返回 `storage` 目录的完整路径：

```php
$path = storage_path();
```

你也可以使用 `storage_path` 函数生成相对于存储目录的给定文件的完整路径：

```php
$path = storage_path('app/file.txt');
```

<a name="method-temp-path"></a>
#### `temp_path($path = '')`

`temp_path` 函数返回可写的临时文件目录的完整路径：

```php
$path = temp_path();
```

你也可以使用 `temp_path` 函数生成相对于临时目录的给定文件的完整路径：

```php
$path = temp_path('app/file.txt');
```

<a name="method-themes-path"></a>
#### `themes_path($path = '')`

`themes_path` 函数返回 `themes` 目录的完整路径：

```php
$path = themes_path();
```

你也可以使用 `themes_path` 函数生成相对于主题目录的给定文件的完整路径：

```php
$path = themes_path('mytheme/file.txt');
```

<a name="method-cache-path"></a>
#### `cache_path($path = '')`

`cache_path` 函数返回应用程序缓存目录的完整路径：

```php
$path = cache_path();
```

你也可以使用 `cache_path` 函数生成相对于缓存目录的给定文件的完整路径：

```php
$path = cache_path('cms/cachefile.json');
```

## 字符串

<a name="method-camel-case"></a>
#### `camel_case()`

`camel_case` 函数将给定的字符串转换为 `camelCase` 格式：

```php
$camel = camel_case('foo_bar');

// fooBar
```

<a name="method-class-basename"></a>
#### `class_basename()`

`class_basename` 返回给定类的类名（去除类的命名空间）：

```php
$class = class_basename('Foo\Bar\Baz');

// Baz
```

<a name="method-e"></a>
#### `e()`

`e` 函数对给定的字符串运行 `htmlentities`：

```php
echo e('<html>foo</html>');

// &lt;html&gt;foo&lt;/html&gt;
```

<a name="method-ends-with"></a>
#### `ends_with()`

`ends_with` 函数确定给定的字符串是否以给定的值结尾：

```php
$value = ends_with('This is my name', 'name');

// true
```

<a name="method-snake-case"></a>
#### `snake_case()`

`snake_case` 函数将给定的字符串转换为 `snake_case` 格式：

```php
$snake = snake_case('fooBar');

// foo_bar
```

<a name="method-str-limit"></a>
#### `str_limit()`

`str_limit` 函数限制字符串中的字符数。该函数接受字符串作为第一个参数，最大结果字符数作为第二个参数：

```php
$value = str_limit('The CMS platform that gets back to basics.', 6);

// The CMS...
```

<a name="method-starts-with"></a>
#### `starts_with()`

`starts_with` 函数确定给定的字符串是否以给定的值开头：

```php
$value = starts_with('The cow goes moo', 'The');

// true
```

<a name="method-str-contains"></a>
#### `str_contains()`

`str_contains` 函数确定给定的字符串是否包含给定的值：

```php
$value = str_contains('The bird goes tweet', 'bird');

// true
```

<a name="method-str-finish"></a>
#### `str_finish()`

`str_finish` 函数向字符串添加给定值的单个实例：

```php
$string = str_finish('this/string', '/');

// this/string/
```

<a name="method-str-is"></a>
#### `str_is()`

`str_is` 函数确定给定的字符串是否与给定的模式匹配。可以使用星号表示通配符：

```php
$value = str_is('foo*', 'foobar');

// true

$value = str_is('baz*', 'foobar');

// false
```

<a name="method-str-plural"></a>
#### `str_plural()`

`str_plural` 函数将字符串转换为其复数形式。此函数目前仅支持英语：

```php
$plural = str_plural('car');

// cars

$plural = str_plural('child');

// children
```

<a name="method-str-random"></a>
#### `str_random()`

`str_random` 函数生成指定长度的随机字符串：

```php
$string = str_random(40);
```

<a name="method-str-singular"></a>
#### `str_singular()`

`str_singular` 函数将字符串转换为其单数形式。此函数目前仅支持英语：

```php
$singular = str_singular('cars');

// car
```

<a name="method-str-slug"></a>
#### `str_slug()`

`str_slug` 函数从给定的字符串生成 URL 友好的 "slug"：

```php
$title = str_slug("October CMS", "-");

// october-cms
```

<a name="method-studly-case"></a>
#### `studly_case()`

`studly_case` 函数将给定的字符串转换为 `StudlyCase` 格式：

```php
$value = studly_case('foo_bar');

// FooBar
```

<a name="method-trans"></a>
#### `trans()`

`trans` 函数使用你的[本地化文件](../plugin/localization.md)翻译给定的语言行：

```php
echo trans('validation.required'):
```

<a name="method-trans-choice"></a>
#### `trans_choice()`

`trans_choice` 函数翻译带有词形变化的给定语言行：

```php
$value = trans_choice('foo.bar', $count);
```

## 其他

<a name="method-asset"></a>
#### `asset()`

使用当前请求的方案（HTTP 或 HTTPS）生成资源的 URL：

```php
$url = asset('img/photo.jpg');
```

<a name="method-config"></a>
#### `config()`

`config` 函数获取配置变量的值。可以使用"点"语法访问配置值，包括文件名和你要访问的选项。可以指定默认值，如果配置选项不存在，将返回该默认值：

```php
$value = config('app.timezone');

$value = config('app.timezone', $default);
```

`config` 助手也可以通过传递键/值对数组在运行时设置配置变量：

```php
config(['app.debug' => true]);
```

<a name="method-dd"></a>
#### `dd()`

`dd` 函数转储给定的变量并结束脚本执行：

```php
dd($value);
```

<a name="method-env"></a>
#### `env()`

`env` 函数获取环境变量的值或返回默认值：

```php
$env = env('APP_ENV');

// 如果变量不存在则返回默认值...
$env = env('APP_ENV', 'production');
```

<a name="method-input"></a>
#### `input()`

`input` 函数从所有请求值（包括文件）中获取输入项。

```php
$value = input('key', $default = null)
```

<a name="method-get"></a>
#### `get()`

`get` 函数从请求中获取输入项，仅限 GET 变量：

```php
$value = get('key', $default = null)
```

<a name="method-post"></a>
#### `post()`

`post` 函数从请求中获取输入项，仅限 POST 变量：

```php
$value = post('key', $default = null)
```

<a name="method-files"></a>
#### `files()`

`files` 函数从请求中获取文件项：

```php
$value = files('key', $default = null)
```

<a name="method-redirect"></a>
#### `redirect()`

`redirect` 函数返回重定向器的实例以执行[重定向响应](./response-view.md)：

```php
return redirect('/home');
```

<a name="method-request"></a>
#### `request()`

`request` 函数返回当前[请求实例](./request-input.md)：

```php
$referer = request()->header('referer');
```

<a name="method-response"></a>
#### `response()`

`response` 函数创建一个[响应](./response-view.md)实例或获取响应工厂的实例：

```php
return response('Hello World', 200, $headers);

return response()->json(['foo' => 'bar'], 200, $headers);
```

<a name="method-route"></a>
#### `route()`

`route` 函数为给定的[命名路由](../system/routing.md)生成 URL：

```php
$url = route('routeName');
```

如果路由接受参数，你可以将它们作为第二个参数传递给该方法：

```php
$url = route('routeName', ['id' => 1]);
```

<a name="method-secure-asset"></a>
#### `secure_asset()`

使用 HTTPS 生成资源的 URL：

```php
echo secure_asset('foo/bar.zip', $title, $attributes = []);
```

<a name="method-trace-log"></a>
#### `trace_log()`

`trace_log` 函数将跟踪消息写入日志文件。

```php
trace_log('This code has passed...');
```

该函数支持传递异常、数组和对象：

```php
trace_log($exception);

trace_log($array);

trace_log($object);
```

你也可以传递多个参数来跟踪多条消息：

```php
trace_log($value1, $value2, $exception, '...');
```

<a name="method-trace-sql"></a>
#### `trace_sql()`

`trace_sql` 函数启用数据库日志记录并开始监控所有 SQL 输出。

```php
trace_sql();

Db::table('users')->count();

// select count(*) as aggregate from users
```

<a name="method-url"></a>
#### `url()`

`url` 函数生成给定路径的完整 URL：

```php
echo url('user/profile');

echo url('user/profile', [1]);
```
