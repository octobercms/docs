---
subtitle: Learn how links are routed using the AJAX framework.
---
# Turbo Router

A concept included with the [AJAX framework extra features](./extras.md) is an implementation of PJAX (push state and AJAX) called the turbo router. It gives the performance benefits of a single page application without the added complexity of a client-side framework. When you click a link, the page is automatically swapped client-side without the cost of a full page load. You may programmatically visit a link with the following:

```js
oc.AjaxTurbo.visit(location);
```

## Disable Routing

To disable PJAX routing on a specific page, you may trigger a full reload by including the `turbo-visit-control` meta tag in the head section of the page. This will disable the feature for incoming requests only.

```html
<head>
    <meta name="turbo-visit-control" content="reload" />
</head>
```

To completely disable PJAX in your website, set the value to `disable`. This will disable the feature for incoming and outgoing requests.

```html
<meta name="turbo-visit-control" content="disable" />
```

## Disable for Specific Links

By default, all internal HTML links will be routed using PJAX, but you can disable this by marking links or their parent container with `data-turbo="false"`. Links that are disabled are handled normally by the browser.

```html
<a href="/" data-turbo="false">Disabled</a>
```

You may re-enable when an ancestor has disabled:

```html
<div data-turbo="false">
    <a href="/" data-turbo="true">Enabled</a>
</div>
```

## Persisting Page Elements

In some cases you may want to include static elements on the page, these are elements that should not be refreshed when the page updates. Use the `data-turbo-permanent` attribute on the parent element. The element must also supply and `id` attribute so the original page can be matched with the new page, including event listeners.

```html
<div id="main-navigation" data-turbo-permanent>...</div>
```

## Setting a Root Path

By default, PJAX links are used for all links within the same domain name and a visit to any other URL will fallback to a full page load. In some cases, your application may live in a subdirectory and the links should only apply to the root path.

For example, if you website lives in `/app` and you don't want the links to apply to a different site in `/docs` then you may restrict the links to a root path. You may set the root path by including the `turbo-root` meta tag in the page's head section.

```html
<head>
    <meta name="turbo-root" content="/app">
</head>
```

## Working with JavaScript

When working with PJAX, the page contents may load before the scripts are ready, which differs from the usual browser behavior. To overcome this the global `render` event handler is called every time the page loads and is ready to run scripts.

```js
addEventListener('render', function() {
    // Page has rendered something new and scripts are ready
});
```

When a page visit occurs and JavaScript components are initialized, it is important that these function are idempotent. In simple terms, an idempotent function is safe to apply multiple times without changing the result beyond its initial application.

One technique for making a function idempotent is to keep track of whether you've already performed it by adding a value to the `dataset` property on each processed element.

```js
addEventListener('render', function() {
    // Find my control
    var myControl = document.querySelector('.my-control');

    // Halt because it has already been initialized
    if (myControl.dataset.hasMyControl) {
        return;
    }

    // Initialize since this is the first time
    myControl.dataset.hasMyControl = true;
    initializeMyControl(myControl);
});
```

Another simpler approach is to allow the function to run multiple times and apply idempotence techniques internally. For example, check to see if a menu divider already exists first before creating a new one.

## Global Events

The AJAX framework triggers several events during the navigation lifecycle and page responses. The events are usually triggered on the `document` object with details available on the `event.detail` property.

Event | Description
------------- | -------------
**page:click** | triggered when a turbo-routed link is clicked.
**page:before-visit** | triggered before visiting a location, except when navigating using browser history.
**page:visit** | triggered after a clicked visit starts.
**page:request-start** | triggered before the request for a page.
**page:request-end** | triggered after the page request ends.
**page:before-cache** | triggered before a page is cached.
**page:before-render** | triggered before the page content is rendered.
**page:render** | triggered after the page is rendered. This is fired twice, once from cache and once again after requesting the new page content.
**page:load** | triggered once after the initial page load and again every time a page is visited.
**page:after-load** | triggered after the page scripts are loaded dynamically. This is not called on the initial page load.

## Usage Examples

The following JavaScript will run every time a page loads.

```js
document.addEventListener('page:load', function() {
    // ...
});
```
