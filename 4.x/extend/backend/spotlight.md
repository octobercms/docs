---
subtitle: Search the backend panel and run commands from anywhere with Spotlight.
---
# Spotlight

Spotlight is a search palette for the backend panel. It finds pages, settings and records, and runs commands, without leaving the keyboard. Plugins can add their own commands and make their records searchable.

## Using Spotlight

Spotlight can be opened from any backend page in the following ways.

- Press the <kbd>/</kbd> key when the cursor is not in a text field.
- Press <kbd>Ctrl+K</kbd>, or <kbd>Cmd+K</kbd> on macOS.
- Click the search icon in the main menu, or the search field when using the [Horizon skin](./skins.md).

Before anything is typed, Spotlight suggests top-level navigation items along with the user's recently used items. As the user types, results from the following types are merged into a single list.

Type | Description
------------- | -------------
**Commands** | actions that run from the search, such as clearing the cache.
**Navigation** | main menu and side menu items.
**Settings** | items from the Settings area.
**Records** | results from record sources registered by plugins.

The search is case and accent insensitive. The typed words may appear in any order, and each word matches the beginning of a word in the result, so `pri` matches "Print". Matches in the title rank above matches in the description, which rank above matches in the synonyms.

Every result respects permissions, so users only see items they are able to access.

### Disabling Spotlight

Spotlight is enabled by default. It can be disabled by setting the `spotlight` value to `false` in the **config/backend.php** file.

```php
'spotlight' => false,
```

### Included Commands

The following commands are included.

Command | Description
------------- | -------------
**Clear Cache** | clears the application, configuration, route, view, event and theme caches. Requires the **Perform Software Updates** permission.
**Sign Out** | signs out of the backend panel.
**Toggle Light Switch** | switches the backend panel between light and dark mode. Requires the **Manage Backend Preferences** permission.
**Toggle Maintenance Mode** | turns maintenance mode on or off, the same setting found in **Settings → Maintenance Mode**. Requires the **Manage Maintenance Mode** permission.

## Registering Commands

Plugins register commands by overriding the `registerSpotlight` method of the [plugin registration file](../extending.md). The method returns an array where the `commands` key lists command classes, keyed by a unique identifier. The same method registers [record sources](#registering-record-sources) using the `sources` key.

```php
public function registerSpotlight()
{
    return [
        'commands' => [
            'rebuildSitemap' => \Acme\Blog\Spotlight\RebuildSitemap::class,
        ],
    ];
}
```

A command class extends `Backend\Classes\SpotlightManager\SpotlightCommand` and implements the `execute` method, which runs when the user selects the command. Commands are usually placed in a **spotlight** directory inside the plugin.

```php
namespace Acme\Blog\Spotlight;

use Acme\Blog\Classes\Sitemap;
use Backend\Classes\SpotlightManager;
use Backend\Classes\SpotlightManager\SpotlightCommand;
use Backend\Classes\SpotlightManager\SpotlightResponse;

class RebuildSitemap extends SpotlightCommand
{
    protected ?string $icon = 'ph ph-tree-structure';

    protected array $permissions = ['acme.blog.manage_sitemap'];

    public function __construct()
    {
        $this->name = __("Rebuild Sitemap");
        $this->description = __("Regenerate the XML sitemap");
        $this->synonyms = ['seo', 'xml'];
    }

    public function execute(SpotlightManager $manager, array $dependencies = []): array
    {
        Sitemap::rebuild();

        return SpotlightResponse::success(__("Sitemap rebuilt"));
    }
}
```

The following properties are available to command classes. Properties that display text should be set in the constructor so they can be translated.

Property | Description
------------- | -------------
**name** | the command title shown in the results, required.
**description** | a short description shown below the title.
**synonyms** | an array of alternative search terms that find the command.
**icon** | an icon CSS class for the command.
**permissions** | an array of permissions required to see and run the command. An empty array makes the command available to all backend users.

A command may also override the `shouldBeShown` method to hide itself based on its own conditions.

```php
public function shouldBeShown(): bool
{
    return Sitemap::isEnabled();
}
```

### Command Responses

The `execute` method returns a response built with the `Backend\Classes\SpotlightManager\SpotlightResponse` class.

Method | Description
------------- | -------------
**success($text)** | displays a success message.
**error($text)** | displays an error message.
**info($text)** | displays an information message.
**warning($text)** | displays a warning message.
**redirect($url, $target)** | sends the browser to a URL, where the target is `_self` (default) or `_blank`.
**event($name, $payload, $flash)** | dispatches a browser event with an optional flash message.

The message methods accept an optional second argument for the number of seconds the message is displayed, which defaults to 5.

The `event` response is used for custom client-side behavior. The payload is passed to listeners as the event detail, and the optional flash message is an array with `type` and `text` values.

```php
return SpotlightResponse::event('acme:sitemap-rebuilt', ['pages' => 42], [
    'type' => 'success',
    'text' => __("Sitemap rebuilt"),
]);
```

A script loaded on the backend page can then listen for the event.

```js
document.addEventListener('acme:sitemap-rebuilt', function(ev) {
    console.log(ev.detail.pages);
});
```

### Command Arguments

A command can ask the user for values before it runs by overriding the `dependencies` method. Each argument is a `SpotlightDependency` object, and the user resolves them one at a time in the order they are added. Pressing <kbd>Esc</kbd>, or <kbd>Backspace</kbd> in an empty field, returns to the previous step.

There are two types of argument.

Type | Description
------------- | -------------
**SpotlightDependency::SEARCH** | the user picks a value from search results.
**SpotlightDependency::INPUT** | the user types a value, which is validated before the command runs.

The following example asks the user to pick a post, then enter an email address to send it to.

```php
use Acme\Blog\Models\Post;
use Backend\Classes\SpotlightManager\SpotlightDependency;
use Backend\Classes\SpotlightManager\SpotlightDependencyList;
use Backend\Classes\SpotlightManager\SpotlightResult;

public function dependencies(): ?SpotlightDependencyList
{
    return SpotlightDependencyList::collection()
        ->add(
            SpotlightDependency::make('post')
                ->setTitle(__("Post"))
                ->setPlaceholder(__("Find a post to send..."))
                ->setType(SpotlightDependency::SEARCH)
        )
        ->add(
            SpotlightDependency::make('email')
                ->setTitle(__("Email Address"))
                ->setType(SpotlightDependency::INPUT)
                ->setValidation('required|email|max:255')
        );
}

public function searchPost(string $query): array
{
    return Post::where('title', 'like', "%{$query}%")
        ->limit(10)
        ->get()
        ->map(fn ($post) => new SpotlightResult($post->id, $post->title))
        ->all();
}

public function execute(SpotlightManager $manager, array $dependencies = []): array
{
    $post = Post::find($dependencies['post']);

    Mail::send('acme.blog::mail.post', ['post' => $post], function ($message) use ($dependencies) {
        $message->to($dependencies['email']);
    });

    return SpotlightResponse::success(__("Post sent"));
}
```

The results for a `SEARCH` argument come from a method on the command named after the argument identifier, so the `post` argument uses the `searchPost` method and a `target_site` argument uses the `searchTargetSite` method. The method receives the search query, followed by the values of any arguments already resolved.

```php
public function searchCategory(string $query, $postId): array
{
    // $postId is the value chosen for the earlier "post" argument
}
```

The resolved values are passed to the `execute` method, keyed by the argument identifier. A `SEARCH` argument provides the `id` of the chosen result, and an `INPUT` argument provides the typed text.

The following methods are available to configure an argument.

Method | Description
------------- | -------------
**setTitle** | sets the title shown to the user.
**setPlaceholder** | sets the placeholder text of the field.
**setType** | sets the argument type, either `SEARCH` (default) or `INPUT`.
**setValidation** | sets Laravel validation rules for an `INPUT` argument, for example `required|email`.
**setValidationMessage** | sets a single message used for any failing rule.
**setValidationMessages** | sets messages by rule name, supporting the `:attribute`, `:min`, `:max`, `:size` and `:digits` placeholders.

## Registering Record Sources

Plugins make their records searchable by listing source classes under the `sources` key of the `registerSpotlight` method, alongside any commands.

```php
public function registerSpotlight()
{
    return [
        'commands' => [
            'rebuildSitemap' => \Acme\Blog\Spotlight\RebuildSitemap::class,
        ],
        'sources' => [
            'blogPosts' => \Acme\Blog\Spotlight\Posts::class,
        ],
    ];
}
```

A source class extends `Backend\Classes\SpotlightManager\SpotlightSource` and implements the `search` method, which returns an array of results for the typed query. Every result should include a URL, which is opened when the user selects it. The `searchModel` helper searches the given model columns and passes each match to a callback that builds the result. Sources are placed in the same **spotlight** directory as commands.

```php
namespace Acme\Blog\Spotlight;

use Backend;
use Acme\Blog\Models\Post;
use Backend\Classes\SpotlightManager\SpotlightSource;
use Backend\Classes\SpotlightManager\SpotlightResult;

class Posts extends SpotlightSource
{
    protected ?string $icon = 'ph ph-article';

    protected array $permissions = ['acme.blog.access_posts'];

    public function __construct()
    {
        $this->label = __("Blog Posts");
    }

    public function search(string $query, int $limit = 10): array
    {
        return $this->searchModel(Post::class, ['title', 'slug'], $query, function ($post) {
            return (new SpotlightResult(
                $post->id,
                $post->title,
                $post->slug,
                Backend::url('acme/blog/posts/update/'.$post->id)
            ))->setMeta($post->published_at?->format('M j, Y') ?? '');
        }, $limit);
    }
}
```

The `searchModel` helper requires every typed word to appear in at least one of the columns. Sources can also run their own queries and return `SpotlightResult` objects directly.

The following properties are available to source classes.

Property | Description
------------- | -------------
**label** | the heading shown above the results from this source, required.
**icon** | an icon CSS class used for results without their own icon.
**permissions** | an array of permissions required to search this source. An empty array makes the source available to all backend users.
**scope** | a handle that groups the source with related sources, see [search scopes](#search-scopes).
**scopeLabel** | the label of the scope, defaults to the handle in title case.
**scopeIcon** | the icon CSS class of the scope.
**scopedOnly** | when `true`, the source is only searched inside its scope, default `false`.

::: tip
Record sources are searched on the server once at least two characters are typed, after the user pauses typing. Sources run in registration order within a 500 millisecond budget, and sources that have not started when the budget runs out are skipped for that query. A source that throws an exception is also skipped, so it cannot break the rest of the search.
:::

### Search Results

A `SpotlightResult` object is created with an identifier, a title, and optionally a description, URL, icon and an array of synonyms.

```php
new SpotlightResult($id, $title, $description, $url, $icon, $synonyms);
```

The following methods can also be used to set values after the result is created.

Method | Description
------------- | -------------
**setUrl** | sets the URL opened when the result is selected.
**setIcon** | sets the icon CSS class.
**setSynonyms** | sets an array of alternative search terms.
**setMeta** | sets a short label shown on the right side of the result, such as a date or an amount.

### Searching In-Memory Data

The `searchArray` helper searches an array of rows using the same matching and ranking rules as Spotlight itself, which is useful when the data is not stored in a model. Each row supports the `id`, `title`, `description`, `synonyms`, `url`, `icon` and `meta` keys.

```php
public function search(string $query, int $limit = 10): array
{
    $rows = [
        ['id' => 'orders', 'title' => 'Order Report', 'url' => Backend::url('acme/shop/reports/orders')],
        ['id' => 'stock', 'title' => 'Stock Report', 'url' => Backend::url('acme/shop/reports/stock')],
    ];

    return $this->searchArray($rows, $query, $limit);
}
```

### Search Scopes

Sources that share the same `scope` handle are grouped into a search scope. The user enters a scope by typing the `in:` prefix followed by the handle, such as `in:blog`, or by selecting the scope in the results. Inside a scope, only the sources of that scope are searched, and navigation, settings and commands are limited to the plugin that owns the scope.

```php
class Posts extends SpotlightSource
{
    protected ?string $scope = 'blog';

    public function __construct()
    {
        $this->label = __("Blog Posts");
        $this->scopeLabel = __("Blog");
    }
}
```

Set the `scopedOnly` property to `true` for sources that are expensive to search. These sources are left out of the global search and only run when the user is inside their scope.

## Registering Dynamically

Commands and sources may also be registered using the `backend.spotlight.extendItems` event, which is useful when registration depends on conditions. The last argument is the owner code of the registering plugin.

```php
Event::listen('backend.spotlight.extendItems', function ($manager) {
    $manager->registerCommand('rebuildSitemap', \Acme\Blog\Spotlight\RebuildSitemap::class, 'Acme.Blog');
    $manager->registerSource('blogPosts', \Acme\Blog\Spotlight\Posts::class, 'Acme.Blog');
});
```

::: also
* [Navigation](./navigation.md)
* [Permissions](./permissions.md)
* [Skins](./skins.md)
:::
