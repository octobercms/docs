# Регистрация плагина

<a name="introduction" class="anchor" ></a>
## Введение

Плагины являются основой для добавления новых функций в CMS, расширяя ее. В этой статье описывается процесс регистрации плагинов, который позволяет объявлять свои функции, такие как [компоненты](/docs/cms-components.md) или внешние меню и страницы. Примеры того, что может сделать плагин:

1. Определить [компоненты](/docs/cms-components.md).
1. Определить [права пользователя](../backend/users.md).
1. Добавить [страницу с настройками](../plugin/settings.md#backend-pages), [меню](#navigation-menus), [списки](../backend/lists.md) и [формы](../backend/forms.md).
1. Создать [структуру базы данных и внести в нее данные](../plugin/updates.md).
1. Изменить [функциональность ядра или других плагинов](../plugin/events.md).
1. Описать классы, [контроллеры](../backend/controllers-views-ajax.md), представления и другие файлы.

<a name="directory-structure" class="anchor" ></a>
### Структура плагина

Все плагины находятся в подпапке **/plugins**. Структура плагина выглядит следующим образом:

    plugins/
      acme/              <=== Author name
        blog/            <=== Plugin name
          classes/
          components/
          controllers/
          models/
          updates/
          ...
          Plugin.php     <=== Plugin registration file

Но не все плагины обязаны иметь такую структуру. Например, если Ваш плагин предусматривает только один [компонент](../plugin/components.md), то его содержимое может выглядеть так:

    plugins/
      acme/              <=== Author name
        blog/            <=== Plugin name
          components/
          Plugin.php     <=== Plugin registration file

> **Примечание:** если Вы являетесь разработчиком плагина для [Marketplace](../help/marketplace.md), то наличие файла [updates/version.yaml](#migrations-version-history) обязательно.

<a name="namespaces" class="anchor" ></a>
### Пространство имен

Пространства имен плагинов очень важны, особенно если планируется, что Ваш плагин будет опубликован в [Маркетплейсе](http://octobercms.com/plugins). При регистрации в Маркетплейсе, Вам будет предложено ввести авторский код, который будет использован в качестве корневого имени директории для всех Ваших плагинов. Вы можете ввести этот код только один раз, когда проходите регистрацию. По умолчанию Вам будет предложен авторский код от [Marketplace](../help/marketplace.md), состоящий из Вашего имени и фамилии. Например: VasyaPupkin. Помните, что данный код невозможно будет поменять после регистрации. Все файлы плагина должны быть определены в корневой папке Вашего плагина. Например: `\VasyaPupkin\Blog`.

<a name="registration-file" class="anchor" ></a>
## Файл регистрации

Файл **Plugin.php**, называемый как *Регистрационный файл плагина*  или *Файл регистрации плагина*, является скриптом инициализации, который объявляет основные функции и содержит в себе информацию о плагине. Он может содержать следующее:

- Информацию о плагине, его названии и авторе.
- Регистрацию методов для расширения CMS.

Скрипт регистрации должен содержать класс с именем `Plugin`, который расширяет `\System\Classes\PluginBase` класс. Единственным обязательным методом класса регистрации плагина является  `pluginDetails()`. Пример:

    namespace Acme\Blog;

    class Plugin extends \System\Classes\PluginBase
    {
        public function pluginDetails()
        {
            return [
                'name' => 'Blog Plugin',
                'description' => 'Provides some really cool blog features.',
                'author' => 'ACME Corporation',
                'icon' => 'icon-leaf'
            ];
        }

        public function registerComponents()
        {
            return [
                'Acme\Blog\Components\Post' => 'blogPost'
            ];
        }
    }

<a name="registration-methods" class="anchor" ></a>
### Поддерживаемые методы

Следующие методы могут содержаться в регистрационном файле плагина:

Метод | Описание
------------- | -------------
**pluginDetails()** | возвращает информацию о плагине.
**register()** | метод регистрации. Вызывается, когда плагин впервые инициализируется.
**boot()** | метод загрузки. Вызывается непосредственно перед маршрутизацией запроса.
**registerMarkupTags()** | метод регистрирует [дополнительные теги](#extending-twig), которые могут быть использованы в CMS.
**registerComponents()** | метод регистрирует [компоненты](../plugin/components.md#component-registration), используемые этим плагином.
**registerNavigation()** | метод регистрирует [элементы меню в административной части сайта](#navigation-menus).
**registerPermissions()** | метод регистрирует [права пользователей](../backend/users.md#permission-registration), используемые этим плагином.
**registerSettings()** | метод регистрирует [страницы с настройками](../plugin/settings.md#link-registration), используемые этим плагином.
**registerFormWidgets()** | метод регистрирует [виджеты с формами](../backend/widgets.md#form-widget-registration), используемые этим плагином.
**registerReportWidgets()** | метод регистрирует [виджеты с отчетами](../backend/widgets.md#report-widget-registration), включая виджеты для панели управления.
**registerMailTemplates()** | метод регистрирует [почтовые шаблоны](/plugin-mail.md#mail-template-registration).
**registerSchedule()** | метод регистрирует [задачи](../plugin/scheduling.md#defining-schedules), которые выполняются на регулярной основе.

<a name="basic-plugin-information" class="anchor" ></a>
### Основная информация о плагине

Метод `pluginDetails()` является обязательным методом класса регистрации плагина. Он должен возвращать массив, состоящий из 4 ключей:

Ключ | Описание
------------- | -------------
**name** | имя плагина, обязательно.
**description** | описание плагина, обязательно.
**author** | автор, обязательно.
**icon** | иконка плагина. Полный список доступных иконок можно найти в [UI документации](../ui/icon.md). Любое название иконок из этой коллекции, является действительным. Например: **icon-glass**, **icon-music**. Обязательно.
**iconSvg** | SVG иконка, которая заменяет стандартную иконку плагина, необязательно.
**homepage** | ссылка на сайт автора плагина, необязательно.

<a name="routing-initialization" class="anchor" ></a>
## Роутинг и инициализация

Файлы регистрации плагина могут содержать два метода: `boot()` и `register()`. С этими методами Вы можете делать всё, что только пожелаете: зарегистрировать маршруты или привязать обработчики к событиям.

Метод `register()` вызывается непосредственно в тот момент, когда плагин регистрируется. Метод `boot()` вызывается прямо перед маршрутизацией запроса. Таким образом, если Ваши действия зависят от другого плагина, Вы должны использовать метод загрузки. Например, внутри метода `boot()` Вы можете расширить модели:

    public function boot()
    {
        User::extend(function($model) {
            $model->hasOne['author'] = ['Acme\Blog\Models\Author'];
        });
    }

> **Примечание:** методы `boot()` и `register()` не вызываются в процессе обновления плагина, чтобы избежать критических ошибок.

Плагины могут содержать файл **routes.php**, в котором может находиться произвольная [логика маршрутизации](../services/router.md). Например:

    Route::group(['prefix' => 'api_acme_blog'], function() {

        Route::get('cleanup_posts', function(){ return Posts::cleanUp(); });

    });

<a name="dependency-definitions" class="anchor" ></a>
## Определения зависимостей

Работа Вашего плагина может зависеть от других плагинов. Для этого укажите их в свойстве `$require` в [Файле регистрации плагина](#registration-file). Пример:

    namespace Acme\Blog;

    class Plugin extends \System\Classes\PluginBase
    {
        /**
         * @var array Plugin dependencies
         */
        public $require = ['Acme.User'];

        [...]
    }

<a name="extending-twig" class="anchor" ></a>
## Twig

Пользовательские Twig фильтры и функции могут быть зарегистрированы в CMS при помощи метода `registerMarkupTags()` в Файле регистрации плагина. Пример:

    public function registerMarkupTags()
    {
        return [
            'filters' => [
                // A global function, i.e str_plural()
                'plural' => 'str_plural',

                // A local method, i.e $this->makeTextAllCaps()
                'uppercase' => [$this, 'makeTextAllCaps']
            ],
            'functions' => [
                // A static method call, i.e Form::open()
                'form_open' => ['October\Rain\Html\Form', 'open'],

                // Using an inline closure
                'helloWorld' => function() { return 'Hello World!'; }
            ]
        ];
    }

    public function makeTextAllCaps($text)
    {
        return strtoupper($text);
    }

<a name="navigation-menus" class="anchor" ></a>
## Меню

Плагины могут расширять меню в административной части сайта, переопределяя метод`registerNavigation()` в [Файле регистрации плагина](#registration-file). Пример:

    public function registerNavigation()
    {
        return [
            'blog' => [
                'label'       => 'Blog',
                'url'         => Backend::url('acme/blog/posts'),
                'icon'        => 'icon-pencil',
                'permissions' => ['acme.blog.*'],
                'order'       => 500,

                'sideMenu' => [
                    'posts' => [
                        'label'       => 'Posts',
                        'icon'        => 'icon-copy',
                        'url'         => Backend::url('acme/blog/posts'),
                        'permissions' => ['acme.blog.access_posts']
                    ],
                    'categories' => [
                        'label'       => 'Categories',
                        'icon'        => 'icon-copy',
                        'url'         => Backend::url('acme/blog/categories'),
                        'permissions' => ['acme.blog.access_categories']
                    ]
                ]
            ]
        ];
    }

Вы можете использовать [строки локализации](localization.md) для `label`. Вы также можете ограничить [доступ пользователей](../backend/users.md) к тем или иным пунктам меню.

[Настройте контекст](../backend/controllers-ajax.md#navigation-context), чтобы отобразить подменю в административной части сайта.
