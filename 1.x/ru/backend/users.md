# Пользователи и права

<a name="permission-registration" class="anchor"></a>
## Ограничение доступа

Плагины могут создавать свои права при помощи метода `registerPermissions()`, который находится в классе [регистрации плагина](../plugin/registration#navigation-permissions). Права представляют из себя массив, где значение - это описание доступа, а ключ - название доступа. Название доступа состоит из имени автора плагина, его названия и названия функционала. Пример:

    public function registerPermissions()
    {
        return [
            'acme.blog.access_posts' => [
                'label' => 'Manage the blog posts',
                'tab' => 'Blog'
            ],
            'acme.blog.access_categories' => [
                'label' => 'Manage the blog categories',
                'tab' => 'Blog'
            ]
        ];
    }

<a name="page-access" class="anchor"></a>
##  Ограничение доступа к административным страницам

В классе контроллера Вы можете указать права, которые необходимо иметь пользователю для получения доступа к страницам контроллера. Это делается при помощи свойства `$requiredPermissions` типа массив, в котором перечисляются ключи указанные в методе `$registerPermissions`. Если права пользователя совпадают с одним из значений массива, то OctoberCMS пустит пользователя на нужную ему страницу. Пример:

    <?php namespace Acme\Blog\Controllers;

    use Backend\Classes\BackendController;

    class Posts extends BackendController
    {
        public $requiredPermissions = ['acme.blog.access_posts'];

Вы можете использовать символ `*` для не строгой проверки. В следующем примере контроллер доступен для всех пользователей, которые имеют права и начинаются с "acme.blog.":

    public $requiredPermissions = ['acme.blog.*'];

<a name="features" class="anchor"></a>
## Ограничение доступа к функционалу

Модель, в которой хранится информация о зарегистрированных пользователях имеет методы для проверки прав: `hasPermission()` и `hasAccess()`. Вы можете использовать их, чтобы ограничить доступ к некоторому функционалу административного интерфейса. Оба метода принимают два параметра: название доступа (или массив с названиями) и необязательный параметр, который указывает на то, что все значения в первом параметре являются обязательными.

Метод `hasAccess()` возвращает **true** для всех доступов, если пользователь - администратор. Метод `hasPermission()` - более строгий. В следующем примере показано, как использовать эти методы в контроллере:

    if ($this->user->hasAccess('acme.blog.*'))
        ...

    if ($this->user->hasPermission(['acme.blog.access_posts', 'acme.blog.access_categories']))
        ...

Вы также можете применять эти методы в представлениях, чтобы скрыть определенные элементы:

    <?php if ($this->user->hasAccess('acme.blog.delete_categories')): ?>
        <button
            type="button"
            class="oc-icon-trash-o btn-icon danger pull-right"
            data-request="onDelete"
            data-load-indicator="Deleting Category..."
            data-request-confirm="Do you really want to delete this category?">
        </button>
    <?php endif ?>
