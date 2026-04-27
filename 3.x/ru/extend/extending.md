---
subtitle: Узнайте об общих методах расширения October CMS.
---
# Методология расширения

## Расширение через регистрацию плагина

Практически во всех ситуациях расширение October CMS происходит в файле регистрации плагина, который по сути является [сервис-провайдером Laravel](https://laravel.com/docs/10.x/providers). Файл регистрации называется **Plugin.php** и находится в корневой директории плагина.

Следующие методы расширения доступны для переопределения в классе регистрации плагина:

Метод | Описание
------------- | -------------
**register()** | вызывается при первой регистрации плагина, вызывается перед `boot`.
**boot()** | вызывается непосредственно перед маршрутизацией запроса, вызывается после `register`.
**registerMarkupTags()** | регистрирует [дополнительные теги разметки](./twig-tags.md), которые могут использоваться в CMS.
**registerComponents()** | регистрирует любые [CMS-компоненты](./cms-components.md), используемые этим плагином.
**registerNavigation()** | регистрирует [элементы навигации панели управления](./backend/navigation.md) для этого плагина.
**registerPermissions()** | регистрирует любые [разрешения панели управления](./backend/permissions.md), используемые этим плагином.
**registerSettings()** | регистрирует любые [ссылки конфигурации панели управления](./settings/settings.md), используемые этим плагином.
**registerFormWidgets()** | регистрирует любые [виджеты форм панели управления](./forms/form-widgets.md), предоставляемые этим плагином.
**registerReportWidgets()** | регистрирует любые [виджеты отчётов панели управления](./backend/report-widgets.md), включая виджеты дашборда.
**registerListColumnTypes()** | регистрирует любые [пользовательские типы столбцов списка](./lists/list-controller.md), предоставляемые этим плагином.
**registerMailTemplates()** | регистрирует любые [шаблоны почтовых представлений](./system/sending-mail.md), предоставляемые этим плагином.
**registerMailLayouts()** | регистрирует любые [макеты почтовых представлений](./system/sending-mail.md), предоставляемые этим плагином.
**registerMailPartials()** | регистрирует любые [частичные почтовые представления](./system/sending-mail.md), предоставляемые этим плагином.
**registerSchedule()** | регистрирует [запланированные задачи](./system/scheduling.md), выполняемые на регулярной основе.
**registerContentFields()** | регистрирует [контентные поля](../extend/tailor-fields.md), используемые чертежами Tailor.

## Расширение через события

[Сервис событий](./services/event.md) является основным способом инъекции или модификации функциональности классов ядра или других плагинов. Этот сервис может быть импортирован для использования в любом классе путём добавления `use Event` в начало вашего PHP-файла (после объявления пространства имён) для импорта фасада Event.

### Подписка на события

Наиболее распространённое место для подписки на событие — метод `boot` файла регистрации плагина. Например, когда пользователь впервые регистрируется, вы можете захотеть добавить его в сторонний список рассылки — это можно сделать, подписавшись на глобальное событие `rainlab.user.register`.

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

Того же можно добиться, расширив конструктор модели и используя локальное событие.

```php
User::extend(function ($model) {
    $model->bindEvent('user.register', function () use ($model) {
        // Code to register $model->email to mailing list
    });
});
```

### Объявление / Генерация событий

Генерируйте локальные события, вызывая `fireEvent()` на экземпляре объекта, реализующего `October\Rain\Support\Traits\Emitter`. Поскольку локальные события генерируются только для конкретного экземпляра объекта, нет необходимости добавлять пространство имён, так как менее вероятно, что в проекте будет несколько событий с одинаковым именем, генерируемых на одних и тех же объектах в локальном контексте.

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
```

Глобальные события генерируются вызовом `Event::fire()`. Поскольку эти события являются глобальными для всего приложения, лучшей практикой является добавление пространства имён, включающего информацию о разработчике в название события. Если автор вашего плагина — ACME, а имя плагина — Blog, то любые глобальные события, предоставляемые плагином ACME.Blog, должны иметь префикс `acme.blog`.

```php
Event::fire('acme.blog.post.beforePost', [$firstParam, $secondParam]);
```

Если одновременно предоставляются и глобальные, и локальные события, лучшей практикой является генерация локального события перед глобальным, чтобы локальное событие имело приоритет. Кроме того, глобальное событие должно предоставлять экземпляр объекта, на котором было сгенерировано локальное событие, в качестве первого параметра.

```php
$this->fireEvent('post.beforePost', [$firstParam, $secondParam]);
Event::fire('rainlab.blog.beforePost', [$this, $firstParam, $secondParam]);
```

После подписки на это событие параметры доступны в методе обработчика. Например:

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

## Расширение представлений панели управления

Иногда вам может потребоваться разрешить расширение файла представления или частичного представления панели управления, например панели инструментов. Это возможно с помощью метода `fireViewEvent`, доступного во всех контроллерах панели управления.

Поместите этот код в ваш файл представления:

```php
<div class="footer-area-extension">
    <?= $this->fireViewEvent('backend.auth.extendSigninView', [$firstParam]) ?>
</div>
```

Это позволит другим плагинам внедрять HTML в эту область, подключаясь к событию и возвращая нужную разметку.

```php
Event::listen('backend.auth.extendSigninView', function ($controller, $firstParam) {
    return '<a href="#">Sign in with Google!</a>';
});
```

::: tip
Первый параметр в обработчике события всегда будет вызывающим объектом (контроллером).
:::

Приведённый выше пример выведет следующую разметку:

```html
<div class="footer-area-extension">
    <a href="#">Sign in with Google!</a>
</div>
```

## Примеры использования

Вот несколько практических примеров использования событий.

### Расширение модели пользователя

Этот пример модифицирует событие `model.getAttribute` модели `User`, привязываясь к её локальному событию. Это выполняется внутри метода `boot` файла регистрации плагина. В обоих случаях при обращении к атрибуту `$model->foo` будет возвращено значение **bar**.

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

Для добавления валидации модели для введённых полей подключитесь к событию `beforeValidate` и выбросьте исключение `ValidationException`.

```php
User::extend(function ($model) {
    $model->bindEvent('model.beforeValidate', function () use ($model) {
        if (!$model->billing_first_name) {
            throw new \ValidationException(['billing_first_name' => 'First name is required']);
        }
    });
});
```

### Расширение форм панели управления

::: aside
Существует несколько способов расширения форм панели управления, подробнее см. в [статье о контроллере форм](./forms/form-controller.md).
:::

Этот пример прослушивает глобальное событие `backend.form.extendFields` виджета `Backend\Widget\Form` и внедряет дополнительные поля, когда виджет формы используется для модификации пользователя. Это событие также подписывается внутри метода `boot` файла регистрации плагина.

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
Вы также можете использовать событие `backend.form.extendFieldsBefore` для добавления полей.
:::

### Расширение списка панели управления

Этот пример модифицирует глобальное событие `backend.list.extendColumns` класса `Backend\Widget\Lists` и внедряет дополнительные значения столбцов при условии, что список используется для модификации пользователя. Это событие также подписывается внутри метода `boot` файла регистрации плагина.

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

### Расширение компонента

Этот пример объявляет новое глобальное событие `rainlab.forum.topic.post` и локальное событие `topic.post` внутри компонента `Topic`. Это выполняется в [определении класса компонента](./cms-components.md).

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

Далее демонстрируется, как подключиться к этому новому событию из [жизненного цикла выполнения макета](../cms/themes/layouts.md). Это запишет в журнал трассировки, когда обработчик события `onPost` вызывается внутри компонента `Topic` (выше).

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

#### См. также

::: also
* [Сервис событий](./services/event.md)
:::
