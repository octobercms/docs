# Plugin Events and Usage

- [Subscribing to Events](#subscribing-to-events)
- [Declaring Events](#declaring-events)
- [Local and global](#local-global)
- [Event Listing](#event-listing)

Events are an easy way to extend the functionality of core classes and other plugins, this methodology can sometimes be referred to ask *hooks and triggers*. Events in October can be either local using the `fireEvent()` method or global using the `Event::fire()` static method.

<a name="subscribing-to-events" class="anchor" href="#subscribing-to-events"></a>
## Subscribing to Events

Subscribing to an event, also known as *hooking on to an event*, can be done from from anywhere, although the most common place is the `boot()` method of a [Plugin registration file](registration#mail-templates).

For example, when a user is first registered you might want to add them to a third party mailing list, this could be achieved by subscribing to a **rainlab.user.register** event.

    public function boot()
    {
        Event::listen('rainlab.user.register', function($user){

            // Code to register $user->email to mailing list

        });
    }

<a name="declaring-events" class="anchor" href="#declaring-events"></a>
## Declaring Events

You can declare events, also known as *triggering an event*, anywhere in your code. Below is an example:

    Event::fire('acme.blog.beforePost', ['first parameter', 'second parameter']);

Once this event has been subscribed to, the parameters are available in the handler method. For example:

    Event::listen('acme.blog.beforePost', function($param1, $param2){
        echo 'Parameters: ' . $param1 . ' ' . $param2;
    });

<a name="local-global" class="anchor" href="#local-global"></a>
## Local and global
There are two types of events - local and global and their usage slightly differ. 

### Local events
Local events are created using `Class::extend()` or `$instance->extend()` and passing a closure.

    <?php namespace Acme\Blog;

    use System\Classes\PluginBase;
    use RainLab\User\Models\User;

    class Plugin extends PluginBase
    {
        ...

        public function boot()
        {
            // Local Event hook that affects all users
            User::extend(function($model) {
                $model->bindEvent('model.getAttribute', function($attribute, $value) use ($model) {
                    if ( $attribute == 'foo' )
                        return 'bar';
                });
            });

            // Local Event hook that affects only a single user
            $user = User::first();
            $user->extend(function($model) {
                $model->bindEvent('model.getAttribute', function($attribute, $value) use ($model) {
                    if ( $attribute == 'foo' )
                        return 'bar';
                });
            });
        }
    }

### Global events
Global event hooks work the same way they do in [stock Laravel](http://laravel.com/docs/events) - with `Event::listen()`.

    <?php namespace Your\Plugin;

    use Event;
    use System\Classes\PluginBase;

    class Plugin extends PluginBase
    {
        ...

        public function boot()
        {
            Event::listen('backend.form.extendFields', function($widget) {
                if (!$widget->getController() instanceof \RainLab\User\Controllers\Users) return;
                if (!$widget->model instanceof \RainLab\User\Models\User) return;

                $widget->addFields(...);
            }
        }
    }

Remember to add `use Event;` to the top of your file to use Global Event hooks.

<a name="event-listing" class="anchor" href="#event-listing"></a>
## Event Listeing

October CMS comes with a large number of event listeners baked in. Some work with both local event and hooks, some only the former. All event listeners are listed below along with any relevant information about their usage.

### Global Events

Event                                       | Accepts                  | Description                                       | Usage Hints
--------------------------------------------|--------------------------|---------------------------------------------------|--------
backend.form.extendFields                   | $form                    | Modify a form before render                       | This will trigger for all forms. Restrict to just the form you want to modify using `if (!$widget->getController() instanceof \Author\Plugin\Controllers\ControllerName) return;`
cms.page.beforeDisplay                      | $controller, $url, $page | Modify a page or redirect away before it's loaded | 
cms.activeTheme                             |                          | Change the active theme before page load          | return a theme name