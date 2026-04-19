# Хелперы

October CMS включает множество вспомогательных PHP-функций («хелперов»). Многие из этих функций используются внутренне самим October, однако вы можете свободно использовать их в своих плагинах и приложениях, если найдёте их полезными.

### Массивы

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

### Пути

<div class="content-list-p" markdown="1">

[Символы путей](#path-symbols)
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

### Строки

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

### Разное

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

## Массивы

<a name="method-array-add"></a>
#### `array_add()`

Функция `array_add` добавляет заданную пару ключ/значение в массив, если данный ключ ещё не существует в массиве:

```php
$array = array_add(['name' => 'Desk'], 'price', 100);

// ['name' => 'Desk', 'price' => 100]
```

<a name="method-array-divide"></a>
#### `array_divide()`

Функция `array_divide` возвращает два массива: один содержит ключи, а другой — значения исходного массива:

```php
list($keys, $values) = array_divide(['name' => 'Desk']);

// $keys: ['name']

// $values: ['Desk']
```

<a name="method-array-dot"></a>
#### `array_dot()`

Функция `array_dot` сворачивает многомерный массив в одноуровневый массив, используя «точечную» нотацию для обозначения глубины:

```php
$array = array_dot(['foo' => ['bar' => 'baz']]);

// ['foo.bar' => 'baz'];
```

<a name="method-array-undot"></a>
#### `array_undot()`

Функция `array_undot` является обратной к методу `array_dot`. Она преобразует массив с точечной нотацией в стандартный ассоциативный массив:

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

Метод `array_except` удаляет заданные пары ключ/значение из массива:

```php
$array = ['name' => 'Desk', 'price' => 100];

$array = array_except($array, ['price']);

// ['name' => 'Desk']
```

<a name="method-array-first"></a>
#### `array_first()`

Метод `array_first` возвращает первый элемент массива, прошедший заданный тест на истинность:

```php
$array = [100, 200, 300];

$value = array_first($array, function ($key, $value) {
    return $value >= 150;
});

// 200
```

Значение по умолчанию также может быть передано третьим параметром метода. Это значение будет возвращено, если ни одно значение не пройдёт тест на истинность:

```php
$value = array_first($array, $callback, $default);
```

<a name="method-array-flatten"></a>
#### `array_flatten()`

Метод `array_flatten` сворачивает многомерный массив в одноуровневый.

```php
$array = ['name' => 'Joe', 'languages' => ['PHP', 'Ruby']];

$array = array_flatten($array);

// ['Joe', 'PHP', 'Ruby'];
```

<a name="method-array-forget"></a>
#### `array_forget()`

Метод `array_forget` удаляет заданную пару ключ/значение из глубоко вложенного массива, используя «точечную» нотацию:

```php
$array = ['products' => ['desk' => ['price' => 100]]];

array_forget($array, 'products.desk');

// ['products' => []]
```

<a name="method-array-get"></a>
#### `array_get()`

Метод `array_get` извлекает значение из глубоко вложенного массива, используя «точечную» нотацию:

```php
$array = ['products' => ['desk' => ['price' => 100]]];

$value = array_get($array, 'products.desk');

// ['price' => 100]
```

Функция `array_get` также принимает значение по умолчанию, которое будет возвращено, если указанный ключ не найден:

```php
$value = array_get($array, 'names.john', 'default');
```

<a name="method-array-only"></a>
#### `array_only()`

Метод `array_only` вернёт только указанные пары ключ/значение из заданного массива:

```php
$array = ['name' => 'Desk', 'price' => 100, 'orders' => 10];

$array = array_only($array, ['name', 'price']);

// ['name' => 'Desk', 'price' => 100]
```

<a name="method-array-pluck"></a>
#### `array_pluck()`

Метод `array_pluck` извлекает список заданных пар ключ/значение из массива:

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

Метод `array_pull` возвращает и удаляет пару ключ/значение из массива:

```php
$array = ['name' => 'Desk', 'price' => 100];

$name = array_pull($array, 'name');

// $name: Desk

// $array: ['price' => 100]
```

<a name="method-array-set"></a>
#### `array_set()`

Метод `array_set` устанавливает значение в глубоко вложенном массиве, используя «точечную» нотацию:

```php
$array = ['products' => ['desk' => ['price' => 100]]];

array_set($array, 'products.desk.price', 200);

// ['products' => ['desk' => ['price' => 200]]]
```

<a name="method-array-sort"></a>
#### `array_sort()`

Метод `array_sort` сортирует массив по результатам заданного Closure:

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

Функция `array_sort_recursive` рекурсивно сортирует массив с помощью функции `sort`:

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

Функция `array_where` фильтрует массив с помощью заданного Closure:

```php
$array = [100, '200', 300, '400', 500];

$array = array_where($array, function ($value, $key) {
    return is_string($value);
});

// [1 => 200, 3 => 400]
```

<a name="method-head"></a>
#### `head()`

Функция `head` просто возвращает первый элемент заданного массива:

```php
$array = [100, 200, 300];

$first = head($array);

// 100
```

<a name="method-last"></a>
#### `last()`

Функция `last` возвращает последний элемент заданного массива:

```php
$array = [100, 200, 300];

$last = last($array);

// 300
```

## Пути

<a name="path-symbols"></a>
#### Символы путей

Символы-префиксы путей могут использоваться для создания динамического пути. Например, путь, начинающийся с `~/`, создаст путь относительно приложения:

```yaml
list: ~/plugins/acme/pay/models/invoiceitem/columns.yaml
```

Поддерживаются следующие символы для создания динамических путей:

Символ | Описание
------------- | -------------
`$` | Относительно директории плагинов
`~` | Относительно директории приложения
`#` | Относительно директории тем

<a name="method-app-path"></a>
#### `app_path()`

Функция `app_path` возвращает полный путь к директории `app`:

```php
$path = app_path();
```

Вы также можете использовать функцию `app_path` для генерации полного пути к файлу относительно директории приложения:

```php
$path = app_path('Http/Controllers/Controller.php');
```

<a name="method-base-path"></a>
#### `base_path()`

Функция `base_path` возвращает полный путь к корню проекта:

```php
$path = base_path();
```

Вы также можете использовать функцию `base_path` для генерации полного пути к файлу относительно директории приложения:

```php
$path = base_path('vendor/bin');
```

<a name="method-config-path"></a>
#### `config_path($path = '')`

Функция `config_path` возвращает полный путь к директории конфигурации приложения:

```php
$path = config_path();
```

Вы также можете использовать функцию `config_path` для генерации полного пути к файлу относительно директории конфигурации:

```php
$path = config_path('dev/cms.php');
```

<a name="method-database-path"></a>
#### `database_path()`

Функция `database_path` возвращает полный путь к директории базы данных приложения:

```php
$path = database_path();
```

<a name="method-plugins-path"></a>
#### `plugins_path($path = '')`

Функция `plugins_path` возвращает полный путь к директории плагинов приложения:

```php
$path = plugins_path();
```

Вы также можете использовать функцию `plugins_path` для генерации полного пути к файлу относительно директории плагинов:

```php
$path = plugins_path('author/plugin/routes.php');
```

<a name="method-public-path"></a>
#### `public_path()`

Функция `public_path` возвращает полный путь к директории `public`:

```php
$path = public_path();
```

<a name="method-storage-path"></a>
#### `storage_path($path = '')`

Функция `storage_path` возвращает полный путь к директории `storage`:

```php
$path = storage_path();
```

Вы также можете использовать функцию `storage_path` для генерации полного пути к файлу относительно директории хранилища:

```php
$path = storage_path('app/file.txt');
```

<a name="method-temp-path"></a>
#### `temp_path($path = '')`

Функция `temp_path` возвращает полный путь к директории с правами на запись для временных файлов:

```php
$path = temp_path();
```

Вы также можете использовать функцию `temp_path` для генерации полного пути к файлу относительно директории временных файлов:

```php
$path = temp_path('app/file.txt');
```

<a name="method-themes-path"></a>
#### `themes_path($path = '')`

Функция `themes_path` возвращает полный путь к директории `themes`:

```php
$path = themes_path();
```

Вы также можете использовать функцию `themes_path` для генерации полного пути к файлу относительно директории тем:

```php
$path = themes_path('mytheme/file.txt');
```

<a name="method-cache-path"></a>
#### `cache_path($path = '')`

Функция `cache_path` возвращает полный путь к директории кэша приложения:

```php
$path = cache_path();
```

Вы также можете использовать функцию `cache_path` для генерации полного пути к файлу относительно директории кэша:

```php
$path = cache_path('cms/cachefile.json');
```

## Строки

<a name="method-camel-case"></a>
#### `camel_case()`

Функция `camel_case` преобразует заданную строку в `camelCase`:

```php
$camel = camel_case('foo_bar');

// fooBar
```

<a name="method-class-basename"></a>
#### `class_basename()`

Функция `class_basename` возвращает имя класса без пространства имён:

```php
$class = class_basename('Foo\Bar\Baz');

// Baz
```

<a name="method-e"></a>
#### `e()`

Функция `e` выполняет `htmlentities` над заданной строкой:

```php
echo e('<html>foo</html>');

// &lt;html&gt;foo&lt;/html&gt;
```

<a name="method-ends-with"></a>
#### `ends_with()`

Функция `ends_with` определяет, заканчивается ли заданная строка заданным значением:

```php
$value = ends_with('This is my name', 'name');

// true
```

<a name="method-snake-case"></a>
#### `snake_case()`

Функция `snake_case` преобразует заданную строку в `snake_case`:

```php
$snake = snake_case('fooBar');

// foo_bar
```

<a name="method-str-limit"></a>
#### `str_limit()`

Функция `str_limit` ограничивает количество символов в строке. Функция принимает строку в качестве первого аргумента и максимальное количество результирующих символов в качестве второго аргумента:

```php
$value = str_limit('The CMS platform that gets back to basics.', 6);

// The CMS...
```

<a name="method-starts-with"></a>
#### `starts_with()`

Функция `starts_with` определяет, начинается ли заданная строка с заданного значения:

```php
$value = starts_with('The cow goes moo', 'The');

// true
```

<a name="method-str-contains"></a>
#### `str_contains()`

Функция `str_contains` определяет, содержит ли заданная строка заданное значение:

```php
$value = str_contains('The bird goes tweet', 'bird');

// true
```

<a name="method-str-finish"></a>
#### `str_finish()`

Функция `str_finish` добавляет один экземпляр заданного значения к строке:

```php
$string = str_finish('this/string', '/');

// this/string/
```

<a name="method-str-is"></a>
#### `str_is()`

Функция `str_is` определяет, соответствует ли заданная строка заданному шаблону. Звёздочки могут использоваться для обозначения подстановочных знаков:

```php
$value = str_is('foo*', 'foobar');

// true

$value = str_is('baz*', 'foobar');

// false
```

<a name="method-str-plural"></a>
#### `str_plural()`

Функция `str_plural` преобразует строку в форму множественного числа. Эта функция в настоящее время поддерживает только английский язык:

```php
$plural = str_plural('car');

// cars

$plural = str_plural('child');

// children
```

<a name="method-str-random"></a>
#### `str_random()`

Функция `str_random` генерирует случайную строку указанной длины:

```php
$string = str_random(40);
```

<a name="method-str-singular"></a>
#### `str_singular()`

Функция `str_singular` преобразует строку в форму единственного числа. Эта функция в настоящее время поддерживает только английский язык:

```php
$singular = str_singular('cars');

// car
```

<a name="method-str-slug"></a>
#### `str_slug()`

Функция `str_slug` генерирует дружественный для URL «slug» из заданной строки:

```php
$title = str_slug("October CMS", "-");

// october-cms
```

<a name="method-studly-case"></a>
#### `studly_case()`

Функция `studly_case` преобразует заданную строку в `StudlyCase`:

```php
$value = studly_case('foo_bar');

// FooBar
```

<a name="method-trans"></a>
#### `trans()`

Функция `trans` переводит заданную языковую строку с использованием ваших [файлов локализации](../plugin/localization.md):

```php
echo trans('validation.required'):
```

<a name="method-trans-choice"></a>
#### `trans_choice()`

Функция `trans_choice` переводит заданную языковую строку с учётом склонения:

```php
$value = trans_choice('foo.bar', $count);
```

## Разное

<a name="method-asset"></a>
#### `asset()`

Генерирует URL для ресурса, используя текущую схему запроса (HTTP или HTTPS):

```php
$url = asset('img/photo.jpg');
```

<a name="method-config"></a>
#### `config()`

Функция `config` получает значение конфигурационной переменной. Доступ к значениям конфигурации осуществляется с помощью «точечной» нотации, которая включает имя файла и параметр, к которому вы хотите получить доступ. Может быть указано значение по умолчанию, которое возвращается, если параметр конфигурации не существует:

```php
$value = config('app.timezone');

$value = config('app.timezone', $default);
```

Хелпер `config` также может использоваться для установки конфигурационных переменных во время выполнения путём передачи массива пар ключ/значение:

```php
config(['app.debug' => true]);
```

<a name="method-dd"></a>
#### `dd()`

Функция `dd` выводит заданную переменную и завершает выполнение скрипта:

```php
dd($value);
```

<a name="method-env"></a>
#### `env()`

Функция `env` получает значение переменной окружения или возвращает значение по умолчанию:

```php
$env = env('APP_ENV');

// Return a default value if the variable doesn't exist...
$env = env('APP_ENV', 'production');
```

<a name="method-input"></a>
#### `input()`

Функция `input` получает элемент ввода из всех значений запроса, включая файлы.

```php
$value = input('key', $default = null)
```

<a name="method-get"></a>
#### `get()`

Функция `get` получает элемент ввода из запроса, ограниченный только GET-переменными:

```php
$value = get('key', $default = null)
```

<a name="method-post"></a>
#### `post()`

Функция `post` получает элемент ввода из запроса, ограниченный только POST-переменными:

```php
$value = post('key', $default = null)
```

<a name="method-files"></a>
#### `files()`

Функция `files` получает элемент файла из запроса:

```php
$value = files('key', $default = null)
```

<a name="method-redirect"></a>
#### `redirect()`

Функция `redirect` возвращает экземпляр редиректора для выполнения [ответов-перенаправлений](./response-view.md):

```php
return redirect('/home');
```

<a name="method-request"></a>
#### `request()`

Функция `request` возвращает текущий [экземпляр запроса](./request-input.md):

```php
$referer = request()->header('referer');
```

<a name="method-response"></a>
#### `response()`

Функция `response` создаёт экземпляр [ответа](./response-view.md) или получает экземпляр фабрики ответов:

```php
return response('Hello World', 200, $headers);

return response()->json(['foo' => 'bar'], 200, $headers);
```

<a name="method-route"></a>
#### `route()`

Функция `route` генерирует URL для заданного [именованного маршрута](../system/routing.md):

```php
$url = route('routeName');
```

Если маршрут принимает параметры, вы можете передать их в качестве второго аргумента метода:

```php
$url = route('routeName', ['id' => 1]);
```

<a name="method-secure-asset"></a>
#### `secure_asset()`

Генерирует URL для ресурса с использованием HTTPS:

```php
echo secure_asset('foo/bar.zip', $title, $attributes = []);
```

<a name="method-trace-log"></a>
#### `trace_log()`

Функция `trace_log` записывает сообщение трассировки в лог-файл.

```php
trace_log('This code has passed...');
```

Функция поддерживает передачу исключений, массивов и объектов:

```php
trace_log($exception);

trace_log($array);

trace_log($object);
```

Вы также можете передать несколько аргументов для трассировки нескольких сообщений:

```php
trace_log($value1, $value2, $exception, '...');
```

<a name="method-trace-sql"></a>
#### `trace_sql()`

Функция `trace_sql` включает логирование базы данных и начинает отслеживать все SQL-запросы.

```php
trace_sql();

Db::table('users')->count();

// select count(*) as aggregate from users
```

<a name="method-url"></a>
#### `url()`

Функция `url` генерирует полностью определённый URL для заданного пути:

```php
echo url('user/profile');

echo url('user/profile', [1]);
```
