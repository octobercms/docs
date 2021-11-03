# Представления и Фрагменты

- [Фрагменты и Подсказки](#partials)
    - [Подсказки](#hints)
    - [Проверка видимости подсказки](#checking-hints)
- [Шаблоны и дочерние шаблоны](#layouts)
    - [Форма с боковой панелью](#layout-form-with-sidebar)

<a name="partials" class="anchor"></a>
## Фрагменты

Фрагменты в административной части сайта - это файлы с расширением **htm**, которые находятся в папке с представлениями контроллера. Их название должно начинаться с **_**: *_partial.htm*. Фрагменты можно отобразить на административной странице или в другом фрагменте. Для этого используется метод `makePartial()`, который принимает два параметра - название фрагмента и массив с произвольными значениями. Пример:

    <?= $this->makePartial('sidebar', ['showHeader' => true]) ?>

<a name="hints" class="anchor"></a>
### Подсказки

Вы можете отображать информативные панели в административной части сайта, называемые подсказками, а пользователи могут скрывать их. Первым параметром должен быть уникальный ключ, который помогает отслеживать видимость подсказки. Второй параметр - название фрагмента. Третий - массив с произвольными значениями, которые можно использовать во фрагменте.

    <?= $this->makeHintPartial('my_hint_key', 'my_hint_partial', ['foo' => 'bar']) ?>

Вы можете запретить пользователям скрывать подсказку, указав в качестве первого параметра *null*. Пример:

    <?= $this->makeHintPartial(null, 'my_hint_partial') ?>

Доступны следующие свойства:

Свойство | Описание
------------- | -------------
**type** | Цвет подсказки. Доступны следующие значения: danger, info, success, warning. По умолчанию: info.
**title** | Заголовок подсказки.
**subtitle** | Подзаголовок.
**icon** | Добавляет иконку к заголовку.

<a name="checking-hints" class="anchor"></a>
### Проверка видимости подсказки

Используйте метод `isBackendHintHidden`, чтобы проверить скрыл ли пользователь подсказку. Метод принимает один параметр - уникальный ключ (название подсказки), который был указан в `makeHintPartial`. Возвращает *true* или *false*. Пример:

    <?php if ($this->isBackendHintHidden('my_hint_key')): ?>
        <!-- Do something when the hint is hidden -->
    <?php endif ?>

<a name="layouts" class="anchor"></a>
## Шаблоны и дочерние шаблоны

Шаблоны административных страниц могут находится в папке плагина в подпапке **layouts/**. Также объект контроллера может иметь свойство `$layout`. Значение по умолчанию - `default`.

    /**
     * @var string Layout to use for the view.
     */
    public $layout = 'mycustomlayout';

Вы можете указать произвольный класс тега BODY при помощи свойства контроллера `$bodyClass`.

    /**
     * @var string Body CSS class to add to the layout.
     */
    public $bodyClass = 'compact-container';

По умолчанию доступны следующие классы:

- **compact-container** - убирает padding со всех сторон.
- **slim-container** - убирает padding слева и справа.
- **breadcrumb-flush** - хлебные крошки располагаются вплотную к следующему элементу.

<a name="layout-form-with-sidebar" class="anchor"></a>
### Форма с боковой панелью

Вы можете работать с шаблонами также как и с фрагментами. Пример:

    $this->bodyClass = 'compact-container'; // Сначала добавим класс в контроллер

    <!-- Форма -->
    <?php Block::put('form-contents') ?>
        Main content
    <?php Block::endPut() ?>

    <!-- Боковая панель -->
    <?php Block::put('form-sidebar') ?>
        Side content
    <?php Block::endPut() ?>

    <!-- Отображаем дочерний шаблон -->
    <?php Block::put('body') ?>
        <?= Form::open(['class'=>'layout stretch']) ?>
            <?= $this->makeLayout('form-with-sidebar') ?>
        <?= Form::close() ?>
    <?php Block::endPut() ?>

Последний блок с кодом переопределяет **body** и оборачивает все в HTML тег `<form />`, после чего отображает дочерний шаблон **form-with-sidebar**, который находится по следующему пути: `modules\backend\layouts\form-with-sidebar.htm`.
