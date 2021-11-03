# Расширение возможностей плагинов

<a href="#extending-with-events" name="extending-with-events" class="anchor"></a>
## События

Вы можете добавлять или изменять функциональные возможности плагинов при помощи [Событий](../services/events.md).

<a href="#subscribing-to-events"  name="subscribing-to-events" class="anchor"></a>
### Подписка на события

Наиболее подходящее место для подписки на события - метод `boot()` в [файле регистрации плагина](../plugin/registration.md#registration-methods). Например, если Вы хотите добавить нового пользователя в список для рассылки, используйте глобальное событие **rainlab.user.register**:

    public function boot()
    {
        Event::listen('rainlab.user.register', function($user) {
            // Code to register $user->email to mailing list
        });
    }

Вы также можете расширить конструктор модели и использовать локальное событие.

    User::extend(function($model) {
        $model->bindEvent('user.register', function() use ($model) {
            // Code to register $model->email to mailing list
        });
    });

<a href="declaring-events" name="declaring-events" class="anchor"></a>
### Объявление событий

Вы можете объявлять событие глобальным или локальным. Пример объявления глобального события:

    Event::fire('acme.blog.beforePost', ['first parameter', 'second parameter']);

Пример локального события:

    $this->fireEvent('blog.beforePost', ['first parameter', 'second parameter']);

> **Примечание:** Хорошей практикой является размещение локального события перед глобальным событием из-за того, что локальные события имеют больший приоритет.

После подписки на событие, параметры будут доступны в методе обработчика. Например:

    // Global
    Event::listen('acme.blog.beforePost', function($param1, $param2) {
        echo 'Parameters: ' . $param1 . ' ' . $param2;
    });

    // Local
    $this->bindEvent('blog.beforePost', function($param1, $param2) {
        echo 'Parameters: ' . $param1 . ' ' . $param2;
    });

<a href="#backend-view-events" name="backend-view-events" class="anchor"></a>
## События в административной части сайта

Вы можете использовать события в административной части сайта, используя метод `fireViewEvent()`.

Добавьте следующий код в файл с представлением:

    <div class="footer-area-extension">
        <?= $this->fireViewEvent('backend.auth.extendSigninView') ?>
    </div>

Он позволит другим плагинам внедрять HTML-код в эту область.

    Event::listen('backend.auth.extendSigninView', function($controller) {
        return '<a href="#">Sign in with Google!</a>';
    });

> **Примечание**: Первым параметром в обработчике события всегда будет вызывающий объект (контроллер).

Приведенный выше пример отобразит следующую разметку:

    <div class="footer-area-extension">
        <a href="#">Sign in with Google!</a>
    </div>

<a href="#usage-examples" name="usage-examples" class="anchor"></a>
## Примеры

Ниже приведены некоторые примеры того, как могут быть использованы события.

<a href="#extending-user-model" name="extending-user-model" class="anchor"></a>
### Пользователь

В этом примере показано, как можно изменить атрибут `$model->foo` модели `User`.

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

<a href="#extending-backend-form" name="extending-backend-form" class="anchor"></a>
### Форма

В этом примере показано, как можно добавить и удалить поле из формы редактирования пользователя.

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

> Не забудьте добавить `use Event` в верхнюю часть файла класса.

<a href="#extending-backend-list" name="extending-backend-list" class="anchor"></a>
### Список

В этом примере показано, как можно добавить и удалить столбец из списка с пользователями.

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

> Не забудьте добавить `use Event` в верхнюю часть файла класса.

<a href="#extending-component" name="extending-component" class="anchor"></a>
### Компонент

В этом примере показано, как можно добавить новое глобальное событие `rainlab.forum.topic.post` и локальное событие `topic.post` в компонент `Topic`.

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

Пример добавления записи в журнал при загрузке страницы с компонентом `Topic`:

```
[topic]
slug = "{{ :slug }}"
==
function onInit()
{
    $this['topic']->bindEvent('topic.post', function($post, $postUrl) {
        trace_log('A post has been submitted at '.$postUrl);
    });
}
```

<a href="#extending-backend-menu" name="extending-backend-menu" class="anchor"></a>
### Меню

В этом примере показано, как можно заменить название элемента меню в административной части сайта.

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

В этом примере показано, как можно удалить элемент меню в административной части сайта.

    Event::listen('backend.menu.extendItems', function($manager) {

        $manager->removeMainMenuItem('October.Cms', 'cms');
        $manager->removeSideMenuItem('October.Cms', 'cms', 'pages');

    });
