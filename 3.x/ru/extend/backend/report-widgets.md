---
subtitle: Виджет, специально созданный для использования на дашборде.
---
# Виджеты отчётов

Виджеты отчётов могут использоваться на дашборде панели управления и в других контейнерах отчётов. Виджеты отчётов должны быть зарегистрированы в [файле регистрации плагина](../extending.md).

Классы виджетов отчётов находятся внутри директории **reportwidgets** плагина. Как и любой другой класс плагина, контроллеры общих виджетов должны принадлежать пространству имён плагина. Как и все виджеты панели управления, виджеты отчётов используют частичные представления и специальную структуру директорий. Пример структуры директории:

::: dir
├── `reportwidgets`
|   ├── trafficsources
|   |   └── partials
|   |       └── _widget.php  _← Файл частичного представления_
|   └── TrafficSources.php  _← Класс виджета_
:::

## Определение класса

Команда `create:reportwidget` генерирует виджет отчёта панели управления, представление и базовые файлы ресурсов. Первый аргумент указывает имя автора и плагина. Второй аргумент указывает имя класса виджета отчёта.

```bash
php artisan create:reportwidget Acme.Blog TopPosts
```

Классы виджетов отчётов должны наследовать класс `Backend\Classes\ReportWidgetBase`. Пример определения класса виджета отчёта. Класс должен переопределить метод `render` для рендеринга разметки виджета.

```php
namespace RainLab\GoogleAnalytics\ReportWidgets;

use Backend\Classes\ReportWidgetBase;

class TrafficSources extends ReportWidgetBase
{
    public function render()
    {
        return $this->makePartial('widget');
    }
}
```

Частичное представление виджета может содержать любую HTML-разметку, которую вы хотите отобразить в виджете. Разметка должна быть обёрнута в DIV-элемент с классом **report-widget**. Для вывода заголовка виджета предпочтительно использовать элемент H3. Пример частичного представления виджета:

```html
<div class="report-widget">
    <h3>Traffic sources</h3>

    <div
        class="control-chart"
        data-control="chart-pie"
        data-size="200"
        data-center-text="180">
        <ul>
            <li>Direct <span>1000</span></li>
            <li>Social networks <span>800</span></li>
        </ul>
    </div>
</div>
```

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/traffic-sources.png)

Внутри виджетов отчётов вы можете использовать любые [диаграммы или индикаторы](https://octobercms.com/docs/ui/chart), списки или любую другую разметку по вашему желанию. Помните, что виджеты отчётов наследуют общие виджеты панели управления, и вы можете использовать любую функциональность виджетов в своих виджетах отчётов. Следующий пример показывает разметку виджета отчёта со списком.

```html
<div class="report-widget">
    <h3>Top pages</h3>

    <div class="table-container">
        <table class="table data" data-provides="rowlink">
            <thead>
                <tr>
                    <th><span>Page URL</span></th>
                    <th><span>Pageviews</span></th>
                    <th><span>% Pageviews</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>/</td>
                    <td>90</td>
                    <td>
                        <div class="progress">
                            <div class="bar" style="90%"></div>
                            <a href="/">90%</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>/docs</td>
                    <td>10</td>
                    <td>
                        <div class="progress">
                            <div class="bar" style="10%"></div>
                            <a href="/docs">10%</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
```

## Свойства виджета отчёта

Виджеты отчётов могут иметь свойства, которыми пользователи могут управлять с помощью Inspector:

![image](https://raw.githubusercontent.com/octobercms/docs/develop/images/report-widget-inspector.png)

Свойства должны быть определены в методе `defineProperties` класса виджета. Свойства описаны в [типах Inspector](../../element/inspector-types.md).

```php
public function defineProperties()
{
    return [
        'title' => [
            'title' => 'Widget title',
            'default' => 'Top Pages',
            'type' => 'string',
            'validation' => [
                'required' => [
                    'message' => 'The Widget Title is required.'
                ],
            ]
        ],
        'days' => [
            'title' => 'Number of days to display data for',
            'default' => '7',
            'type' => 'string',
            'validation' => [
                'regex' => [
                    'message' => 'The days property can contain only numeric symbols.',
                    'pattern' => '^[0-9]+$'
                ]
            ]
        ]
    ];
}
```

## Регистрация виджета отчёта

Плагины могут регистрировать виджеты отчётов, переопределяя метод `registerReportWidgets` в [файле регистрации плагина](../extending.md). Метод должен возвращать массив, содержащий классы виджетов в ключах и конфигурацию виджета (метку, контекст и необходимые разрешения) в значениях.

```php
public function registerReportWidgets()
{
    return [
        \RainLab\GoogleAnalytics\ReportWidgets\TrafficOverview::class => [
            'label' => 'Google Analytics traffic overview',
            'context' => 'dashboard',
            'permissions' => [
                'rainlab.googleanalytics.widgets.traffic_overview',
            ],
        ],
        \RainLab\GoogleAnalytics\ReportWidgets\TrafficSources::class => [
            'label' => 'Google Analytics traffic sources',
            'context' => 'dashboard',
            'permissions' => [
                'rainlab.googleanaltyics.widgets.traffic_sources',
            ],
        ]
    ];
}
```

Элемент **label** определяет имя виджета для всплывающего окна добавления виджета. Элемент **context** определяет контекст, в котором виджет может использоваться. Система виджетов отчётов October позволяет размещать контейнер отчётов на любой странице, и имя контекста контейнера уникально. Контейнер виджетов на странице дашборда использует контекст **dashboard**.
