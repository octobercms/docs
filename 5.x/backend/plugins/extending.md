---
previousPath: extend/extending.md
subtitle: Add features to October CMS and change the behavior of core classes and other plugins using registration methods and events.
---
# Extending October CMS

You extend October CMS in two ways: registration methods in your plugin's **Plugin.php** file declare new features, and events let you change the behavior of the core and other plugins. Most event listeners go in the `boot` method of the registration file.

```php
class Plugin extends PluginBase
{
    public function boot()
    {
        Event::listen('rainlab.user.register', function ($user) {
            // Code to register $user->email to mailing list
        });
    }
}
```

## Registration Methods

The plugin registration file is a [Laravel Service Provider](https://laravel.com/docs/12.x/providers) named **Plugin.php** in the root directory of a plugin. You can override the following methods in the registration class.

Method | Description
------------- | -------------
**register()** | called when the plugin is first registered, called before `boot`.
**boot()** | called right before the request route, called after `register`.
**registerMarkupTags()** | registers [additional markup tags](../../themes/extending/twig.md) that can be used in the CMS.
**registerComponents()** | registers any [CMS components](../../themes/extending/components.md) used by this plugin.
**registerNavigation()** | registers [backend navigation menu items](../panel/navigation.md) for this plugin.
**registerPermissions()** | registers any [backend permissions](../panel/permissions.md) used by this plugin.
**registerSettings()** | registers any [backend configuration links](../settings/introduction.md) used by this plugin.
**registerFormWidgets()** | registers any [backend form widgets](../forms/form-widgets.md) supplied by this plugin.
**registerFilterWidgets()** | registers any [backend filter widgets](../lists/filter-widgets.md) supplied by this plugin.
**registerRichEditorToolbars()** | registers any [rich editor toolbar definitions](../../handbook/form-fields/richeditor.md#registering-a-toolbar-definition) supplied by this plugin.
**registerDashboards()** | registers any [dashboards](../dashboards/dash-controller.md), [report widgets](../dashboards/report-widgets.md) and [data sources](../dashboards/data-sources.md) supplied by this plugin.
**registerSpotlight()** | registers any [Spotlight commands and record sources](../panel/spotlight.md) supplied by this plugin.
**registerListColumnTypes()** | registers any [custom list column types](../lists/extending.md#custom-column-types) supplied by this plugin.
**registerMailTemplates()** | registers any [mail view templates](../services/mail.md) supplied by this plugin.
**registerMailLayouts()** | registers any [mail view layouts](../services/mail.md) supplied by this plugin.
**registerMailPartials()** | registers any [mail view partials](../services/mail.md) supplied by this plugin.
**registerSchedule()** | registers [scheduled tasks](../services/scheduling.md) that are executed on a regular basis.
**registerContentFields()** | registers [content fields](../../themes/extending/tailor-fields.md) that are used by Tailor blueprints.

## Listening to Events

The [Event service](../services/events.md) is the main way to change the functionality of core classes or other plugins. Add `use Event` to the top of your PHP file, after the namespace statement, to import the Event facade.

The most common place to subscribe to an event is the `boot` method of the plugin registration file. For example, to add new users to a mailing list, subscribe to the `rainlab.user.register` global event, as shown at the top of this page.

You can do the same by extending the model's constructor and binding to a local event.

```php
User::extend(function ($model) {
    $model->bindEvent('user.register', function () use ($model) {
        // Code to register $model->email to mailing list
    });
});
```

## Firing Your Own Events

Your plugin can fire events so that other plugins can extend it. There are two kinds of event: local events fire on a single object, and global events fire across the whole application.

### Local Events

Fire a local event by calling `fireEvent()` on an object that implements `October\Rain\Support\Traits\Emitter`. Local events only fire on a specific object instance, so they do not need a namespace.

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
```

### Global Events

Fire a global event by calling `Event::fire()`. Global events are shared across the entire application, so prefix the event name with your vendor information. For a plugin with the author ACME and the name Blog, prefix global events with `acme.blog`.

```php
Event::fire('acme.blog.post.beforePost', [$firstParam, $secondParam]);
```

### Firing Both Local and Global Events

When you fire both kinds of event in the same place, fire the local event first so it takes priority. Pass the object instance as the first parameter of the global event.

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
Event::fire('rainlab.blog.beforePost', [$this, $firstParam, $secondParam]);
```

Listeners receive the parameters in their handler.

```php
// Global
Event::listen('acme.blog.post.beforePost', function ($post, $param1, $param2) {
    Log::info($post->name . 'posted. Parameters: ' . $param1 . ' ' . $param2);
});

// Local
$post->bindEvent('post.beforePost', function ($param1, $param2) use ($post) {
    Log::info($post->name . 'posted. Parameters: ' . $param1 . ' ' . $param2);
});
```

## Extending Backend Views

You can let other plugins extend a backend view file or partial, such as a toolbar, with the `fireViewEvent` method found in all backend controllers. Place this code in your view file.

```php
<div class="footer-area-extension">
    <?= $this->fireViewEvent('backend.auth.extendSigninView', [$firstParam]) ?>
</div>
```

Other plugins can then inject HTML into this area by listening to the event and returning markup.

```php
Event::listen('backend.auth.extendSigninView', function ($controller, $firstParam) {
    return '<a href="#">Sign in with Google!</a>';
});
```

::: tip
The first parameter in the event handler is always the calling object, which is the controller.
:::

The example above outputs the following markup.

```html
<div class="footer-area-extension">
    <a href="#">Sign in with Google!</a>
</div>
```

## Common Extension Examples

The examples below show how events are used in practice. Each one goes inside the `boot` method of the plugin registration file.

### Adding an Attribute to a Model

This example binds to the local `model.getAttribute` event of the `User` model. In both cases, accessing `$model->foo` returns the value **bar**.

```php
// Local event hook that affects all users
User::extend(function ($model) {
    $model->bindEvent('model.getAttribute', function ($attribute, $value) {
        if ($attribute === 'foo') {
            return 'bar';
        }
    });
});

// Double event hook that affects user #2 only
User::extend(function ($model) {
    $model->bindEvent('model.afterFetch', function () use ($model) {
        if ($model->id !== 2) {
            return;
        }

        $model->bindEvent('model.getAttribute', function ($attribute, $value) {
            if ($attribute === 'foo') {
                return 'bar';
            }
        });
    });
});
```

### Validating Added Fields

To validate fields you add to a model, bind to the `model.beforeValidate` event and throw a `ValidationException`.

```php
User::extend(function ($model) {
    $model->bindEvent('model.beforeValidate', function () use ($model) {
        if (!$model->billing_first_name) {
            throw new \ValidationException(['billing_first_name' => 'First name is required']);
        }
    });
});
```

### Adding Fields to a Backend Form

::: aside
There are other ways to extend backend forms, see the [Extending the Form Controller](../forms/extending.md) article for more information.
:::

This example listens to the `backend.form.extendFields` global event of the `Backend\Widget\Form` widget. It adds a field when the form widget is used to modify a user.

```php
// Extend all backend form usage
Event::listen('backend.form.extendFields', function($widget) {
    // Only apply this listener when the Users controller is being used
    if (!$widget->getController() instanceof \RainLab\User\Controllers\Users) {
        return;
    }

    // Only apply this listener when the User model is being modified
    if (!$widget->model instanceof \RainLab\User\Models\User) {
        return;
    }

    // Only apply this listener when the Form widget in question is a root-level
    // Form widget (not a repeater, nestedform, etc)
    if ($widget->isNested) {
        return;
    }

    // Add an extra birthday field
    $widget->addFields([
        'birthday' => [
            'label' => 'Birthday',
            'comment' => 'Select the users birthday',
            'type' => 'datepicker'
        ]
    ]);

    // Remove a Surname field
    $widget->removeField('surname');
});
```

::: tip
You can also use the `backend.form.extendFieldsBefore` event to add fields.
:::

### Adding Columns to a Backend List

This example listens to the `backend.list.extendColumns` global event of the `Backend\Widget\Lists` class. It adds a column when the list shows users.

```php
// Extend all backend list usage
Event::listen('backend.list.extendColumns', function ($widget) {
    // Only for the User controller
    if (!$widget->getController() instanceof \RainLab\User\Controllers\Users) {
        return;
    }

    // Only for the User model
    if (!$widget->model instanceof \RainLab\User\Models\User) {
        return;
    }

    // Add an extra birthday column
    $widget->addColumns([
        'birthday' => [
            'label' => 'Birthday'
        ],
    ]);

    // Remove a Surname column
    $widget->removeColumn('surname');
});
```

### Extending a Component

This example declares a global event `rainlab.forum.topic.post` and a local event `topic.post` inside a `Topic` [component class](../../themes/extending/components.md).

```php
class Topic extends ComponentBase
{
    public function onPost()
    {
        // ...

        $this->fireEvent('topic.post', [$post, $postUrl]);

        Event::fire('rainlab.forum.topic.post', [$this, $post, $postUrl]);
    }
}
```

You can then listen to the local event from inside the [layout execution life cycle](../../themes/layouts.md). This example writes to the trace log when the `onPost` handler is called in the `Topic` component.

::: cmstemplate
```ini
[topic]
slug = "{{ :slug }}"
```
```php
<?
function onInit()
{
    $this->topic->bindEvent('topic.post', function($post, $postUrl) {
        trace_log('A post has been submitted at '.$postUrl);
    });
}
?>
```
:::

#### See Also

::: also
* [Event Service](../services/events.md)
* [Plugin Structure](./introduction.md)
* [Extending the Form Controller](../forms/extending.md)
* [Extending the List Controller](../lists/extending.md)
:::
