# Plugin Events and Usage

- [Subscribing to events](#subscribing-to-events)
- [Declaring events](#declaring-events)
- [Extending back-end views](#backend-view-events)
- [Usage examples](#usage-examples)

Events are an easy way to extend the functionality of core classes and other plugins, this methodology can sometimes be referred to as *hooks and triggers*. Events in October can be either local to the class using the `fireEvent()` method, or global to the application using the `Event::fire()` static method. Global events usage is taken directly from [Laravel events](http://laravel.com/docs/events). In order to use Local events the class should use the `October\Rain\Support\Traits\Emitter` trait.

<a name="subscribing-to-events" class="anchor" href="#subscribing-to-events"></a>
## Subscribing to events

Subscribing to an event, also known as *hooking on to an event*, can be done from anywhere, although the most common place is the `boot()` method of a [Plugin registration file](registration#registration-methods).

For example, when a user is first registered you might want to add them to a third party mailing list, this could be achieved by subscribing to a **rainlab.user.register** global event.

    public function boot()
    {
        Event::listen('rainlab.user.register', function($user) {

            // Code to register $user->email to mailing list

        });
    }

The same can be achieved by extending the model's constructor and using a local event.

    User::extend(function($model){
        $model->bindEvent('user.register', function() use ($model) {
            // Code to register $model->email to mailing list
        });
    });

<a name="declaring-events" class="anchor" href="#declaring-events"></a>
## Declaring events

You can declare events, also known as *triggering an event*, anywhere in your code. Below is an example of declaring a global event:

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

<a name="backend-view-events" class="anchor" href="#backend-view-events"></a>
## Extending back-end views

Sometimes you may wish to allow a back-end view file or partial to be extended, such as a toolbar. This is possible using the `fireViewEvent()` method found in all back-end controllers.

Place this code in your view file:

    <?= $this->fireViewEvent('backend.auth.extendSigninView') ?>

This will allow other plugins to inject HTML to this area by hooking the event and returning the desired markup.

    Event::listen('backend.auth.extendSigninView', function($controller) {
        return '<a href="#">Sign in with Google!</a>';
    });

> **Note**: The first parameter in the event handler will always be the calling object (the controller).

<a name="usage-examples" class="anchor" href="#usage-examples"></a>
## Usage examples

These are some practical examples of how events can be used.

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
                    if ($attribute == 'foo')
                        return 'bar';
                });
            });

            // Double event hook that affects user #2 only
            User::extend(function($model) {
                $model->bindEvent('model.afterFetch', function() use ($model) {
                    if ($model->id != 2)
                        return;

                    $model->bindEvent('model.getAttribute', function($attribute, $value) {
                        if ($attribute == 'foo')
                            return 'bar';
                    });
                });
            });

        }
    }

### Extending a backend form

This example will modify the `backend.form.extendFields` global event of the `Backend\Widget\Form` class and inject some extra fields values under the conditions that the form is being used to modify a user. This event is also subscribed inside the `boot()` method of the [Plugin registration file](registration#routing-initialization).

    class Plugin extends PluginBase
    {
        [...]

        public function boot()
        {
            // Extend all backend form usage
            Event::listen('backend.form.extendFields', function($widget) {

                // Only for the Users controller
                if (!$widget->getController() instanceof \RainLab\User\Controllers\Users)
                    return;

                // Only for the User model
                if (!$widget->model instanceof \RainLab\User\Models\User)
                    return;

                // Add an extra birthday field
                $widget->addFields([
                    'birthday' => [
                        'label' => 'Birthday',
                        'comment' => 'Select the users birthday',
                        'type' => 'datepicker'
                    ]
                ]);
            });
        }
    }

> Remember to add `use Event` to the top of your class file to use global events.

### Extending a component

This example will declare a new global event `rainlab.forum.topic.post` and local event called `topic.post` inside a `Topic` component. This is carried out in the [Component class definition](components#component-class-definition).

    class Topic extends ComponentBase
    {
        public function onPost()
        {
            [...]

            /*
             * Extensbility
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
            traceLog('A post has been submitted at '.$postUrl);
        });
    }

### Extending the backend menu

This example will replace the label for CMS and Pages in the backend with *...*.

    class Plugin extends PluginBase
    {
        [...]

        public function boot()
        {
            Event::listen('backend.menu.extendItems', function($manager){

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
