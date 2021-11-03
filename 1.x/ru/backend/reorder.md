# Сортировка

<a name="introduction" class="anchor"></a>
## Введение

**Сортировка** - модификатор контроллера, используемый для сортировки и переупорядочивания записей. Действие контроллера `reorder()` отображает список с записями, которые можно перетаскивать.

Вид списка зависит от [класса модели](../database/model.md), который должен имплементировать один из следующих [трейтов](../database/traits.md):

1. `October\Rain\Database\Traits\Sortable`
1. `October\Rain\Database\Traits\NestedTree`

Вы должны добавить один из трейтов в свойство `$implement` класса контроллера для того, чтобы использовать сортировку. Также свойство `$reorderConfig` должно содержать ссылку на YAML файл с настройками.

    namespace Acme\Shop\Controllers;

    class Categories extends Controller
    {
        public $implement = [
            'Backend.Behaviors.ReorderController',
        ];

        public $reorderConfig = 'config_reorder.yaml';

        // [...]
    }

<a name="configuring-reorder" class="anchor"></a>
## Настройка сортировки

Файл с настройками сортировки, указанный в свойстве `$reorderConfig`, должен быть в формате YAML и находиться в папке с [представлениями контроллера](../backend/controllers-views-ajax/.md#introduction). Пример:

	# ===================================
	#  Reorder Behavior Config
	# ===================================

	# Reorder Title
	title: Reorder Categories

	# Attribute name
	nameFrom: title

	# Model Class name
	modelClass: Acme\Shop\Models\Category

	# Toolbar widget configuration
	toolbar:
	    # Partial for toolbar buttons
	    buttons: reorder_toolbar


Вы можете использовать следующие параметры:

Параметр | Описание
------------- | -------------
**title** | название страницы.
**nameFrom** | определяет какой атрибут должен использоваться в качестве метки для каждой записи.
**modelClass** | имя класса модели откуда будут загружаться записи.
**toolbar** | ссылка на файл с настройками панели инструментов, или массив с настройками.

<a name="reorder-display" class="anchor"></a>
## Отображение страницы с сортировкой

Вы должны создать [файл](../backend/controllers-views-ajax/.md#introduction) с названием **reorder.htm**. Это представление - страница, где пользователи смогут сортировать записи. Файл должен содержать только вызов метода `reorderRender()`.

    <?= $this->reorderRender() ?>
