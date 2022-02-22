# Extending Plugins

## Extending with Events

The [Event service](../services/events.md) is the primary way to inject or modify the functionality of core classes or other plugins. This service can be imported for use in any class by adding `use Event;` to the top of your PHP file (after the namespace statement) to import the Event facade.

### Subscribing to Events

The most common place to subscribe to an event is the `boot` method of a [Plugin registration file](registration.md#oc-registration-methods). For example, when a user is first registered you might want to add them to a third party mailing list, this could be achieved by subscribing to a `rainlab.user.register` global event.

```php
class Plugin extends PluginBase
{
    // ...

    public function boot()
    {
        Event::listen('rainlab.user.register', function ($user) {
            // Code to register $user->email to mailing list
        });
    }
}
```

The same can be achieved by extending the model's constructor and using a local event.

```php
User::extend(function ($model) {
    $model->bindEvent('user.register', function () use ($model) {
        // Code to register $model->email to mailing list
    });
});
```

### Declaring / Firing Events

You can fire events globally (through the Event service) or locally.

Local events are fired by calling `fireEvent()` on an instance of an object that implements `October\Rain\Support\Traits\Emitter`. Since local events are only fired on a specific object instance, it is not required to namespace them as it is less likely that a given project would have multiple events with the same name being fired on the same objects within a local context.

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
```

Global events are fired by calling `Event::fire()`. As these events are global across the entire application, it is best practice to namespace them by including the vendor information in the name of the event. If your plugin Author is ACME and the plugin name is Blog, then any global events provided by the ACME.Blog plugin should be prefixed with `acme.blog`.

```php
Event::fire('acme.blog.post.beforePost', [$firstParam, $secondParam]);
```

If both global & local events are provided at the same place it's best practice to fire the local event before the global event so that the local event takes priority. Additionally, the global event should provide the object instance that the local event was fired on as the first parameter.

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
Event::fire('rainlab.blog.beforePost', [$this, $firstParam, $secondParam]);
```

Once this event has been subscribed to, the parameters are available in the handler method. For example:

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

Sometimes you may wish to allow a backend view file or partial to be extended, such as a toolbar. This is possible using the `fireViewEvent` method found in all backend controllers.

Place this code in your view file:

```php
<div class="footer-area-extension">
    <?= $this->fireViewEvent('backend.auth.extendSigninView', [$firstParam]) ?>
</div>
```

This will allow other plugins to inject HTML to this area by hooking the event and returning the desired markup.

```php
Event::listen('backend.auth.extendSigninView', function ($controller, $firstParam) {
    return '<a href="#">Sign in with Google!</a>';
});
```

> **Note**: The first parameter in the event handler will always be the calling object (the controller).

The above example would output the following markup:

```html
<div class="footer-area-extension">
    <a href="#">Sign in with Google!</a>
</div>
```

## Usage Examples

These are some practical examples of how events can be used.

### Extending a User Model

This example will modify the [`model.getAttribute`](https://octobercms.com/docs/api/model/beforegetattribute) event of the `User` model by binding to its local event. This is carried out inside the `boot` method of the [Plugin registration file](registration.md#oc-routing-and-initialization). In both cases, when the `$model->foo` attribute is accessed it will return the value *bar*.

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

To add model validation for introduced fields, hook into the `beforeValidate` event and throw a `ValidationException` exception.

```php
User::extend(function ($model) {
    $model->bindEvent('model.beforeValidate', function () use ($model) {
        if (!$model->billing_first_name) {
            throw new \ValidationException(['billing_first_name' => 'First name is required']);
        }
    });
});
```

### Extending Backend Forms

There are a number of ways to extend backend forms, see [Backend Forms](../backend/forms.md#oc-extending-form-behavior).

This example will listen to the [`backend.form.extendFields`](https://octobercms.com/docs/api/backend/form/extendfields) global event of the `Backend\Widget\Form` widget and inject some extra fields when the Form widget is being used to modify a user. This event is also subscribed inside the `boot` method of the [Plugin registration file](registration.md#oc-routing-and-initialization).

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
            'label'   => 'Birthday',
            'comment' => 'Select the users birthday',
            'type'    => 'datepicker'
        ]
    ]);

    // Remove a Surname field
    $widget->removeField('surname');
});
```

> **Note**: You may also use the `backend.form.extendFieldsBefore` event to add fields.

### Extending a Backend List

This example will modify the [`backend.list.extendColumns`](https://octobercms.com/docs/api/backend/list/extendcolumns) global event of the `Backend\Widget\Lists` class and inject some extra columns values under the conditions that the list is being used to modify a user. This event is also subscribed inside the `boot` method of the [Plugin registration file](registration.md#oc-routing-and-initialization).

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

This example will declare a new global event `rainlab.forum.topic.post` and local event called `topic.post` inside a `Topic` component. This is carried out in the [Component class definition](components.md#oc-component-class-definition).

```php
class Topic extends ComponentBase
{
    public function onPost()
    {
        // ...

        /*
         * Extensibility
         */
        $this->fireEvent('topic.post', [$post, $postUrl]);
        Event::fire('rainlab.forum.topic.post', [$this, $post, $postUrl]);
    }
}
```

Next this will demonstrate how to hook to this new event from inside the [page execution life cycle](../cms/layouts.md#oc-dynamic-pages). This will write to the trace log when the `onPost` event handler is called inside the `Topic` component (above).

```
[topic]
slug = "{{ :slug }}"
==
function onInit()
{
    $this->topic->bindEvent('topic.post', function($post, $postUrl) {
        trace_log('A post has been submitted at '.$postUrl);
    });
}
```

### Extending the Backend Menu

This example will replace the label for CMS and Pages in the backend with *...*.

```php
Event::listen('backend.menu.extendItems', function($manager) {

    // Add main menu item
    $manager->addMainMenuItems('October.Cms', [
        'cms' => [
            'label' => '...'
        ]
    ]);

    // Add side menu item
    $manager->addSideMenuItems('October.Cms', 'cms', [
        'pages' => [
            'label' => '...'
        ]
    ]);

});
```

Similarly, we can remove the menu items using the same event.

```php
Event::listen('backend.menu.extendItems', function($manager) {

    // Remove all items
    $manager->removeMainMenuItem('October.Cms', 'cms');

    // Remove single item
    $manager->removeSideMenuItem('October.Cms', 'cms', 'pages');

    // Remove two items
    $manager->removeSideMenuItems('October.Cms', 'cms', [
        'pages',
        'partials'
    ]);
});
```
