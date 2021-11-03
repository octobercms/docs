# Создание компонента

<a name="introduction"></a>
## Введение

Файлы и папки компонента находятся в папке плагина в подпапке **/components**. Каждый компонент имеет свой PHP файл, в котором находится класс, описывающий этот компонент, и необязательную папку с фрагментами. Название этой папки должно быть написано строчными буквами и совпадать с названием класса компонента. Пример:

    plugins/
      acme/
        myplugin/
          components/
            componentname/       <=== Component partials directory
              default.htm        <=== Component default markup (optional)
            ComponentName.php    <=== Component class file
          Plugin.php

<a name="component-class-definition"></a>
## Определение класса компонента

**Файл с классом компонента** содержит в себе [свойства](#component-properties) и возможности компонента. Его название должно совпадать с названием класса. Этот класс должен расширять класс `\Cms\Classes\ComponentBase`. Пример содержимого файла plugins/acme/blog/components/BlogPosts.php:

```php
namespace Acme\Blog\Components;

class BlogPosts extends \Cms\Classes\ComponentBase
{
    public function componentDetails()
    {
        return [
            'name' => 'Blog Posts',
            'description' => 'Displays a collection of blog posts.'
        ];
    }

    // This array becomes available on the page as {{ component.posts }}
    public function posts()
    {
        return ['First Post', 'Second Post', 'Third Post'];
    }
}
```

Метод `componentDetails()` является обязательным и должен вернуть массив с двумя ключами: `name` и `description`.  Имя и описание отображаются в административном интерфейсе сайта.

Когда компонент добавлен на страницу или в шаблон, его методы и свойства становятся доступными для использования через переменную компонента, которая совпадает с его названием или алиасом. Пример добавления компонента BlogPost на страницу:

    url = "/blog"

    [blogPosts]
    ==

Теперь Вы можете получить доступ к методу `posts()` через переменную `blogPosts`.

```twig
{% for post in blogPosts.posts %}
    {{ post }}
{% endfor %}
```

<a name="component-registration"></a>
### Регистрация компонента

Все компоненты должны быть указаны в методе `registerComponents()` [класса регистрации плагина](../plugin/registration.md#component-registration). Пример регистрации компонента:

    public function registerComponents()
    {
        return [
            'October\Demo\Components\Todo' => 'demoTodo'
        ];
    }

Теперь компонент **Todo** с алиасом **demoTodo** доступен для использования. Вы можете найти больше информации в разделе [Компоненты](../cms/components.md).

<a name="component-properties"></a>
## Свойства компонента

Когда Вы добавляете компонент на страницу или шаблон, то Вы также можете изменять его свойства. Свойства компонента определяются при помощи метода `defineProperties()` в классе компонента. Пример:

    public function defineProperties()
    {
        return [
            'maxItems' => [
                 'title'             => 'Max items',
                 'description'       => 'The most amount of todo items allowed',
                 'default'           => 10,
                 'type'              => 'string',
                 'validationPattern' => '^[0-9]+$',
                 'validationMessage' => 'The Max Items property can contain only numeric symbols'
            ]
        ];
    }

Метод должен вернуть массив с названием свойств и их параметрами. Название свойства используется для доступа к его значениям в классе компонента. Параметры свойств:

Key | Description
------------- | -------------
**title** | обязательное. Название свойства (используется в административном интерфейсе).
**description** | обязательное. Описание свойства (используется в административном интерфейсе).
**default** | необязательное. Значение свойства по умолчанию.
**type** | необязательное. Тип свойства. Допустимые типы: **string**, **checkbox** и **dropdown**. По умолчанию: **string**.
**validationPattern** | необязательное. Регулярное выражение для проверки значения свойства. Применяется только к свойствам типа **string**.
**validationMessage** | сообщение об ошибке, если значение не прошло проверку.
**required** | необязательное. Указывает на то, что поле является обязательным для заполнения. Использует validationMessage при пустом значении.
**placeholder** | placeholder для свойств типа **string** и **dropdown**.
**options** | массив опций для свойств типа **dropdown**.
**depends** | массив с именами свойств, от которых зависит свойство типа **dropdown**. См. [ниже](#dropdown-properties).
**group** | необязательное. Группирует несколько свойств в fieldset.
**showExternalParam** | определяет возможность ввода произвольного параметра (стрелочка справа в текстовом поле). По умолчанию:  **true**.

Внутри компонента Вы можете получить значение свойства при помощи метода `property()`:

    $this->property('maxItems');

Если значение не определено, то Вы можете подставить значение по умолчанию в качестве второго аргумента метода `property()`:

    $this->property('maxItems', 6);

Вы также можете получить все свойства в виде массива:

    $properties = $this->getProperties();

<a name="dropdown-properties"></a>
### Выпадающий список

Опции выпадающего списка могут быть статическими или динамическими. Статические опции задаются в виде массива и присваиваются элементу `options` массива, который описывает свойство. Пример:

    public function defineProperties()
    {
        return [
            'units' => [
                'title'       => 'Units',
                'type'        => 'dropdown',
                'default'     => 'imperial',
                'placeholder' => 'Select units',
                'options'     => ['metric'=>'Metric', 'imperial'=>'Imperial']
            ]
        ];
    }

Чтобы задать опции динамически, нужно удалить элемент `options` из массива, описывающий свойство, и определить метод, который будет их возвращать. Метод должен иметь название в следующем формате: `get*Property*Options()`, где **Property** - имя свойства. Пример:

    public function defineProperties()
    {
        return [
            'country' => [
                'title'   => 'Country',
                'type'    => 'dropdown',
                'default' => 'us'
            ]
        ];
    }

    public function getCountryOptions()
    {
        return ['us'=>'United states', 'ca'=>'Canada'];
    }

Динамический выпадающий список может зависеть от других свойств. Например, список с областями может зависеть от выбранной страны. Зависимость устанавливается при помощи параметра `depends` в массиве с описанием свойства. Пример:

    public function defineProperties()
    {
        return [
            'country' => [
                'title'       => 'Country',
                'type'        => 'dropdown',
                'default'     => 'us'
            ],
            'state' => [
                'title'       => 'State',
                'type'        => 'dropdown',
                'default'     => 'dc',
                'depends'     => ['country'],
                'placeholder' => 'Select a state'
            ]
        ];
    }

Для того, чтобы получить список областей, Вы должны знать выбранную страну. Инспектор отправляет все значения в обработчик `getPropertyOptions()`. Таким образом, Вы можете сделать следующее:

    public function getStateOptions()
    {
        $countryCode = Request::input('country'); // Load the country property value from POST

        $states = [
            'ca' => ['ab'=>'Alberta', 'bc'=>'British columbia'],
            'us' => ['al'=>'Alabama', 'ak'=>'Alaska']
        ];

        return $states[$countryCode];
    }

<a name="page-list-properties"></a>
### Список страниц

Иногда в компонентах нужно сделать выпадающий список с выбором страницы. В следующем примере показано, как это сделать:

    public function defineProperties()
    {
            return [
                'postPage' => [
                    'title' => 'Post page',
                    'type' => 'dropdown',
                    'default' => 'blog/post'
                ]
            ];
    }

    public function getPostPageOptions()
    {
        return Page::sortBy('baseFileName')->lists('baseFileName', 'baseFileName');
    }

<a name="routing-parameters"></a>
## Параметры маршрутизации

Компоненты могут получить доступ к параметрам маршрутизации, которые определяются в [URL страницы](../cms/pages.md#url-syntax).

    // Returns the URL segment value, eg: /page/:post_id
    $postId = $this->param('post_id');

Также для этого Вы можете использовать свойства компонента.

Вариант 1:

    url = "/blog/hard-coded-page"

    [blogPost]
    id = "2"

Вариант 2:

```
url = "/blog/:my_custom_parameter"

[blogPost]
id = "{{ :my_custom_parameter }}"
```

В обоих случаях Вы можете получить значение при помощи метода `property()`:

    $this->property('id');

Используйте метод `paramName()`, чтобы получить имя параметра:

    $this->paramName('id'); // Вернет "my_custom_parameter"

<a name="page-cycle"></a>
## Обработка цикла выполнения страницы

Компоненты могут быть включены в события обработки страницы при помощи переопределения метода `onRun()` в классе компонента. CMS будет выполнять этот метод каждый раз, когда будет загружена страница или шаблон. Внутри этого метода Вы можете определять переменные, доступные на странице шаблона, через свойство `page`:

    public function onRun()
    {
        // This code will be executed when the page or layout is
        // loaded and the component is attached to it.

        $this->page['var'] = 'value'; // Inject some variable to the page
    }

<a name="page-cycle-handlers"></a>
### Обработчики страницы

Когда страница загружается, OctoberCMS выполняет функции, которые могут быть определены в [PHP секции](../cms/themes.md#php-section) страницы, шаблона или в классе компонента. Последовательность выполнения обработчиков:

1. `onInit()` - функция шаблона.
1. `onInit()` - функция страницы.
1. `onStart()` - функция шаблона.
1. `onRun()` - метод компонента, привязанного к шаблону.
1. `onBeforePageStart()` - функция шаблона.
1. `onStart()` - функция страницы.
1. `onRun()` - метод компонента, привязанного к странице.
1. `onEnd()` - функция страницы.
1. `onEnd()` - функция шаблона.

<a name="page-cycle-init"></a>
### Инициализация компонента

Иногда вам может потребоваться выполнить код во время создания экземпляра класса компонента. Вы можете переопределить метод `init` в классе компонентов для обработки любой логики инициализации, который будет выполняться до обработчиков AJAX и до жизненного цикла выполнения страницы. Например, этот метод можно использовать для динамического присоединения другого компонента к странице.

    public function init()
    {
        $this->addComponent('Acme\Blog\Components\BlogPosts', 'blogPosts');
    }

<a name="page-cycle-response"></a>
### Завершение с ответом

Также как и все методы [жизненного цикла выполнения страницы](../cms/layouts.md#layout-life-cycle), метод `onRun()` в компоненте может остановить цикл и вернуть ответ браузеру. Пример с сообщением об отказе в доступе:

    public function onRun()
    {
        if (true) {
            return Response::make('Access denied!', 403);
        }
    }

<a name="ajax-handlers"></a>
## AJAX-обработчики

Компоненты могут обрабатывать события AJAX. Обработчики задаются в классе компонента так же, как и в [странице или шаблоне](../cms/ajax.md#ajax-handlers). Пример обработчика:

    public function onAddItem()
    {
        $value1 = post('value1');
        $value2 = post('value2');
        $this->page['result'] = $value1 + $value2;
    }

Более подробно об использовании AJAX в компонентах написано [в этой статье](../cms/ajax.md#components-ajax-handlers).

<a name="default-markup"></a>
## Разметка по умолчанию

Компонент по умолчанию может выводить произвольный html код при помощи фрагментов, которые находятся в папке **/plugins/AUTHOR/PLUGINNAME/components/COMPONENTNAME/**. Изначально там находится только один файл - **default.htm**, который выводит свое содержимое на страницу или в шаблон в том месте, где вставлен тег `{% component %}`. Пример:

    url = "/todo"

    [demoTodo]
    ==
    {% component 'demoTodo' %}

Шаблон по умолчанию также может принимать параметры, которые переопределяют [свойства компонента](#component-properties), в момент отображения:

    {% component 'demoTodo' maxItems="7" %}

Эти параметры не будут доступны в методе `onRun()` (так как они задаются после отображения страницы), но их можно использовать в методе `onRender()` класса компонента перед тем, как будет отображен шаблон по умолчанию.

    public function onRender()
    {
        // This code will be executed before the default component
        // markup is rendered on the page or layout.

        $this->page['var'] = 'Maximum items allowed: ' . $this->property('maxItems');
    }

<a name="component-partials"></a>
## Фрагменты компонента

В дополнение к разметке по умолчанию, компоненты также могут использовать фрагменты. Если у компонента Demo ToDo есть фрагмент с навигацией, то он будет находиться в **/plugins/october/demo/components/todo/pagination.htm** и отображаться на странице, используя:

```twig
{% partial 'demoTodo::pagination' %}
```

Вы можете использовать контекстно-зависимый метод для отображения фрагмента. Если он вызывается внутри фрагмента компонента, то будет ссылаться на самого себя. Если он вызывается внутри фрагмента темы, то будет сканировать все компоненты, используемые на странице/шаблоне, и использовать их.

A relaxed method can be used that is contextual. If called inside a component partial, it will directly refer to itself. If called inside a theme partial, it will scan all components used on the page/layout for a matching partial name and use that.

```twig
{% partial '@pagination' %}
```

Несколько компонентов могут использовать фрагмент, который находится в папке **components/partials**, как запасной вариант, когда обычный фрагмент компонента не может быть найден.
Например, общий фрагмент, расположенный в **/plugins/acme/blog/components/partials/shared.htm**, может быть отображен на странице любым компонентом таким образом:

```twig
{% partial '@shared' %}
```

<a name="referencing-self"></a>
### "self"

Компонент может ссылаться на самого себя в фрагментах при помощи переменной `__SELF__`. По умолчанию она вернет название компонента или [алиас](../cms/components.md#aliases).

```twig
<form data-request="{{__SELF__}}::onEventHandler">
    [...]
</form>
```

Компоненты могут также ссылаться на свои собственные свойства.

```twig
{% for item in __SELF__.items() %}
    {{ item }}
{% endfor %}
```

Пример вывода фрагмента в фрагменте:

```twig
{% partial __SELF__~"::screenshot-list" %}
```

<a name="unique-identifier"></a>
### Уникальный идентификатор

Если компонент вызывается дважды на одной и той же странице, то свойство `id` может быть использовано для ссылки на каждый экземпляр.

```twig
{{__SELF__.id}}
```

При обновлении страницы ID изменяется:

```twig
<!-- ID: demoTodo527c532e9161b -->
{% component 'demoTodo' %}

<!-- ID: demoTodo527c532ec4c33 -->
{% component 'demoTodo' %}
```

<a name="render-partial-method"></a>
## Отображение фрагментов из кода

Вы можете отобразить фрагменты компонента при помощи метода `renderPartial`. Он проверит компонент на наличие фрагмента `component-partial.htm` и вернет результат в виде строки. Второй аргумент используется для передачи произвольных переменных.

    $content = $this->renderPartial('component-partial.htm');

    $content = $this->renderPartial('component-partial.htm', [
        'name' => 'John Smith'
    ]);

Пример отображения фрагмента при помощи [AJAX-обработчика](../cms/ajax.md#ajax-handlers):

    function onGetTemplate()
    {
        return ['#someDiv' => $this->renderPartial('component-partial.htm')];
    }

Другой пример показывает, как можно переопределить весь ответ на просмотр страницы, возвращая XML-ответ при помощи фасада `Response` из метода `onRun`:

    public function onRun()
    {
        $content = $this->renderPartial('default.htm');
        return Response::make($content)->header('Content-Type', 'text/xml');
    }

<a name="component-assets"></a>
## Добавление CSS и JS файлов на страницу

Компоненты могут добавлять CSS или JS файлы на страницу или в шаблон при помощи методов `addCss()` и `addJs()` соответственно. Их можно использовать в методе `onRun()`. Пример:

    public function onRun()
    {
        $this->addJs('/plugins/acme/blog/assets/javascript/blog-controls.js');
    }

Если путь до файла начинается с (/), тогда он будет относительно корня сайта, иначе - папки компонента.
