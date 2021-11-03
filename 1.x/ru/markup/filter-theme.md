# |theme

Фильтр `|theme` возвращает адрес относительно пути к активной теме веб-сайта. Результатом является абсолютный URL, включая домен и протокол, к файлу, указанному в параметре фильтра, который обычно находится в подпапке **assets** в папке с темой.

    <script type="text/javascript" src="{{ 'assets/js/menu.js'|theme }}"></script>

Если __https://octobercms.info__ - адрес сайта и активная тема - `website`, то результат будет следующим:

    <script type="text/javascript" src="http://october.com/themes/website/assets/js/menu.js"></script>

<a name="combine-css-javascript"></a>
## Объединение CSS и JavaScript файлов

Фильтр также может использоваться для объединения файлов одного типа путем передачи массива с их названиями.

    <link href="{{ [
        'assets/css/styles1.css',
        'assets/css/styles2.css'
    ]|theme }}" rel="stylesheet">

> **Примечание**: Вы можете включить сжатие при помощи параметра `enableAssetMinify` в файле
 `config/cms.php` или использовать плагин [Minify](http://octobercms.com/plugin/xeor-minify). По умолчанию она отключена.

<a name="combiner-aliases"></a>
### Алиасы Комбайнера

Вы можете использовать алиасы, чтобы добавить, например, [AJAX framework assets](./cms-ajax#introduction) в комбайнер:

    <script src="{{ [
        '@jquery',
        '@framework',
        '@framework.extras',
        'assets/javascript/app.js
    ']|theme }}"></script>

Доступны следующие алиасы:

Алиас | Описание
------------- | -------------
`@jquery` | Ссылка на библиотеку jQuery, которая используется в административной части. (JavaScript)
`@framework` | AJAX framework extras / `{% framework %}`. (JavaScript)
`@framework.extras` | AJAX framework extras / `{% framework extras %}`. (JavaScript, CSS)

<a name="external-combiner-paths"></a>
### Внешние пути

В некоторых случаях Вам может понадобиться указать файл вне темы. Для этого используйте префиксы `$` или `~`:

    <script src="{{ ['~/modules/system/assets/js/framework.js']|theme }}"></script>

Символ | Описание
------------- | -------------
`$` | Относительно папки с плагинами
`~` | Относительно папки с приложением
