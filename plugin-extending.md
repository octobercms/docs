# Extending plugins

- [Extending with events](#extending-with-events)
    - [Subscribing to events](#subscribing-to-events)
    - [Declaring events](#declaring-events)
- [Extending back-end views](#backend-view-events)
- [Usage examples](#usage-examples)
    - [Extending a User model](#extending-user-model)
    - [Extending a backend form](#extending-backend-form)
    - [Extending a backend list](#extending-backend-list)
    - [Extending a component](#extending-component)
    - [Extending the backend menu](#extending-backend-menu)


<!-- Behaviors: Mixin concept, dynamic implement, extend constructor -->
<!-- IoC/Facades: Replacing objects -->

<a name="extending-with-events"></a>
## Extending with events

Plugins are primarily extended using the [Event service](../services/events) to inject or modify the functionality of core classes and other plugins.

<a name="subscribing-to-events"></a>
### Subscribing to events

The most common place to subscribe to an event is the `boot()` method of a [Plugin registration file](registration#registration-methods). For example, when a user is first registered you might want to add them to a third party mailing list, this could be achieved by subscribing to a **rainlab.user.register** global event.

    public function boot()
    {
        Event::listen('rainlab.user.register', function($user) {
            // Code to register $user->email to mailing list
        });
    }

The same can be achieved by extending the model's constructor and using a local event.

    User::extend(function($model) {
        $model->bindEvent('user.register', function() use ($model) {
            // Code to register $model->email to mailing list
        });
    });

<a name="declaring-events"></a>
### Declaring events

You can declare events globally or locally, below is an example of declaring a global event:

    Event::fire('acme.blog.beforePost', ['first parameter', 'second parameter']);

The local equivalent requires the code be in context of the calling object.

    $this->fireEvent('blog.beforePost', ['first parameter', 'second parameter']);

> **Note:** It is good practice to put the local event before the global event, so local events take priority.

Once this event has been subscribed to, the parameters are available in the handler method. For example:

    // Global
    Event::listen('acme.blog.beforePost', function($param1, $param2) {
        echo 'Parameters: ' . $param1 . ' ' . $param2;
    });

    // Local
    $this->bindEvent('blog.beforePost', function($param1, $param2) {
        echo 'Parameters: ' . $param1 . ' ' . $param2;
    });

<a name="backend-view-events"></a>
## Extending back-end views

Sometimes you may wish to allow a back-end view file or partial to be extended, such as a toolbar. This is possible using the `fireViewEvent()` method found in all back-end controllers.

Place this code in your view file:

    <div class="footer-area-extension">
        <?= $this->fireViewEvent('backend.auth.extendSigninView') ?>
    </div>

This will allow other plugins to inject HTML to this area by hooking the event and returning the desired markup.

    Event::listen('backend.auth.extendSigninView', function($controller) {
        return '<a href="#">Sign in with Google!</a>';
    });

> **Note**: The first parameter in the event handler will always be the calling object (the controller).

The above example would output the following markup:

    <div class="footer-area-extension">
        <a href="#">Sign in with Google!</a>
    </div>

<a name="usage-examples"></a>
## Usage examples

These are some practical examples of how events can be used.

<a name="extending-user-model"></a>
### Extending a User model

This example will modify the `model.getAttribute` event of the `User` model by binding to its local event. This is carried out inside the `boot()` method of the [Plugin registration file](registration#routing-initialization). In both cases when the `$model->foo` attribute is accessed, it will return the value *bar*.

    class Plugin extends PluginBase
    {
        [...]

        public function boot()
        {
            // Local event hook that affects all users
            User::extend(function($model) {
                $model->bindEvent('model.getAttribute', function($attribute, $value) {
                    if ($attribute == 'foo') {
                        return 'bar';
                    }
                });
            });

            // Double event hook that affects user #2 only
            User::extend(function($model) {
                $model->bindEvent('model.afterFetch', function() use ($model) {
                    if ($model->id != 2) {
                        return;
                    }

                    $model->bindEvent('model.getAttribute', function($attribute, $value) {
                        if ($attribute == 'foo') {
                            return 'bar';
                        }
                    });
                });
            });
        }
    }

<a name="extending-backend-form"></a>
### Extending a backend form

This example will modify the `backend.form.extendFields` global event of the `Backend\Widget\Form` class and inject some extra fields values under the conditions that the form is being used to modify a user. This event is also subscribed inside the `boot()` method of the [Plugin registration file](registration#routing-initialization).

    class Plugin extends PluginBase
    {
        [...]

        public function boot()
        {
            // Extend all backend form usage
            Event::listen('backend.form.extendFields', function($widget) {

                // Only for the User controller
                if (!$widget->getController() instanceof \RainLab\User\Controllers\Users) {
                    return;
                }

                // Only for the User model
                if (!$widget->model instanceof \RainLab\User\Models\User) {
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
        }
    }

> Remember to add `use Event` to the top of your class file to use global events.

<a name="extending-backend-list"></a>
### Extending a backend list

This example will modify the `backend.list.extendColumns` global event of the `Backend\Widget\Lists` class and inject some extra columns values under the conditions that the list is being used to modify a user. This event is also subscribed inside the `boot()` method of the [Plugin registration file](registration#routing-initialization).

    class Plugin extends PluginBase
    {
        [...]

        public function boot()
        {
            // Extend all backend list usage
            Event::listen('backend.list.extendColumns', function($widget) {

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
                    ]
                ]);

                // Remove a Surname column
                $widget->removeColumn('surname');
            });
        }
    }

> Remember to add `use Event` to the top of your class file to use global events.

<a name="extending-component"></a>
### Extending a component

This example will declare a new global event `rainlab.forum.topic.post` and local event called `topic.post` inside a `Topic` component. This is carried out in the [Component class definition](components#component-class-definition).

    class Topic extends ComponentBase
    {
        public function onPost()
        {
            [...]

            /*
             * Extensibility
             */
            Event::fire('rainlab.forum.topic.post', [$this, $post, $postUrl]);
            $this->fireEvent('topic.post', [$post, $postUrl]);
        }
    }

Next this will demonstrate how to hook to this new event from inside the [page execution life cycle](../cms/layouts#dynamic-pages). This will write to the trace log when the `onPost()` event handler is called inside the `Topic` component (above).

    [topic]
    slug = "{{ :slug }}"
    ==
    function onInit()
    {
        $this['topic']->bindEvent('topic.post', function($post, $postUrl) {
            trace_log('A post has been submitted at '.$postUrl);
        });
    }

<a name="extending-backend-menu"></a>
### Extending the backend menu

This example will replace the label for CMS and Pages in the backend with *...*.

    class Plugin extends PluginBase
    {
        [...]

        public function boot()
        {
            Event::listen('backend.menu.extendItems', function($manager) {

                $manager->addMainMenuItems('October.Cms', [
                    'cms' => [
                        'label' => '...'
                    ]
                ]);

                $manager->addSideMenuItems('October.Cms', 'cms', [
                    'pages' => [
                        'label' => '...'
                    ]
                ]);

            });
        }
    }

Similarly we can remove the menu items with the same event:

    Event::listen('backend.menu.extendItems', function($manager) {

        $manager->removeMainMenuItem('October.Cms', 'cms');
        $manager->removeSideMenuItem('October.Cms', 'cms', 'pages');

    });
