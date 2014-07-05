# Plugin Events and Usage

- [Example Usage](#example-usage)
- [Event Listing](#event-listing)

Events can be hooked into from anywhere, though the most common place is the `boot()` method of a plugin. 

<a name="example-usage" class="anchor" href="#example-usage"></a>
## Example Usage
There are two types of events - local and global and their usage slightly differ. 

### Local
Local events are created using `Class::extend()` or `$instance->extend()` and passing a closure.

	<?php namespace Your\Plugin;

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

### Global
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