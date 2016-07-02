# Helpers

October includes a variety of "helper" PHP functions. Many of these functions are used internally by October itself, however, you are free to use them in your own plugins and applications if you find them useful.

<style>
    .collection-method-list > p {
        column-count: 3; -moz-column-count: 3; -webkit-column-count: 3;
        column-gap: 2em; -moz-column-gap: 2em; -webkit-column-gap: 2em;
    }

    .collection-method-list a {
        display: block;
    }
</style>

### Arrays

<div class="collection-method-list" markdown="1">
[array_add](#method-array-add)
[array_divide](#method-array-divide)
[array_dot](#method-array-dot)
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

### Paths

<div class="collection-method-list" markdown="1">
[app_path](#method-app-path)
[base_path](#method-base-path)
[config_path](#method-config-path)
[database_path](#method-database-path)
[plugins_path](#method-plugins-path)
[public_path](#method-public-path)
[storage_path](#method-storage-path)
[temp_path](#method-temp-path)
[themes_path](#method-themes-path)
[uploads_path](#method-uploads-path)
</div>

### Strings

<div class="collection-method-list" markdown="1">
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

### Miscellaneous

<div class="collection-method-list" markdown="1">
[asset](#method-asset)
[config](#method-config)
[dd](#method-dd)
[env](#method-env)
[get](#method-get)
[input](#method-input)
[post](#method-post)
[redirect](#method-redirect)
[request](#method-request)
[response](#method-response)
[route](#method-route)
[secure_asset](#method-secure-asset)
[trace_log](#method-trace-log)
[trace_sql](#method-trace-sql)
[url](#method-url)
</div>

<style>
    #collection-method code {
        font-size: 14px;
    }

    #collection-method:not(.first-collection-method) {
        margin-top: 50px;
    }
</style>

<a name="arrays"></a>
## Arrays

<a name="method-array-add"></a>
#### `array_add()` {#collection-method .first-collection-method}

The `array_add` function adds a given key / value pair to the array if the given key doesn't already exist in the array:

    $array = array_add(['name' => 'Desk'], 'price', 100);

    // ['name' => 'Desk', 'price' => 100]

<a name="method-array-divide"></a>
#### `array_divide()` {#collection-method}

The `array_divide` function returns two arrays, one containing the keys, and the other containing the values of the original array:

    list($keys, $values) = array_divide(['name' => 'Desk']);

    // $keys: ['name']

    // $values: ['Desk']

<a name="method-array-dot"></a>
#### `array_dot()` {#collection-method}

The `array_dot` function flattens a multi-dimensional array into a single level array that uses "dot" notation to indicate depth:

    $array = array_dot(['foo' => ['bar' => 'baz']]);

    // ['foo.bar' => 'baz'];

<a name="method-array-except"></a>
#### `array_except()` {#collection-method}

The `array_except` method removes the given key / value pairs from the array:

    $array = ['name' => 'Desk', 'price' => 100];

    $array = array_except($array, ['price']);

    // ['name' => 'Desk']

<a name="method-array-first"></a>
#### `array_first()` {#collection-method}

The `array_first` method returns the first element of an array passing a given truth test:

    $array = [100, 200, 300];

    $value = array_first($array, function ($key, $value) {
        return $value >= 150;
    });

    // 200

A default value may also be passed as the third parameter to the method. This value will be returned if no value passes the truth test:

    $value = array_first($array, $callback, $default);

<a name="method-array-flatten"></a>
#### `array_flatten()` {#collection-method}

The `array_flatten` method will flatten a multi-dimensional array into a single level.

    $array = ['name' => 'Joe', 'languages' => ['PHP', 'Ruby']];

    $array = array_flatten($array);

    // ['Joe', 'PHP', 'Ruby'];

<a name="method-array-forget"></a>
#### `array_forget()` {#collection-method}

The `array_forget` method removes a given key / value pair from a deeply nested array using "dot" notation:

    $array = ['products' => ['desk' => ['price' => 100]]];

    array_forget($array, 'products.desk');

    // ['products' => []]

<a name="method-array-get"></a>
#### `array_get()` {#collection-method}

The `array_get` method retrieves a value from a deeply nested array using "dot" notation:

    $array = ['products' => ['desk' => ['price' => 100]]];

    $value = array_get($array, 'products.desk');

    // ['price' => 100]

The `array_get` function also accepts a default value, which will be returned if the specific key is not found:

    $value = array_get($array, 'names.john', 'default');

<a name="method-array-only"></a>
#### `array_only()` {#collection-method}

The `array_only` method will return only the specified key / value pairs from the given array:

    $array = ['name' => 'Desk', 'price' => 100, 'orders' => 10];

    $array = array_only($array, ['name', 'price']);

    // ['name' => 'Desk', 'price' => 100]

<a name="method-array-pluck"></a>
#### `array_pluck()` {#collection-method}

The `array_pluck` method will pluck a list of the given key / value pairs from the array:

    $array = [
        ['developer' => ['name' => 'Brian']],
        ['developer' => ['name' => 'Stewie']]
    ];

    $array = array_pluck($array, 'developer.name');

    // ['Brian', 'Stewie'];

<a name="method-array-pull"></a>
#### `array_pull()` {#collection-method}

The `array_pull` method returns and removes a key / value pair from the array:

    $array = ['name' => 'Desk', 'price' => 100];

    $name = array_pull($array, 'name');

    // $name: Desk

    // $array: ['price' => 100]

<a name="method-array-set"></a>
#### `array_set()` {#collection-method}

The `array_set` method sets a value within a deeply nested array using "dot" notation:

    $array = ['products' => ['desk' => ['price' => 100]]];

    array_set($array, 'products.desk.price', 200);

    // ['products' => ['desk' => ['price' => 200]]]

<a name="method-array-sort"></a>
#### `array_sort()` {#collection-method}

The `array_sort` method sorts the array by the results of the given Closure:

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

<a name="method-array-sort-recursive"></a>
#### `array_sort_recursive()` {#collection-method}

The `array_sort_recursive` function recursively sorts the array using the `sort` function:

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

<a name="method-array-where"></a>
#### `array_where()` {#collection-method}

The `array_where` function filters the array using the given Closure:

    $array = [100, '200', 300, '400', 500];

    $array = array_where($array, function ($key, $value) {
        return is_string($value);
    });

    // [1 => 200, 3 => 400]

<a name="method-head"></a>
#### `head()` {#collection-method}

The `head` function simply returns the first element in the given array:

    $array = [100, 200, 300];

    $first = head($array);

    // 100

<a name="method-last"></a>
#### `last()` {#collection-method}

The `last` function returns the last element in the given array:

    $array = [100, 200, 300];

    $last = last($array);

    // 300

<a name="paths"></a>
## Paths

<a name="method-app-path"></a>
#### `app_path()` {#collection-method}

The `app_path` function returns the fully qualified path to the `app` directory:

    $path = app_path();

You may also use the `app_path` function to generate a fully qualified path to a given file relative to the application directory:

    $path = app_path('Http/Controllers/Controller.php');

<a name="method-base-path"></a>
#### `base_path()` {#collection-method}

The `base_path` function returns the fully qualified path to the project root:

    $path = base_path();

You may also use the `base_path` function to generate a fully qualified path to a given file relative to the application directory:

    $path = base_path('vendor/bin');

<a name="method-config-path"></a>
#### `config_path()` {#collection-method}

The `config_path` function returns the fully qualified path to the application configuration directory:

    $path = config_path();

<a name="method-database-path"></a>
#### `database_path()` {#collection-method}

The `database_path` function returns the fully qualified path to the application's database directory:

    $path = database_path();

<a name="method-plugins-path"></a>
#### `plugins_path()` {#collection-method}

The `plugins_path` function returns the fully qualified path to the application plugin directory:

    $path = plugins_path();

<a name="method-public-path"></a>
#### `public_path()` {#collection-method}

The `public_path` function returns the fully qualified path to the `public` directory:

    $path = public_path();

<a name="method-storage-path"></a>
#### `storage_path()` {#collection-method}

The `storage_path` function returns the fully qualified path to the `storage` directory:

    $path = storage_path();

You may also use the `storage_path` function to generate a fully qualified path to a given file relative to the storage directory:

    $path = storage_path('app/file.txt');

<a name="method-temp-path"></a>
#### `temp_path()` {#collection-method}

The `temp_path` function returns the fully qualified path to a writable directory for temporary files:

    $path = temp_path();

<a name="method-themes-path"></a>
#### `themes_path()` {#collection-method}

The `themes_path` function returns the fully qualified path to the `themes` directory:

    $path = themes_path();

<a name="method-uploads-path"></a>
#### `uploads_path()` {#collection-method}

The `uploads_path` function returns the fully qualified path to the application uploads directory:

    $path = uploads_path();

<a name="strings"></a>
## Strings

<a name="method-camel-case"></a>
#### `camel_case()` {#collection-method}

The `camel_case` function converts the given string to `camelCase`:

    $camel = camel_case('foo_bar');

    // fooBar

<a name="method-class-basename"></a>
#### `class_basename()` {#collection-method}

The `class_basename` returns the class name of the given class with the class' namespace removed:

    $class = class_basename('Foo\Bar\Baz');

    // Baz

<a name="method-e"></a>
#### `e()` {#collection-method}

The `e` function runs `htmlentities` over the given string:

    echo e('<html>foo</html>');

    // &lt;html&gt;foo&lt;/html&gt;

<a name="method-ends-with"></a>
#### `ends_with()` {#collection-method}

The `ends_with` function determines if the given string ends with the given value:

    $value = ends_with('This is my name', 'name');

    // true

<a name="method-snake-case"></a>
#### `snake_case()` {#collection-method}

The `snake_case` function converts the given string to `snake_case`:

    $snake = snake_case('fooBar');

    // foo_bar

<a name="method-str-limit"></a>
#### `str_limit()` {#collection-method}

The `str_limit` function limits the number of characters in a string. The function accepts a string as its first argument and the maximum number of resulting characters as its second argument:

    $value = str_limit('The CMS platform that gets back to basics.', 6);

    // The CMS...

<a name="method-starts-with"></a>
#### `starts_with()` {#collection-method}

The `starts_with` function determines if the given string begins with the given value:

    $value = starts_with('The cow goes moo', 'The');

    // true

<a name="method-str-contains"></a>
#### `str_contains()` {#collection-method}

The `str_contains` function determines if the given string contains the given value:

    $value = str_contains('The bird goes tweet', 'bird');

    // true

<a name="method-str-finish"></a>
#### `str_finish()` {#collection-method}

The `str_finish` function adds a single instance of the given value to a string:

    $string = str_finish('this/string', '/');

    // this/string/

<a name="method-str-is"></a>
#### `str_is()` {#collection-method}

The `str_is` function determines if a given string matches a given pattern. Asterisks may be used to indicate wildcards:

    $value = str_is('foo*', 'foobar');

    // true

    $value = str_is('baz*', 'foobar');

    // false

<a name="method-str-plural"></a>
#### `str_plural()` {#collection-method}

The `str_plural` function converts a string to its plural form. This function currently only supports the English language:

    $plural = str_plural('car');

    // cars

    $plural = str_plural('child');

    // children

<a name="method-str-random"></a>
#### `str_random()` {#collection-method}

The `str_random` function generates a random string of the specified length:

    $string = str_random(40);

<a name="method-str-singular"></a>
#### `str_singular()` {#collection-method}

The `str_singular` function converts a string to its singular form. This function currently only supports the English language:

    $singular = str_singular('cars');

    // car

<a name="method-str-slug"></a>
#### `str_slug()` {#collection-method}

The `str_slug` function generates a URL friendly "slug" from the given string:

    $title = str_slug("October CMS", "-");

    // october-cms

<a name="method-studly-case"></a>
#### `studly_case()` {#collection-method}

The `studly_case` function converts the given string to `StudlyCase`:

    $value = studly_case('foo_bar');

    // FooBar

<a name="method-trans"></a>
#### `trans()` {#collection-method}

The `trans` function translates the given language line using your [localization files](../plugin/localization):

    echo trans('validation.required'):

<a name="method-trans-choice"></a>
#### `trans_choice()` {#collection-method}

The `trans_choice` function translates the given language line with inflection:

    $value = trans_choice('foo.bar', $count);

<a name="miscellaneous"></a>
## Miscellaneous

<a name="method-asset"></a>
#### `asset()` {#collection-method}

Generate a URL for an asset using the current scheme of the request (HTTP or HTTPS):

    $url = asset('img/photo.jpg');

<a name="method-config"></a>
#### `config()` {#collection-method}

The `config` function gets the value of a configuration variable. The configuration values may be accessed using "dot" syntax, which includes the name of the file and the option you wish to access. A default value may be specified and is returned if the configuration option does not exist:

    $value = config('app.timezone');

    $value = config('app.timezone', $default);

The `config` helper may also be used to set configuration variables at runtime by passing an array of key / value pairs:

    config(['app.debug' => true]);

<a name="method-dd"></a>
#### `dd()` {#collection-method}

The `dd` function dumps the given variable and ends execution of the script:

    dd($value);

<a name="method-env"></a>
#### `env()` {#collection-method}

The `env` function gets the value of an environment variable or returns a default value:

    $env = env('APP_ENV');

    // Return a default value if the variable doesn't exist...
    $env = env('APP_ENV', 'production');

<a name="method-get"></a>
#### `get()` {#collection-method}

The `get` function obtains an input item from the request, restricted to GET variables only:

    $value = get('key', $default = null)

<a name="method-input"></a>
#### `input()` {#collection-method}

The `input` function obtains an input item from the request:

    $value = input('key', $default = null)

<a name="method-post"></a>
#### `post()` {#collection-method}

The `post` function obtains an input item from the request, restricted to POST variables only:

    $value = post('key', $default = null)

<a name="method-redirect"></a>
#### `redirect()` {#collection-method}

The `redirect` function return an instance of the redirector to do [redirect responses](../services/response-view#redirects):

    return redirect('/home');

<a name="method-request"></a>
#### `request()` {#collection-method}

The `request` function returns the current [request instance](../services/request-input):

    $referer = request()->header('referer');

<a name="method-response"></a>
#### `response()` {#collection-method}

The `response` function creates a [response](../services/response-view) instance or obtains an instance of the response factory:

    return response('Hello World', 200, $headers);

    return response()->json(['foo' => 'bar'], 200, $headers);

<a name="method-route"></a>
#### `route()` {#collection-method}

The `route` function generates a URL for the given [named route](../services/router):

    $url = route('routeName');

If the route accepts parameters, you may pass them as the second argument to the method:

    $url = route('routeName', ['id' => 1]);

<a name="method-secure-asset"></a>
#### `secure_asset()` {#collection-method}

Generate a URL for an asset using HTTPS:

    echo secure_asset('foo/bar.zip', $title, $attributes = []);

<a name="method-trace-log"></a>
#### `trace_log()` {#collection-method}

The `trace_log` function writes a trace message to the log file.

    trace_log('This code has passed...');

The function supports passing exceptions, arrays and objects:

    trace_log($exception);

    trace_log($array);

    trace_log($object);

You may also pass multiple arguments to trace multiple messages:

    trace_log($value1, $value2, $exception, '...');

<a name="method-trace-log"></a>
#### `trace_sql()` {#collection-method}

The `trace_sql` function enables database logging and begins to monitor all SQL output.

    trace_sql();

    Db::table('users')->count();

    // select count(*) as aggregate from users

<a name="method-url"></a>
#### `url()` {#collection-method}

The `url` function generates a fully qualified URL to the given path:

    echo url('user/profile');

    echo url('user/profile', [1]);
