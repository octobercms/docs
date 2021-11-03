# Настройка и конфигурация плагина

- [Введение](#introduction)
- [Настройка базы данных](#database-settings)
    - [Запись в модель с настройками](#writing-settings)
    - [Чтение из модели с настройками](#reading-settings)
- [Страницы с настройками](#backend-pages)
    - [Добавление ссылки на страницу с настройками в меню](#link-registration)
    - [Настройка контекста](#settings-page-context)
- [Файл конфигурации](#file-configuration)

<a name="introduction" class="anchor"></a>
## Введение

Существует два способа настройки плагина: при помощи форм в административном интерфейсе и при помощи файлов конфигурации. Формы предоставляют больше возможностей, но их применение требует особых знаний. Поэтому на начальном этапе разработки лучше использовать файлы с настройками.

<a name="database-settings" class="anchor"></a>
## Настройка базы данных

Вы можете создавать модели для хранения настроек в БД при помощи реализации поведения `SettingsModel` в классе модели. Эта модель может быть также использована для создания форм с настройками в административной части сайта. Вам не нужно самим создавать таблицы в базе данных и контроллеры для создания форм.

Класс с настройками модели должен расширять класс `Model` и реализовывать поведение `System.Behaviors.SettingsModel`. Модели с настройками, так же как и другие модели, должны находиться в подпапке **models** плагина. Модель в следующем примере должна находиться в `plugins/acme/demo/models/Settings.php`.

    <?php namespace Acme\Demo\Models;

    use Model;

    class Settings extends Model
    {
        public $implement = ['System.Behaviors.SettingsModel'];

        // A unique code
        public $settingsCode = 'acme_demo_settings';

        // Reference to field configuration
        public $settingsFields = 'fields.yaml';
    }

Свойство `$settingsCode` является обязательным для модели с настройками. Оно содержит уникальный ключ, который используется для сохранения настроек в базе данных.

Свойство `$settingsFields` также является обязательным, если Вы собираетесь добавить форму с настройками, используя эту модель. Свойство содержит имя YAML файла, в котором находится описание [полей](./backend-forms). Этот файл должен находиться в папке, название которой совпадает с названием класса модели. Для предыдущего примера структура папок должна выглядеть так:

    plugins/
      acme/
        demo/
          models/
            settings/        <=== Папка модели
              fields.yaml    <=== Поля
            Settings.php     <=== Файл с классом

Модели с настройками могут быть зарегистрированы в [регистрационном файле плагина](./plugin-registration#backend-settings), чтобы они появились на странице с настройками, но это не обязательно. Вы можете задавать и получать значения так же, как и в любых других моделях.

<a name="writing-settings" class="anchor"></a>
### Запись в модель с настройками

Модель с настройками имеет статический метод `set`, который позволяет сохранить отдельные или множественные значения. Вы также можете использовать стандартные функции модели для записи свойств модели и сохранения самой модели. Пример:

    use Acme\Demo\Models\Settings;

    ...

    // Set a single value
    Settings::set('api_key', 'ABCD');

    // Set an array of values
    Settings::set(['api_key' => 'ABCD']);

    // Set object values
    $settings = Settings::instance();
    $settings->api_key = 'ABCD';
    $settings->save();

<a name="reading-settings" class="anchor"></a>
### Чтение из модели с настройками

Модель с настройками имеет статический метод `get`, который позволяет получать отдельные значения. Кроме того, при создании экземпляра класса модели при помощи метода `instance`, Вы можете напрямую получить значения из БД.

    // Outputs: ABCD
    echo Settings::instance()->api_key;

    // Get a single value
    echo Settings::get('api_key');

    // Get a value and return a default value if it doesn't exist
    echo Settings::get('is_activated', true);


<a name="backend-pages" class="anchor"></a>
## Страницы с настройками

В административной части сайта находится специальный раздел с настройками и конфигурациями. В него можно попасть, если кликнуть на ссылку **Settings (Настройки)** в главном меню. Эта страница содержит список ссылок на странице с настройками, которые зарегистрированы системой или плагинами.

<a name="link-registration" class="anchor"></a>
### Добавление ссылки на страницу с настройками в меню

Список ссылок на страницы с настройками может быть изменен при помощи метода `registerSettings` внутри [класса регистрации плагина](./plugin-registration#registration-file). Когда Вы добавляете новую ссылку, то у Вас есть два пути: создать ссылку на определенную страницу или на страницу с моделью. В следующем примере показано, как создать ссылку на страницу:

    public function registerSettings()
    {
        return [
            'location' => [
                'label'       => 'Locations',
                'description' => 'Manage available user countries and states.',
                'category'    => 'Users',
                'icon'        => 'icon-globe',
                'url'         => Backend::url('acme/user/locations'),
                'order'       => 500,
                'keywords'    => 'geography place placement'
            ]
        ];
    }

> **Примечание:** Страницы с настройками должны определять [контекст](./plugin-settings#settings-page-context) для того, чтобы отметить соответствующий пункт в меню. Для модели контекст определяется автоматически.

Следующий пример показывает, как создать ссылку на модель с настройками.

    public function registerSettings()
    {
        return [
            'settings' => [
                'label'       => 'User Settings',
                'description' => 'Manage user based settings.',
                'category'    => 'Users',
                'icon'        => 'icon-cog',
                'class'       => 'Acme\User\Models\Settings',
                'order'       => 500,
                'keywords'    => 'security location',
                'permissions' => ['acme.users.access_settings']
            ]
        ];
    }

Произвольный параметр `keywords` используется для поиска. Если он не задан, то поиск будет производиться по метке и описанию.

<a name="settings-page-context" class="anchor"></a>
### Настройка контекста

Как и в [контроллере](./backend-controllers-views-ajax#navigation-context), страница с настройками должна определять контекст. Это необходимо для того, чтобы найти текущий пункт меню и сделать его активным. Обычно это делается в конструкторе контроллера:

    public function __construct()
    {
        parent::__construct();

        [...]

        BackendMenu::setContext('October.System', 'system', 'settings');
        SettingsManager::setContext('You.Plugin', 'settings');
    }

Первый аргумент метода `setContext` - **author.plugin**. Далее идет ключ, который вы указали в методе `registerSettings`.

<a name="file-configuration" class="anchor"></a>
## Файл конфигурации

Плагины могут содержать в себе конфигурационный файл `config.php` в подпапке `config`. Пример содержимого файла:

    <?php

    return [
        'maxItems' => 10,
        'display' => 5
    ];

Используйте класс `Config` для получения доступа к значениям, которые определены в конфигурационном файле. Метод `Config::get($name, $default=null)` принимает в качестве первого параметра имя в следующем формате: **Acme.Demo::maxItems**. Второй параметр определяет значение по умолчанию, которое нужно вернуть, если конфигурационный параметр не существует. Пример:

    use Config;

    ...

    $maxItems = Config::get('acme.demo::maxItems', 50);

Настройки плагина могут быть перезаписаны в файле `config/ИМЯАВТОРА/НАЗВАНИЕПЛАГИНА/config.php`. Внутри файла Вы можете вернуть только те параметры, которые Вы хотите перезаписать:

    <?php

    return [
        'maxItems' => 20
    ];

Если Вы хотите использовать различные настройки для разных окружений (**dev**, **production** и т.д.), то просто создайте еще один файл в `config/ИМЯАВТОРА/НАЗВАНИЕПЛАГИНА/ОКРУЖЕНИЕ/config.php`. Пример:

**config/author/plugin/production/config.php:**

    <?php

    return [
        'maxItems' => 25
    ];

Теперь, когда `APP_ENV` - **production**, `maxItems` будет равен 25.
