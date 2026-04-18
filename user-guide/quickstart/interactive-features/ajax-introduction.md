---
subtitle: "Learn how AJAX makes your website feel fast and modern by updating content without full page reloads."
---

# Introduction to AJAX

When someone clicks a link or submits a form on a traditional website, the entire page reloads. The screen goes blank for a moment, the browser fetches a brand-new page from the server, and everything renders from scratch. AJAX changes that. With AJAX, your website can send a request to the server, get a response, and update just the part of the page that needs to change — all without the visitor ever leaving the page. The result is a smoother, more responsive experience that feels closer to a desktop application than a traditional website.

October CMS ships with a built-in AJAX framework that makes this easy to use, even if you have no JavaScript experience. You can add interactive behavior to your pages using simple HTML attributes — no custom scripts required.

## Including the AJAX Framework

Before you can use any AJAX features, the framework needs to be loaded on your pages. You do this by adding a tag to your layout file, typically just before the closing `</body>` tag.

The basic framework gives you the core AJAX functionality:

```twig
{% framework %}
```

For most projects, you will want the **extras** version instead. It includes everything in the core framework plus automatic validation error display, loading indicators, and flash message support:

```twig
{% framework extras %}
```

::: tip
The `extras` framework adds polished features like a loading progress bar at the top of the page, automatic field-level validation messages, and styled flash notifications — all without writing any CSS or JavaScript yourself. It is recommended for most websites.
:::

## The Data Attributes API

The simplest way to use AJAX in October CMS is through **data attributes** — special HTML attributes you add to your elements. There is no JavaScript to write. The framework reads these attributes and handles everything for you.

Here are the key data attributes you will use most often:

### `data-request`

This is the main attribute. It tells the framework which **handler** to call on the server when the element is triggered (for example, when a button is clicked or a form is submitted).

```html
<button data-request="onLoadMore">Load More</button>
```

### `data-request-update`

This tells the framework to update a specific element on the page with the contents of a [partial](../themes-and-pages/using-partials.md) after the AJAX request completes.

```html
<button data-request="onLoadMore" data-request-update="'posts': '#post-list'">
    Load More Posts
</button>
```

In this example, the server renders the `posts` partial and the framework replaces the contents of the element with the ID `post-list` with the result.

### `data-request-confirm`

This shows a confirmation dialog before the request is sent. The request only proceeds if the visitor clicks "OK."

```html
<button data-request="onDelete" data-request-confirm="Are you sure you want to delete this?">
    Delete
</button>
```

### `data-request-data`

This sends additional data along with the request, which your handler can read on the server.

```html
<button data-request="onLoadMore" data-request-data="page: 2, category: 'news'">
    Load Page 2
</button>
```

## A Simple Example

Let's put it all together. Imagine you have a blog page and you want a "Load More Posts" button that fetches additional posts without reloading the page.

Your page markup would look like this:

```html
<div id="post-list">
    {% partial "posts" %}
</div>

<button data-request="onLoadMore" data-request-update="'posts': '#post-list'">
    Load More Posts
</button>
```

When the visitor clicks the button, the framework calls the `onLoadMore` handler on the server, renders the `posts` partial with the updated data, and replaces the contents of `#post-list` with the new HTML.

## How AJAX Handlers Work

An AJAX handler is a PHP function that lives in the **code section** of your page or layout. Handler names always start with `on` — for example, `onLoadMore`, `onFormSubmit`, or `onDelete`.

```php
function onLoadMore()
{
    // Your server-side logic goes here
    $this['posts'] = BlogPost::paginate(10);
}
```

When the framework calls this handler, the function runs on the server. You can query the database, process data, set variables for your partials, and return results — all in response to the visitor's action on the page.

::: aside
Handlers are the bridge between what happens in the browser and what happens on the server. The visitor clicks a button, the framework calls the handler, the handler does its work, and the page updates — all seamlessly.
:::

## Next Steps

Now that you understand the basics of AJAX, you are ready to build interactive features like [contact forms](./building-forms.md) and [flash messages](./flash-messages-and-loaders.md). For a deeper dive into the AJAX framework and its full capabilities, see the [AJAX Introduction](../../../4.x/cms/ajax/introduction.md) in the developer documentation.
