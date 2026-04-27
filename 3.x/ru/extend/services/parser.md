# Парсер

October CMS использует несколько стандартов для обработки разметки, шаблонов и конфигурации. Каждый из них был тщательно подобран для выполнения своей роли, делая процесс разработки и кривую обучения максимально простыми. Например, [объекты, находящиеся в теме](../../cms/themes/themes.md), используют формат Twig и INI в своей структуре шаблонов. Каждый парсер описан более подробно ниже.

## Парсер Markdown

Markdown позволяет писать в простом текстовом формате, который легко читать и писать, а затем преобразует его в HTML. Фасад `Markdown` используется для разбора синтаксиса Markdown и основан на [GitHub flavored markdown](https://help.github.com/articles/github-flavored-markdown/). Несколько быстрых примеров Markdown:

```md
This text is **bold**, this text is *italic*, this text is ~~crossed out~~.

# The largest heading (an <h1> tag)
## The second largest heading (an <h2> tag)
...
###### The 6th largest heading (an <h6> tag)
```

Используйте метод `Markdown::parse` для рендеринга Markdown в HTML:

```php
$html = Markdown::parse($markdown);
```

Вы также можете использовать фильтр `|md` для [разбора Markdown в вашей фронтенд-разметке](../../markup/filter/md.md).

```twig
{{ '**Text** is bold.'|md }}
```

### Использование HTML в Markdown

Markdown является надмножеством HTML, поэтому вы можете комбинировать HTML и Markdown в одном шаблоне. Когда Markdown встречает любой блочный HTML-тег, синтаксис Markdown деактивируется для всего содержимого внутри.

```html
<div>
    This **text** won't be parsed by *Markdown*
</div>
```

Важно отметить, что парсер Markdown принимает только один HTML-узел на строку. В примере ниже второй узел не включается в вывод.

```html
<!-- Output: <p>Foo</p> -->
<p>Foo</p><p>Bar</p>
```

При отображении сложного HTML, особенно через переменную Twig, вы должны обернуть переменную в один HTML-узел, чтобы убедиться, что весь вывод захвачен.

```twig
<div>
    {{ messageBody|raw }}
</div>
```

Если вы намеренно хотите включить Markdown внутри блочного тега, вы можете сделать это, добавив к тегу атрибут `markdown` со значением `1`.

```html
<div markdown="1">
    This **text** is now bold.
</div>
```

## Парсер шаблонов Twig

Twig — это простой, но мощный шаблонизатор, который разбирает HTML-шаблоны в оптимизированный PHP-код. Он является движущей силой [фронтенд-разметки](../../markup/templating.md), [содержимого представлений](./response-view.md) и [содержимого почтовых сообщений](../system/sending-mail.md).

Фасад `Twig` используется для разбора синтаксиса Twig. Вы можете использовать метод `Twig::parse` для рендеринга Twig в HTML.

```php
$html = Twig::parse($twig);
```

Второй аргумент может использоваться для передачи переменных в разметку Twig.

```php
$html = Twig::parse($twig, ['foo' => 'bar']);
```

Парсер Twig может быть расширен для регистрации пользовательских функций через [файл регистрации плагина](../twig-tags.md).

## Парсер скобок

October CMS также поставляется с простым парсером шаблонов на основе скобок в качестве альтернативы парсеру Twig, который в настоящее время используется для передачи переменных в [блоки содержимого темы](../../cms/themes/content.md). Этот движок быстрее рендерит HTML и предназначен для более удобного использования нетехническими пользователями. Для этого парсера нет фасада, поэтому следует использовать полное имя класса `October\Rain\Parse\Bracket` с методом `parse`.

```php
use October\Rain\Parse\Bracket;

$html = Bracket::parse($content, ['foo' => 'bar']);
```

Синтаксис использует одинарные *фигурные скобки* для рендеринга переменных:

```
<p>Hello there, {foo}</p>
```

Вы также можете передать массив объектов для разбора в качестве переменной.

```php
$html = Template::parse($content, ['likes' => [
    ['name' => 'Dogs'],
    ['name' => 'Fishing'],
    ['name' => 'Golf']
]]);
```

Массив может быть итерирован с использованием следующего синтаксиса:

```
<ul>
    {likes}
        <li>{name}</li>
    {/likes}
</ul>
```

## Парсер конфигурации YAML

YAML («YAML Ain't Markup Language») — это формат конфигурации, похожий на Markdown, он был разработан как легко читаемый и записываемый формат, который преобразуется в PHP-массив. Он используется практически повсеместно для бэкенд-разработки October CMS, например, в [определениях полей формы](../../element/form-fields.md). Пример YAML:

```yaml
receipt: Acme Purchase Invoice
date: 2015-10-02
user:
    name: Joe
    surname: Blogs
```

Фасад `Yaml` используется для разбора YAML. Вы можете использовать метод `Yaml::parse` для рендеринга YAML в PHP-массив:

```php
$array = Yaml::parse($yamlString);
```

Используйте метод `parseFile` для разбора содержимого файла:

```php
$array = Yaml::parseFile($filePath);
```

Парсер также поддерживает обратную операцию — вывод формата YAML из PHP-массива. Вы можете использовать метод `render` для этого:

```php
$yamlString = Yaml::render($array);
```

## Парсер конфигурации INI

Формат файлов INI — это стандарт для определения простых конфигурационных файлов, обычно используемый [компонентами внутри шаблонов тем](../../cms/themes/components.md). Его можно считать родственником формата YAML, хотя, в отличие от YAML, он невероятно прост, менее чувствителен к опечаткам и не зависит от отступов. Он поддерживает базовые пары ключ-значение с секциями, например:

```ini
receipt = "Acme Purchase Invoice"
date = "2015-10-02"

[user]
name = "Joe"
surname = "Blogs"
```

Фасад `Ini` используется для разбора INI. Вы можете использовать метод `Ini::parse` для рендеринга INI в PHP-массив:

```php
$array = Ini::parse($iniString);
```

Используйте метод `parseFile` для разбора содержимого файла:

```php
$array = Ini::parseFile($filePath);
```

Парсер также поддерживает обратную операцию — вывод формата INI из PHP-массива. Вы можете использовать метод `render` для этого:

```php
$iniString = Ini::render($array);
```

### October-версия INI

Традиционно парсер INI, используемый PHP-функцией `parse_ini_string`, ограничен массивами глубиной до 3 уровней. Например:

```ini
level1Value = "foo"
level1Array[] = "bar"

[level1Object]
level2Value = "hello"
level2Array[] = "world"
level2Object[level3Value] = "stop here"
```

October расширил эту функциональность с помощью *October-версии INI*, позволяющей массивы бесконечной глубины, вдохновлённой синтаксисом HTML-форм. Продолжая приведённый выше пример, поддерживается следующий синтаксис:

```ini
[level1Object]
level2Object[level3Array][] = "Yay!"
level2Object[level3Object][level4Value] = "Yay!"
level2Object[level3Object][level4Array][] = "Yay!"
level2Object[level3Object][level4Object][level5Value] = "Yay!"
; ... to infinity and beyond!
```

## Парсер динамического синтаксиса

Динамический синтаксис — это шаблонизатор, уникальный для October, который принципиально поддерживает два режима рендеринга. Разбор шаблона даёт два результата: режим **просмотра** или режим **редактора**. Рассмотрим этот текст шаблона в качестве примера — внутренняя часть тегов `{text}...{/text}` представляет текст по умолчанию для режима **просмотра**, а внутренние атрибуты, `name` и `label`, используются как свойства для режима **редактора**.

```
<h1>{text name="websiteName" label="Website Name"}Our wonderful website{/text}</h1>
```

Для этого парсера нет фасада, поэтому следует использовать полное имя класса `October\Rain\Parse\Syntax\Parser` с методом `parse`. Первый аргумент метода `parse` принимает содержимое шаблона в виде строки и возвращает объект `Parser`.

```php
use October\Rain\Parse\Syntax\Parser as SyntaxParser;

$syntax = SyntaxParser::parse($content);
```

### Режим просмотра

Допустим, мы использовали первый пример выше в качестве содержимого шаблона. Вызов метода `render` сам по себе отрендерит шаблон с текстом по умолчанию:

```php
echo $syntax->render();
// <h1>Our wonderful website</h1>
```

Как и в любом шаблонизаторе, передача массива переменных в первый аргумент `render` заменит переменные внутри шаблона. Здесь значение по умолчанию `websiteName` заменяется нашим новым значением:

```php
echo $syntax->render(['websiteName' => 'October CMS']);
// <h1>October CMS</h1>
```

В качестве бонуса вызов метода `toTwig` выведет шаблон в подготовленном состоянии для рендеринга движком Twig.

```php
echo $syntax->toTwig();
// <h1>{{ websiteName }}</h1>
```

### Режим редактора

До сих пор парсер динамического синтаксиса не сильно отличался от обычного шаблонизатора, однако режим редактора — это то место, где полезность динамического синтаксиса становится более очевидной. Режим редактора открывает новые возможности, например, когда [макеты внедряют пользовательские поля формы в страницы](https://octobercms.com/plugin/rainlab-pages), которые им принадлежат, или для [динамически создаваемых форм, используемых в email-кампаниях](https://octobercms.com/plugin/responsiv-campaign).

Продолжая примеры выше, вызов метода `toEditor` на объекте `Parser` вернёт PHP-массив свойств, определяющих, как переменная должна быть заполнена, например, конструктором форм.

```php
$array = $syntax->toEditor();
// 'websiteName' => [
//     'label' => 'Website name',
//     'default' => 'Our wonderful website',
//     'type' => 'text'
// ]
```

Вы можете заметить, что свойства очень похожи на параметры, найденные в [определениях полей формы](../../element/form-fields.md). Это сделано намеренно, чтобы две функции дополняли друг друга. Теперь мы можем легко преобразовать приведённый выше массив в YAML и записать в файл `fields.yaml`:

```php
$form = [
    'fields' => $syntax->toEditor()
];

File::put('fields.yaml', Yaml::render($form));
```

### Поддерживаемые теги

Существуют различные типы тегов, которые можно использовать с парсером динамического синтаксиса. Они разработаны для соответствия распространённым [типам полей формы](../../element/form-fields.md).

#### Text

Однострочный ввод для небольших блоков текста.

```html
{text name="websiteName" label="Website Name"}Our wonderful website{/text}
```

#### Textarea

Многострочный ввод для больших блоков текста.

```html
{textarea name="websiteDescription" label="Website Description"}
    This is our vision for things to come
{/textarea}
```

#### Dropdown

Рендерит выпадающее поле формы.

```html
{dropdown name="dropdown" label="Pick one" options="One|Two"}{/dropdown}
```

Рендерит выпадающее поле формы с независимыми значениями и метками.

```html
{dropdown name="dropdown" label="Pick one" options="one:One|two:Two"}{/dropdown}
```

Рендерит выпадающее поле формы с массивом, возвращённым статическим методом класса (класс должен быть указан с полным пространством имён).

```html
{dropdown name="dropdown" label="Pick one" options="Path\To\Class::method"}{/dropdown}
```

#### Radio

Рендерит поле формы с радиокнопками.

```html
{radio name="radio" label="Thoughts?" options="y:Yes|n:No|m:Maybe"}{/radio}
```

#### Variable

Рендерит поле формы точно так, как определено в атрибуте `type`. Этот тег просто устанавливает переменную и в режиме просмотра отображается как пустая строка.

```html
{variable type="text" name="name" label="Name"}John{/variable}
```

#### Rich editor

Текстовый ввод для форматированного содержимого (WYSIWYG).

```html
{richeditor name="content" label="Main content"}Default text{/richeditor}
```

Рендерится в Twig как

```twig
{{ content|raw }}
```

#### Markdown

Текстовый ввод для содержимого Markdown.

```html
{markdown name="content" label="Markdown content"}Default text{/markdown}
```

Рендерится в Twig как

```twig
{{ content|md }}
```

#### Media finder

Выбор файла для элементов медиабиблиотеки. Значение этого тега будет содержать относительный путь к файлу.

```html
{mediafinder name="logo" label="Logo"}defaultlogo.png{/mediafinder}
```

Рендерится в Twig как

```twig
{{ logo|media }}
```

#### File upload

Поле загрузки файлов. Значение этого тега будет содержать полный путь к файлу.

```html
{fileupload name="logo" label="Logo"}defaultlogo.png{/fileupload}
```

#### Color picker

Виджет выбора цвета. Этот тег будет содержать выбранное шестнадцатеричное значение. Вы можете опционально предоставить атрибут `availableColors` для определения доступных цветов для выбора.

```html
{colorpicker name="bg_color" label="Background colour" allowEmpty="true" availableColors="#ffffff|#000000"}{/colorpicker}
```

#### Repeater

Рендерит повторяющуюся секцию с другими полями внутри.

```html
{repeater name="content_sections" prompt="Add another content section"}
    <h2>{text name="title" label="Title"}Title{/text}</h2>
    <p>{textarea name="content" label="Content"}Content{/textarea}</p>
{/repeater}
```

Рендерится в Twig как

```twig
{% for fields in repeater %}
    <h2>{{ fields.title }}</h2>
    <p>{{ fields.content|raw }}</p>
{% endfor %}
```

Вызов `$syntax->toEditor` вернёт другой массив для поля repeater:

```php
'repeater' => [
    'label' => 'Website name',
    'type' => 'repeater',
    'fields' => [

        'title' => [
            'label' => 'Title',
            'default' => 'Title',
            'type' => 'text'
        ],
        'content' => [
            'label' => 'Content',
            'default' => 'Content',
            'type' => 'textarea'
        ]

    ]
]
```

Поле repeater также поддерживает групповой режим, для использования с парсером динамического синтаксиса следующим образом:

```html
{variable name="sections" type="repeater" prompt="Add another section" tab="Sections"
        groups="$/author/plugin/repeater_fields.yaml"}{/variable}
```

Это пример конфигурационного файла групп repeater_fields.yaml:

```yaml
quote:
    name: Quote
    description: Quote item
    icon: icon-quote-right
    fields:
        quote_position:
            span: auto
            label: Quote Position
            type: radio
            options:
                left: Left
                center: Center
                right: Right
        quote_content:
            span: auto
            label: Details
            type: textarea
```

Для получения дополнительной информации о групповом режиме repeater смотрите [Виджет Repeater](../../element/form/widget-repeater.md).
