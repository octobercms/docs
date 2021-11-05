# Виджеты

Виджеты - автономные элементы страницы, которые выполняют различные задачи. Они всегда имеют пользовательский интерфейс и контроллер (класс виджета), который подготавливает и обрабатывает необходимые данные, используя AJAX.

<a name="generic-widgets" class="anchor"></a>
## Универсальные виджеты

Виджеты очень похожи на [Компоненты](../cms/components.md). Это такие же элементы страницы, которые имеют свою логику, поддерживают фрагменты и используют алиасы в качестве названий. Ключевым отличием является то, что виджеты используют YAML разметку для описания настроек и привязаны к Административному интерфейсу.

Виджеты находятся в папке плагина в подпаке **widgets**. Название папки должно совпадать с именем класса виджета и должно быть написано строчными буквами. Виджеты могут использовать свои JS/CSS файлы и фрагменты. Пример:

    widgets/
      /form
        /partials
          _form.htm     <=== Widget partial file
        /assets
          /js
            form.js     <=== Widget JavaScript file
          /css
            form.css    <=== Widget StyleSheet file
      Form.php          <=== Widget class

<a name="generic-class-definition" class="anchor"></a>
### Определение класса

Класс универсального виджета должен расширять `Backend\Classes\WidgetBase` класс. Как и любой другой класс плагина, он также должен принадлежать [пространству имен](../plugin/registration.md#namespaces). Пример:

    namespace Backend\Widgets;

    use Backend\Classes\WidgetBase;

    class Lists extends WidgetBase
    {
        protected $defaultAlias = 'list';

        public function widgetDetails()
        {
            return [
                'name'        => 'List Widget',
                'description' => 'Used for building back end lists.'
            ];
        }

        ...

Класс виджета должен содержать метод **render()** для отображения содержимого. Пример:

    public function render()
    {
        return $this->makePartial('list');
    }

Вы можете использовать переменную `$vars`, чтобы передать произвольное значение во франмент

    public function render()
    {
        $this->vars['var'] = 'value';
        return $this->makePartial('list');
    }

Вы также можете передать необходимые значения в качестве второго параметра метода `makePartial()`:

    public function render()
    {
        $this->vars['var'] = $value;
        return $this->makePartial('list', ['var'=>'value']);
    }

<a name="generic-ajax-handlers" class="anchor"></a>
### AJAX

Виджеты могут использовать AJAX как и [контроллеры](../backend/controllers-views-ajax.md#ajax). Обработчики AJAX являются публичными методами класса виджета с названием, начинающимся с **on**. Единственным отличием является то, что Вы должны использовать `getEventHandler()` в `data-request`. Пример:

    <a
        href="javascript:;"
        data-request="<?= $this->getEventHandler('onPaginate') ?>"
        title="Next page">Next</a>

<a name="generic-binding" class="anchor"></a>
### Привязка виджетов к контроллерам

Виджет должен быть привязан к [контроллеру](../backend/controllers-views-ajax.md) перед тем, как его можно использовать на административных страницах или фрагментах. Для этого используется метод `bindToController()`. Пример:

    public function __construct()
    {
        parent::__construct();

        $myWidget = new MyWidgetClass($this);
        $myWidget->alias = 'myWidget';
        $myWidget->bindToController();
    }

После привязки виджет можно отобразить на странице или фрагменте при помощи его алиаса:

    <?= $this->widget->myWidget->render() ?>

<a name="form-widgets" class="anchor"></a>
## Виджеты форм

При помощи виджетов форм Вы можете расширить функциональность административных [./backend-forms]($1.md). Виджеты этого типа должны быть зарегистрированы в [Файле регистрации плагина](../plugin/registration.md#widget-registration).

<a name="form-class-definition" class="anchor"></a>
### Определение класса

Класс виджета форм должен расширять `Backend\Classes\FormWidgetBase` класс. Как и любой другой класс плагина, он также должен принадлежать [пространству имен](../plugin/registration.md#namespaces). Зарегистрированный виджет может использоваться в [файле с описанием полей](../backend/forms.md#form-fields). Пример:

    namespace Backend\Widgets;

    use Backend\Classes\FormWidgetBase;

    class CodeEditor extends FormWidgetBase
    {
        public function widgetDetails()
        {
            return [
                'name'        => 'Code Editor',
                'description' => 'Renders a code editor field.'
            ];
        }

        public function render() {}
    }

<a name="form-widget-registration" class="anchor"></a>
### Регистрация виджета

Плагины могут регистрировать виджеты переопределяя метод `registerFormWidgets()` внутри [Файла регистрации плагина](../plugin/registration.md#widget-registration). Метод должен вернуть массив, где ключ - класс виджета, а значение - массив с меткой и кодом. Пример:

    public function registerFormWidgets()
    {
        return [
            'Backend\FormWidgets\CodeEditor' => [
                'label' => 'Code editor',
                'code'  => 'codeeditor'
            ]
        ];
    }

**Метка** определяет название виджета, а **код** можно использовать в настройках [формы](../backend/forms.md#field-widget). Он должен быть уникальным, чтобы избежать конфликтов с другими полями формы.

<a name="report-widgets" class="anchor"></a>
## Виджеты отчетов

Виджеты отчетов могут использоваться на панели управления сайта, а также в некоторых других местах (где есть контейнеры отчетов). Виджеты этого типа должны быть также указаны в [Файле регистрации плагина](../plugin/registration.md#widget-registration).

<a name="report-class-definition" class="anchor"></a>
### Определение класса

Класс виджета отчетов должен расширять `Backend\Classes\ReportWidgetBase` класс. Как и любой другой класс плагина, он также должен принадлежать [пространству имен](../plugin/registration.md#namespaces). Класс виджета должен переопределять метод **render()** для отображения содержимого. Пример:

    plugins/
      rainlab/                    <=== Author name
        googleanalytics/          <=== Plugin name
          reportwidgets/          <=== Report widgets directory
            trafficsources        <=== Widget files directory
              partials
                _widget.htm
            TrafficSources.php    <=== Widget class file

Пример содержимого файла `TrafficSources.php`:

    namespace RainLab\GoogleAnalytics\ReportWidgets;

    use Backend\Classes\ReportWidgetBase;

    class TrafficSources extends ReportWidgetBase
    {
        public function render()
        {
            return $this->makePartial('widget');
        }
    }

Фрагменты виджета могут содержать любую HMTL разметку. Весь код должен быть обернут в `DIV` с классом **report-widget**. Для отображения заголовков лучше использовать элемент `H3`. Пример фрагмента:

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

![image](https://raw.githubusercontent.com/octobercms/docs/master/images/traffic-sources.png)

Внутри виджетов отчетов Вы можете использовать любые [элементы управления](../backend/controls.md), списки и т.д. Пример:

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

<a name="report-properties" class="anchor"></a>
### Свойства виджетов отчетов

Виджеты отчетов могут иметь свойства, которые пользователи могут изменять при помощи **Инспектора**:

![image](https://github.com/octobercms/docs/blob/develop/images/report-widget-inspector.png?raw=true)

[Свойства](../plugin/components.md#component-properties) должны быть определены в классе виджета в методе `defineProperties()`. Пример:

    public function defineProperties()
    {
        return [
            'title' => [
                'title'             => 'Widget title',
                'default'           => 'Top Pages',
                'type'              => 'string',
                'validationPattern' => '^.+$',
                'validationMessage' => 'The Widget Title is required.'
            ],
            'days' => [
                'title'             => 'Number of days to display data for',
                'default'           => '7',
                'type'              => 'string',
                'validationPattern' => '^[0-9]+$'
            ]
        ];
    }

<a name="report-widget-registration" class="anchor"></a>
### Регистрация виджета

Плагины могут регистрировать виджеты переопределяя метод `registerReportWidgets()` внутри [Файла регистрации плагина](../plugin/registration.md#widget-registration). Метод должен вернуть массив, где ключ - класс виджета, а значение - массив с меткой и контекстом. Пример:

    public function registerReportWidgets()
    {
        return [
            'RainLab\GoogleAnalytics\ReportWidgets\TrafficOverview' => [
                'label'   => 'Google Analytics traffic overview',
                'context' => 'dashboard'
            ],
            'RainLab\GoogleAnalytics\ReportWidgets\TrafficSources' => [
                'label'   => 'Google Analytics traffic sources',
                'context' => 'dashboard'
            ]
        ];
    }

**Метка** определяет название виджета, а **контекст** - место, где его можно использовать.
