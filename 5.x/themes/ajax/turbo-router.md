---
previousPath: cms/ajax/turbo-router.md
subtitle: Swap pages in place when visitors follow internal links, for single-page speed without a client-side framework.
---
# Turbo Router

The turbo router loads internal links with AJAX and swaps the page in place, without the cost of a full page load. It is an implementation of PJAX (push state and AJAX) that gives the speed of a single page application without the complexity of a client-side framework.

To enable turbo routing, add the following meta tag to the `<head>` section of your page or layout.

```html
<head>
    <meta name="turbo-visit-control" content="enable" />
</head>
```

Once enabled, all internal links on the page use PJAX navigation instead of full page reloads.

::: tip
The turbo router is one of the extra features, so the layout must include the `{% framework extras %}` tag. See [Including the Framework](./introduction.md#including-the-framework).
:::

## Visiting a Page from JavaScript

Visit a link programmatically with the `jax.visit` function.

```js
jax.visit(location);
```

To replace the current URL without adding it to the navigation history, similar to `window.history.replaceState`, set the `action` option to **replace**.

```js
jax.visit(location, { action: 'replace' });
```

To check if the turbo router is enabled and should be used, call `jax.useTurbo`.

```js
if (jax.useTurbo && jax.useTurbo()) {
    // Use PJAX
}
```

## Disabling the Router

To disable PJAX routing on a specific page, set the `turbo-visit-control` meta tag in its head section to `reload`. Visits to this page then trigger a full reload. This disables the feature for incoming requests only.

```html
<head>
    <meta name="turbo-visit-control" content="reload" />
</head>
```

To disable PJAX across your website, set the value to `disable`. This disables the feature for all incoming and outgoing requests.

```html
<meta name="turbo-visit-control" content="disable" />
```

### Disabling for Specific Links

All internal links use PJAX by default. To opt out, mark a link or its parent container with `data-turbo="false"`. The browser then handles those links normally.

```html
<a href="/" data-turbo="false">Disabled</a>
```

To enable a link again inside a disabled container, set `data-turbo="true"` on the link.

```html
<div data-turbo="false">
    <a href="/" data-turbo="true">Enabled</a>
</div>
```

### Keeping the Scroll Position

Every visit scrolls to the top of the page, as most links do in a browser. Keeping the scroll position is useful when links act like filters. Add the `data-turbo-no-scroll` attribute to the link element to disable visit scrolling.

```html
<a href="/" data-turbo-no-scroll>Filter</a>
```

## Keeping Elements Between Pages

Some elements should not refresh when the page changes. Add the `data-turbo-permanent` attribute to the parent element. The element must also have an `id` attribute, so the framework can match it between the old and new page, including its event listeners.

```html
<div id="main-navigation" data-turbo-permanent>...</div>
```

## Restricting Routing to a Root Path

PJAX applies to all links on the same domain name, and a visit to any other URL falls back to a full page load. If your application lives in a subdirectory, you can restrict PJAX to links under that path.

For example, if your website lives in `/app` and links to a different site in `/docs` should load normally, add the `turbo-root` meta tag to the page's head section.

```html
<head>
    <meta name="turbo-root" content="/app">
</head>
```

## Showing Native Error Pages

When the server responds to a PJAX visit with an error code, such as a 404 or 500 status, the router replaces the complete `html` element, including scripts and stylesheets. This prevents the body element from being replaced with content that the same application code did not produce.

To disable this behavior, add the `turbo-visit-control` meta tag with the `error` value to the head section of your error page. This tells the router that the error page content comes from the native application.

```html
<meta name="turbo-visit-control" content="error">
```

## Running JavaScript on Page Load

With PJAX, page contents load dynamically instead of through the usual browser page load. Use the `render` event to run code every time the page renders, including after [AJAX updates](./update-partials.md).

```js
addEventListener('render', function() {
    // Page has rendered something new
});
```

To run code every time a page loads, after its scripts have loaded, use the `page:loaded` event.

```js
addEventListener('page:loaded', function() {
    // ...
});
```

The `jax.pageReady` function returns a promise that resolves after all the page scripts have loaded, or immediately if they are already loaded.

```js
jax.pageReady().then(() => {
    // Page has finished loading scripts
});
```

The `jax.waitFor` function waits for an object or variable to exist. It returns a promise that resolves when the variable is found.

```js
jax.waitFor(() => window.propName).then(() => {
    // window.propName is now available
});
```

The second argument sets a timeout in milliseconds. The following stops waiting after two seconds.

```js
jax.waitFor(() => window.propName, 2000).then(() => {
    console.log('Found the variable!')
}).catch(() => {
    console.error('Gave up waiting...')
});
```

### Running Inline Scripts Once

The turbo router manages the scripts in the `<head>` tag of the page by comparing the differences between pages. Script tags in the `<body>` tag run every time the page renders, which may be undesirable.

Add `data-turbo-eval="false"` to run a script on the first page load only. The script does not run for PJAX requests.

```html
<body>
    <script data-turbo-eval="false" src="{{ ['@framework.bundle']|theme }}"></script>
</body>
```

::: tip
If you place scripts in the `<body>` tag for performance reasons, consider moving them to the `<head>` tag and using `<script defer>` instead.
:::

To run inline JavaScript only once, whether on the first page load or a PJAX request, set a unique value on the `data-turbo-eval-once` attribute. The framework uses the value, such as `myAjaxPromise`, to tell if it has seen the script before.

```html
<script data-turbo-eval-once="myAjaxPromise">
    // This script will run once only
    addEventListener('ajax:promise', function(event) {
        //
    });
</script>
```

### Making Controls Idempotent

::: aside
October CMS includes a library for building [idempotent controls](https://larajax.org/controls/definition).
:::

When a page visit initializes JavaScript components, those functions must be idempotent. An idempotent function is safe to run multiple times without changing the result beyond the first run.

One technique is to track whether a function has already run by adding a value to the `dataset` property of each processed element. This is useful for external scripts.

```js
addEventListener('page:loaded', function() {
    // Find my control
    var myControl = document.querySelector('.my-control');

    // Check if control has already been initialized
    if (!myControl.dataset.hasMyControl) {
        myControl.dataset.hasMyControl = true;

        // Initialize since this is the first time
        initializeMyControl(myControl);
    }
});
```

A simpler approach is often to let the function run multiple times and make it idempotent internally. For example, check whether a menu divider already exists before creating a new one.

### Disposing Controls

Some pages bind global events that belong to that page only, such as a hot key for a certain action.

```js
addEventListener('keydown', myKeyDownFunction);
```

To stop the event from leaking into other pages, remove it in the `page:unload` event, which fires when the page should dispose of its events and controls. Listen to it once.

```js
addEventListener('page:unload', function() {
    removeEventListener('keydown', myKeyDownFunction);
}, { once: true });
```

::: tip
October CMS includes a library for [building disposable controls](https://larajax.org/controls/definition).
:::

### Pausing Rendering

To animate elements such as dropdowns or off-canvas menus before a new page renders, pause the `page:before-render` event. Prevent the default behavior, then call the `resume()` function in the event detail.

```js
addEventListener('page:before-render', async (event) => {
    event.preventDefault();

    await animateOut();

    event.detail.resume();
});
```

## Turbo Router Events

The framework triggers several events during navigation and page responses. Most fire on the `document` object, with details on the `event.detail` property.

Event | Description
------------- | -------------
**render** | triggered when the page updates via PJAX or AJAX.
**page:click** | triggered when a turbo-routed link is clicked.
**page:before-visit** | triggered before visiting a location, except when navigating using browser history.
**page:visit** | triggered after a clicked visit starts.
**ajax:request-start** | triggered before the HTTP request for a page visit or AJAX request starts.
**ajax:request-end** | triggered after the HTTP request for a page visit or AJAX request ends.
**page:before-render** | triggered before the page content is rendered.
**page:render** | triggered after the page is rendered.
**page:load** | triggered once after the initial page load and again every time a page is visited.
**page:loaded** | identical to `page:load` except will wait for all newly added scripts to load.
**page:updated** | similar to `DOMContentLoaded` except triggered only when a page is visited.
**page:unload** | called when a previously loaded page should be disposed.

## Working with Hot Reloading

The turbo router may interfere with hot reloading or browser sync tools during development, such as [Laravel Mix](https://laravel-mix.com/) in development mode with `laravel-mix & browsersync`. To work around this, add the following to your webpack `browserSync` configuration.

```js
snippetOptions: {
    rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
            return '<meta name="turbo-visit-control" content="disable" />';
        }
   }
}
```

#### See Also

::: also
* [Larajax Turbo Router](https://larajax.org/turbo/setup)
* [Larajax View Transitions](https://larajax.org/turbo/view-transitions)
* [Observable Controls](https://larajax.org/controls/definition)
:::
