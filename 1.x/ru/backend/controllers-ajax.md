# Контроллеры, Представления и AJAX

<a href="#introduction" name="introduction" class="anchor" ></a>
## Введение

В OctoberCMS имплементирован MVC паттерн. Контроллеры управляют административными страницами и реализуют различный функционал вроде форм и списков. В этой статье описано, как с ними работать.

Контроллер представляет из себя PHP скрипт, который находится в папке **/plugins/author/pluginName/controllers**. Представления контроллера - это **htm** файлы, находящиеся в папке, название которой совпадает с именем класса контроллера и должно быть написано строчными буквами. Папка с представлениями может также содержать файлы с настройками. Пример:

    plugins/
      acme/
        blog/
          controllers/
            users/                <=== папка с представлениями
              _partial.htm        <=== фрагмент
              config_form.yaml    <=== файл с настройками
              index.htm           <=== основной файл представления
            Users.php             <=== класс контроллера
          Plugin.php

<a name="class-definition" class="anchor" ></a>
### Создание контроллера

Класс контроллера должен расширять класс `\Backend\Classes\Controller`. Как и любой класс плагина, он также должен принадлежать [пространству имен](./plugin-registration#namespaces). Пример:

    namespace Acme\Blog\Controllers;

    class Posts extends \Backend\Classes\Controller {

        public function index()    // <=== Действие
        {

        }
    }

Обычно каждый контроллер работает только с одним типом данных (записи в блоге, категории и т.д.).

<a name="controller-properties" class="anchor" ></a>
### Свойства контроллера

Основной класс контроллера имеет несколько свойств, которые позволяют настроить страницу нужным Вам образом:

Property | Description
------------- | -------------
**$fatalError** | позволяет хранить фатальные ошибки, чтобы потом отобразить их в представлении.
**$user** | содержит ссылку на объект пользователя.
**$suppressView** | позволяет предотвратить отображение представления. Может быть обновлен в методе действия или в конструкторе контроллера.
**$params** | массив параметров маршрутизации.
**$action** | имя метода действия, который будет выполнен при текущем запросе.
**$publicActions** | определяет массив действий, которые доступны без авторизации пользователя. Переменную можно переопределить в классе контроллера.
**$requiredPermissions** | права, которые необходимо иметь для просмотра этой страницы (см. [Пользователи и права](./backend-users)).
**$pageTitle** | заголовок страницы. Может быть изменен в методах действия.
**$bodyClass** | добавляет класс к тегу body. Используется для настройки шаблона. Переменная может быть определена в конструкторе контроллера.
**$guarded** | cетоды, которые не могут быть вызваны в качестве действий. Список может быть расширен в конструкторе контроллера.
**$layout** | опрделяет произвольный шаблон для контроллера (см. [шаблоны](#layouts)).

<a name="actions-views-routing" class="anchor" ></a>
## Действия, представления и маршрутизация

Публичные методы контроллера, называемые **actions** или **действия**, соединены с **файлами представлений** страниц. В представлениях можно использовать HTML и PHP код. Пример содержимого файла **index.htm**, который соответствует действию **index**:

    <h1>Hello World</h1>

URL этой страницы состоит из имени автора, названия плагина, названия контроллера и названия действия:

    http://yoursite.com/backend/acme/blog/users/index

    backend/[author name]/[plugin name]/[controller name]/[action name]

<a name="passing-data-to-views" class="anchor" ></a>
## Передача данных в представление

Вы можете передавать любые значения напрямую в представление при помощи свойства `$vars`:

    $this->vars['var'] = 'value';

Пример содержимого файла представления:

    <p>The variable value is <?= $var ?></p>

<a name="navigation-context" class="anchor" ></a>
## Настройка контекста навигации

Плагины могут создавать меню и подменю в административной части сайта. Контекст навигации определяет активный пункт. Он задается при помощи класса `BackendMenu`:

    BackendMenu::setContext('Acme.Blog', 'blog', 'categories');

Первый параметр - имя автора и название плагина. Второй - активный пункт меню. Третий - активный пункт подменю. Обычно `BackendMenu::setContext()` вызывается в конструкторе контроллера:

    namespace Acme\Blog\Controllers;

    class Categories extends \Backend\Classes\Controller {

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Acme.Blog', 'blog', 'categories');
    }

Вы также можете задать свое название страницы при помощи свойства класса контроллера `$pageTitle`:

    $this->pageTitle = 'Blog categories';

<a name="ajax" class="anchor" ></a>
## AJAX

В административной части сайта Вы можете использовать все возможности [AJAX](./cms-ajax).

<a name="ajax-handlers" class="anchor" ></a>
### Обработчики

Обработчики AJAX могут быть определены в классе контроллера или [виджета](./backend-widgets). В классе контроллера они определены как публичные методы с названием, начинающимся с "on": **onCreateTemplate**, **onGetTemplateList** и т.д.

Обработчики могут вернуть массив данных, исключение или перенаправление на другую страницу. Вы можете использовать фрагменты при помощи метода `makePartial()` для отображения и обновления содержимого.

    public function onOpenTemplate()
    {
        if (Request::input('someVar') != 'someValue')
            throw new ApplicationException('Invalid value');

        return [
            'partialContents' => $this->makePartial('some_partial', [
                'var' => 'value'
            ])
        ];
    }

<a name="triggering-ajax-requests" class="anchor" ></a>
### Триггеры

Вы можете использовать AJAX при помощи **Data Attributes API** или **JavaScript API** (см. [AJAX](./cms-ajax)). Пример:

    <button
        type="button"
        data-request="onDoSomething"
        class="btn btn-default">
        Do something
    </button>
