---
previousPath: extend/system/views.md
subtitle: Render page content with views, partials and layouts in the admin panel.
---
# Views & Layouts

A view holds the content of a backend page, and a layout wraps every page with the panel chrome. Use partials to reuse markup between views, and hints to show messages that users can dismiss.

Views live in a directory named after the [controller](./controllers.md) class in lowercase, with one view file per action.

::: dir
├── plugins
|   └── acme
|       └── blog
|           ├── controllers
|           |   ├── users  _← View Directory_
|           |   |   ├── `_partial.php`  _← Partial File_
|           |   |   └── `index.php`  _← View File_
|           |   └── Users.php  _← Controller Class_
|           └── Plugin.php
:::

## Rendering a Partial

Backend partials are **.php** files in the controller view directory, and their file names start with an underscore, such as **_partial.php**. Render a partial from a view or another partial with the `makePartial` method of the controller. The first argument is the partial name, and the optional second argument is an array of variables to pass to the partial.

```php
<?= $this->makePartial('sidebar', ['showHeader' => true]) ?>
```

## Showing a Hint

A hint is an informative panel that the user can hide. Render one with the `makeHintPartial` method. The first argument is a unique key used to remember whether the user has hidden the hint. The second argument is the partial to render. The third argument is an array of extra variables for the partial, along with the hint properties described below.

```php
<?= $this->makeHintPartial('my_hint_key', 'my_hint_partial', ['foo' => 'bar']) ?>
```

To show a hint that cannot be hidden, pass `null` as the key.

```php
<?= $this->makeHintPartial(null, 'my_hint_partial') ?>
```

The following properties are available.

Property | Description
------------- | -------------
**type** | sets the color of the hint, supported types: danger, info, success, warning. Default: info.
**title** | adds a title section to the hint.
**subtitle** | adds a second line to the title section, along with the title.
**icon** | adds an icon to the title section, along with the title.
**content** | the hint content as a string, used in place of a partial.

### Checking if a Hint is Hidden

Use the `isBackendHintHidden` method to check if the user has hidden a hint. Pass the same key used in the `makeHintPartial` call. The method returns `true` if the hint is hidden.

```php
<?php if ($this->isBackendHintHidden('my_hint_key')): ?>
    <!-- Do something when the hint is hidden -->
<?php endif ?>
```

## Using a Custom Layout

Backend layouts live in an optional **layouts/** directory of a plugin. Set a custom layout with the `$layout` property of the controller. It defaults to the system layout called `default`.

```php
/**
 * @var string layout to use for the view.
 */
public $layout = 'mycustomlayout';
```

### Adding a Body Class

Use the `$bodyClass` property of the controller to add CSS classes to the BODY tag of the layout.

```php
/**
 * @var string bodyClass (CSS) to add to the layout.
 */
public $bodyClass = 'compact-container';
```

The default layout supports the following body classes.

- **compact-container** removes the padding on all sides.
- **slim-container** removes the padding on the left and right.
- **breadcrumb-flush** makes the page breadcrumb sit flush against the element below.

## Adding a Form with a Sidebar

A layout can also act like a global partial, called a child layout. The system includes a child layout called `form-with-sidebar` that displays a form with a sidebar next to it.

First, set the `compact-container` body class in the action method or the constructor of the controller.

```php
$this->bodyClass = 'compact-container';
```

The layout uses two placeholders: a primary content area called **form-contents** and a complementary sidebar called **form-sidebar**.

```php
<!-- Primary content -->
<?php Block::put('form-contents') ?>
    Main content
<?php Block::endPut() ?>

<!-- Complementary sidebar -->
<?php Block::put('form-sidebar') ?>
    Side content
<?php Block::endPut() ?>

<!-- Layout execution -->
<?php Block::put('body') ?>
    <?= Form::open(['class'=>'layout stretch']) ?>
        <?= $this->makeLayout('form-with-sidebar') ?>
    <?= Form::close() ?>
<?php Block::endPut() ?>
```

The final section overrides the **body** placeholder used by every backend layout. It wraps everything in a `<form />` HTML tag and renders the child layout called **form-with-sidebar**, found in **modules/backend/layouts/form-with-sidebar.php**.

## Adding Scripts and Styles to Every Page

The `backend.layout.extendHead` event lets you add markup to the head element of the layout. Return the markup to include. The following adds a JavaScript file to every backend page.

```php
Event::listen('backend.layout.extendHead', function ($controller) {
    return '<script src="/app/assets/js/myscript.js"></script>';
});
```

The controller is passed as the first argument, so you can target specific controllers. The following adds CSS styles to the Tailor entries controller only.

```php
Event::listen('backend.layout.extendHead', function ($controller) {
    if ($controller instanceof \Tailor\Controllers\Entries) {
        return '<style> /* ... */ </style>';
    }
});
```

The layout fires this event with the `fireViewEvent` method, which other backend views also use to accept markup from plugins. See [Extending Backend Views](../plugins/extending.md#extending-backend-views) to add the same extension point to your own views.

#### See Also

::: also
* [Controllers](./controllers.md)
* [Skins](./skins.md)
* [Views and Responses](../services/response-view.md)
:::
