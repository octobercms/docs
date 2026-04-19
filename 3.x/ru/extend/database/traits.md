# Трейты

Трейты моделей используются для реализации общей функциональности.

## Манипуляция атрибутами

### Nullable

Nullable-атрибуты устанавливаются в `NULL`, когда оставлены пустыми. Для обнуления атрибутов в вашей модели примените трейт `October\Rain\Database\Traits\Nullable` и объявите свойство `$nullable` с массивом, содержащим атрибуты для обнуления.

```php
class Product extends Model
{
    use \October\Rain\Database\Traits\Nullable;

    protected $nullable = ['sku'];
}
```

### Hashable

Хешируемые атрибуты хешируются сразу при первом присваивании значения атрибуту модели. Для хеширования атрибутов в вашей модели примените трейт `October\Rain\Database\Traits\Hashable` и объявите свойство `$hashable` с массивом, содержащим атрибуты для хеширования.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Hashable;

    protected $hashable = ['password'];
}
```

### Purgeable

Очищаемые атрибуты не будут сохранены в базу данных при создании или обновлении модели. Для очистки атрибутов в вашей модели примените трейт `October\Rain\Database\Traits\Purgeable` и объявите свойство `$purgeable` с массивом, содержащим атрибуты для очистки.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Purgeable;

    protected $purgeable = ['password_confirmation'];
}
```

Используйте метод `getOriginalPurgeValue`, чтобы получить значение, которое было очищено после сохранения модели.

```php
return $user->getOriginalPurgeValue('password_confirmation');
```

Альтернативно используйте метод `restorePurgedValues` для восстановления всех очищенных значений.

```php
$user->restorePurgedValues();
```

### Encryptable

Аналогично трейту `Hashable`, зашифрованные атрибуты шифруются при установке, но также расшифровываются при получении атрибута. Для шифрования атрибутов в вашей модели примените трейт `October\Rain\Database\Traits\Encryptable` и объявите свойство `$encryptable` с массивом, содержащим атрибуты для шифрования.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Encryptable;

    protected $encryptable = ['api_key', 'api_secret'];
}
```

::: warning
Зашифрованные атрибуты несовместимы с [jsonable-атрибутами](../system/models.md).
:::

### Sluggable

Слаги — это осмысленные коды, которые обычно используются в URL страниц. Для автоматической генерации уникального слага для вашей модели примените трейт `October\Rain\Database\Traits\Sluggable` и объявите свойство `$slugs`.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sluggable;

    protected $slugs = ['slug' => 'name'];
}
```

Свойство `$slugs` должно быть массивом, где ключ — это целевой столбец для слага, а значение — исходная строка, используемая для генерации слага. В приведённом выше примере, если столбец `name` был установлен в **Cheyenne**, в результате столбец `slug` будет установлен в **cheyenne**, **cheyenne-2**, или **cheyenne-3** и т.д. перед созданием модели.

Для генерации слага из нескольких источников передайте другой массив в качестве исходного значения:

```php
protected $slugs = [
    'slug' => ['first_name', 'last_name']
];
```

Слаги генерируются только при первом создании модели. Чтобы переопределить или отключить эту функциональность, просто установите атрибут slug вручную:

```php
$user = new User;
$user->name = 'Remy';
$user->slug = 'custom-slug';
$user->save(); // Slug will not be generated
```

Используйте метод `slugAttributes` для повторной генерации слагов при обновлении модели:

```php
$user = User::find(1);
$user->slug = null;
$user->slugAttributes();
$user->save();
```

## Сортировка и упорядочивание

### Sortable

Сортируемые модели хранят числовое значение в `sort_order`, которое поддерживает порядок сортировки каждой отдельной модели в коллекции. Для добавления столбца `sort_order` в вашу таблицу используйте метод `integer` внутри миграции.

```php
Schema::table('users', function ($table) {
    $table->integer('sort_order')->default(0);
});
```

Для хранения порядка сортировки для ваших моделей примените трейт `October\Rain\Database\Traits\Sortable` и убедитесь, что ваша схема имеет определённый столбец для его использования.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Sortable;
}
```

Вы можете изменить имя ключа, используемого для идентификации порядка сортировки, определив константу `SORT_ORDER`.

```php
const SORT_ORDER = 'my_sort_order_column';
```

Используйте метод `setSortableOrder` для установки порядка для нескольких записей. Массив содержит идентификаторы моделей в том порядке сортировки, в котором они должны отображаться.

```php
$user->setSortableOrder([3, 2, 1]);
```

При сортировке подмножества записей второй массив используется для предоставления справочного пула значений порядка сортировки. Например, следующий код назначает столбцу порядка сортировки значения 100, 200 или 300.

```php
$user->setSortableOrder([3, 2, 1], [100, 200, 300]);
```

### Simple Tree

Модель простого дерева использует столбец `parent_id` для поддержания отношений родитель-потомок между моделями. Для добавления столбца `parent_id` в вашу таблицу используйте метод `integer` внутри миграции.

```php
Schema::table('categories', function ($table) {
    $table->integer('parent_id')->nullable()->unsigned();
});
```

Для использования простого дерева примените трейт `October\Rain\Database\Traits\SimpleTree`.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
}
```

Этот трейт автоматически внедрит две [связи модели](./relations.md) с именами `parent` и `children`, что является эквивалентом следующих определений.

```php
public $belongsTo = [
    'parent' => [Category ::class, 'key' => 'parent_id'],
];

public $hasMany = [
    'children' => [Category ::class, 'key' => 'parent_id'],
];
```

Вам не нужно определять эти связи самостоятельно, однако вы можете изменить имя ключа, используемого для идентификации родителя, определив константу `PARENT_ID`:

```php
const PARENT_ID = 'my_parent_column';
```

Коллекции моделей, использующих этот трейт, будут возвращать тип `October\Rain\Database\TreeCollection`, который добавляет метод `toNested`. Для построения жадно загруженной древовидной структуры верните записи с жадно загруженными связями.

```php
Category::all()->toNested();
```

#### Отображение

Для отображения всех уровней элементов и их потомков вы можете использовать рекурсивную обработку

```twig
{% macro renderChildren(item) %}
    {% if item.children is not empty %}
        <ul>
            {% for child in item.children %}
                <li>{{ child.name }}{{ _self_.renderChildren(child)|raw }}</li>
            {% endfor %}
        </ul>
    {% endif %}
{% endmacro %}

{% import _self as nav %}
{{ nav.renderChildren(category)|raw }}
```

### Nested Tree

[Модель вложенных множеств](https://en.wikipedia.org/wiki/Nested_set_model) — это продвинутая техника поддержания иерархий между моделями с использованием столбцов `parent_id`, `nest_left`, `nest_right` и `nest_depth`. Для добавления этих столбцов в вашу таблицу используйте эти методы внутри миграции.

```php
Schema::table('categories', function ($table) {
    $table->integer('parent_id')->nullable()->unsigned();
    $table->integer('nest_left')->nullable();
    $table->integer('nest_right')->nullable();
    $table->integer('nest_depth')->nullable();
});
```

Для использования модели вложенных множеств примените трейт `October\Rain\Database\Traits\NestedTree`. Все возможности трейта `SimpleTree` изначально доступны в этой модели.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\NestedTree;
}
```

#### Создание корневого узла

По умолчанию все узлы создаются как корневые:

```php
$root = Category::create(['name' => 'Root category']);
```

Альтернативно вам может понадобиться преобразовать существующий узел в корневой:

```php
$node->makeRoot();
```

Вы также можете обнулить его столбец `parent_id`, что работает так же, как `makeRoot`.

```php
$node->parent_id = null;
$node->save();
```

#### Вставка узлов

Вы можете вставлять новые узлы напрямую через связь:

```php
$child1 = $root->children()->create(['name' => 'Child 1']);
```

Или используйте метод `makeChildOf` для существующих узлов:

```php
$child2 = Category::create(['name' => 'Child 2']);
$child2->makeChildOf($root);
```

#### Удаление узлов

Когда узел удаляется методом `delete`, все потомки узла также будут удалены. Обратите внимание, что [события модели](../system/models.md) delete не будут вызваны для дочерних моделей.

```php
$child1->delete();
```

#### Получение уровня вложенности узла

Метод `getLevel` вернёт текущий уровень вложенности, или глубину, узла.

```php
// 0 when root
$node->getLevel()
```

#### Перемещение узлов

Существует несколько методов для перемещения узлов:

- `moveLeft()`: Найти левого соседа и переместить левее него.
- `moveRight()`: Найти правого соседа и переместить правее него.
- `moveBefore($otherNode)`: Переместить узел левее ...
- `moveAfter($otherNode)`: Переместить узел правее ...
- `makeChildOf($otherNode)`: Сделать узел дочерним для ...
- `makeRoot()`: Сделать текущий узел корневым.

## Служебные функции

### Валидация

Модели October CMS используют встроенный [класс Validator](../services/validation.md). Правила валидации определяются в классе модели как свойство с именем `$rules`, и класс должен использовать трейт `October\Rain\Database\Traits\Validation`.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'name' => ['required', 'between:4,16'],
        'email' => ['required', 'email'],
        'password' => ['required', 'alpha_num', 'between:4,8', 'confirmed'],
        'password_confirmation' => ['required', 'alpha_num', 'between:4,8']
    ];
}
```

Вы также можете использовать [синтаксис массивов](../services/validation.md) для правил валидации.

```php
public $rules = [
    'links.*.url' => ['required', 'url'],
    'links.*.anchor' => ['required']
];
```

Модели валидируются автоматически при вызове метода `save`.

```php
$user = new User;
$user->name = 'Actual Person';
$user->email = 'a.person@example.tld';
$user->password = 'passw0rd';

// Returns false if model is invalid
$success = $user->save();
```

::: tip
Вы также можете валидировать модель в любое время с помощью метода `validate`.
:::

#### Расширенные правила валидации

Правило валидации `unique` автоматически настраивается и не требует указания имени таблицы.

```php
public $rules = [
    'name' => ['unique'],
];
```

Правило валидации `required` поддерживает модификаторы **create** и **update** для применения только при создании или обновлении модели соответственно. Следующее правило требуется только когда модель ещё не существует.

```php
public $rules = [
    'password' => ['required:create'],
];
```

#### Получение ошибок валидации

Когда модель не проходит валидацию, объект `Illuminate\Support\MessageBag` прикрепляется к модели. Объект содержит сообщения об ошибках валидации. Получите экземпляр коллекции сообщений об ошибках валидации с помощью метода `errors` или свойства `$validationErrors`. Получите все ошибки валидации с помощью `errors()->all()`. Получите ошибки для *конкретного* атрибута с помощью `validationErrors->get('attribute')`.

::: tip
Модель использует объект `MessagesBag`, который имеет [простой и элегантный метод](../services/validation.md) форматирования ошибок.
:::

#### Переопределение валидации

Метод `forceSave` валидирует модель и сохраняет независимо от того, есть ли ошибки валидации.

```php
$user = new User;

// Creates a user without validation
$user->forceSave();
```

#### Пользовательские сообщения об ошибках

Как и класс Validator, вы можете устанавливать пользовательские сообщения об ошибках, используя [тот же синтаксис](../services/validation.md).

```php
class User extends Model
{
    public $customMessages = [
        'required' => 'The :attribute field is required.',
        // ...
    ];
}
```

Вы также можете добавлять пользовательские сообщения об ошибках к синтаксису массивов для правил валидации.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Validation;

    public $rules = [
        'links.*.url' => ['required', 'url'],
        'links.*.anchor' => ['required'],
    ];

    public $customMessages = [
        'links.*.url.required' => 'The url is required',
        'links.*.url.*' => 'The url needs to be a valid url'
        'links.*.anchor.required' => 'The anchor text is required',
    ];
}
```

В приведённом выше примере вы можете писать пользовательские сообщения об ошибках для конкретных правил валидации (здесь мы использовали: `required`). Или вы можете использовать `*` для выбора всего остального (здесь мы добавили пользовательское сообщение к правилу валидации `url` с помощью `*`).

#### Пользовательские имена атрибутов

Вы также можете задать пользовательские имена атрибутов с помощью массива `$attributeNames`.

```php
class User extends Model
{
    public $attributeNames = [
        'email' => 'Email Address',
        // ...
    ];
}
```

#### Динамические правила валидации

Вы можете применять правила динамически, переопределив метод [события модели](../system/models.md) `beforeValidate`. Здесь мы проверяем, является ли атрибут `is_remote` равным `false`, и затем динамически устанавливаем атрибуты `latitude` и `longitude` как обязательные поля.

```php
public function beforeValidate()
{
    if (!$this->is_remote) {
        $this->rules['latitude'] = 'required';
        $this->rules['longitude'] = 'required';
    }
}
```

#### Пользовательские правила валидации

Вы также можете создавать пользовательские правила валидации [тем же способом](../services/validation.md), что и для сервиса `Validator`.

### Мягкое удаление

При мягком удалении модель фактически не удаляется из базы данных. Вместо этого в записи устанавливается временная метка `deleted_at`. Для включения мягкого удаления модели примените трейт `October\Rain\Database\Traits\SoftDelete` к модели и добавьте столбец deleted_at в ваше свойство `$dates`:

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];
}
```

Для добавления столбца `deleted_at` в вашу таблицу используйте метод `softDeletes` из миграции:

```php
Schema::table('posts', function ($table) {
    $table->softDeletes();
});
```

Теперь, когда вы вызываете метод `delete` на модели, столбец `deleted_at` будет установлен в текущую временную метку. При запросе модели, использующей мягкое удаление, «удалённые» модели не будут включены в результаты запроса.

Для определения, была ли данная модель мягко удалена, используйте метод `trashed`:

```php
if ($user->trashed()) {
    //
}
```

#### Запросы к мягко удалённым моделям

##### Включение мягко удалённых моделей

Как отмечено выше, мягко удалённые модели автоматически исключаются из результатов запроса. Однако вы можете принудительно включить мягко удалённые модели в набор результатов, используя метод `withTrashed` в запросе:

```php
$users = User::withTrashed()->where('account_id', 1)->get();
```

Метод `withTrashed` также может использоваться в запросе [связи](./relations.md):

```php
$flight->history()->withTrashed()->get();
```

##### Получение только мягко удалённых моделей

Метод `onlyTrashed` получит **только** мягко удалённые модели:

```php
$users = User::onlyTrashed()->where('account_id', 1)->get();
```

##### Восстановление мягко удалённых моделей

Иногда вам может понадобиться «отменить удаление» мягко удалённой модели. Для восстановления мягко удалённой модели в активное состояние используйте метод `restore` на экземпляре модели:

```php
$user->restore();
```

Вы также можете использовать метод `restore` в запросе для быстрого восстановления нескольких моделей:

```php
// Restore a single model instance...
User::withTrashed()->where('account_id', 1)->restore();

// Restore all related models...
$user->posts()->restore();
```

#### Окончательное удаление моделей

Иногда вам может понадобиться действительно удалить модель из базы данных. Для окончательного удаления мягко удалённой модели из базы данных используйте метод `forceDelete`:

```php
// Force deleting a single model instance...
$user->forceDelete();

// Force deleting all related models...
$user->posts()->forceDelete();
```

#### Мягкое удаление связей

Когда две связанные модели имеют включённое мягкое удаление, вы можете каскадировать событие удаления, определив опцию `softDelete` в [определении связи](./relations.md). В этом примере, если модель пользователя мягко удалена, комментарии, принадлежащие этому пользователю, также будут мягко удалены.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\SoftDelete;

    public $hasMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'softDelete' => true]
    ];
}
```

::: tip
Если связанная модель не использует трейт мягкого удаления, она будет обработана так же, как опция `delete`, и удалена окончательно.
:::

При тех же условиях, когда первичная модель восстанавливается, все связанные модели, использующие опцию `softDelete`, также будут восстановлены.

```php
// Restore the user and comments
$user->restore();
```

#### Включение мягко удалённых связей

Мягко удалённые записи не включаются в результаты поиска связей, однако вы можете включить их, добавив область `withTrashed` к запросу.

```php
class User extends Model
{
    public $hasMany = [
        'comments' => [\Acme\Blog\Models\Comment::class, 'scope' => 'withTrashed']
    ];
}
```

### Мультисайт

При применении мультисайта к модели доступны только записи, принадлежащие активному сайту. Активный сайт привязывается к столбцу `site_id`, установленному в записи. Для включения мультисайта для модели примените трейт `October\Rain\Database\Traits\Multisite` и определите атрибуты для распространения по всем записям с помощью свойства `$propagatable`:

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Multisite;

    protected $propagatable = ['api_code'];
}
```

::: tip
Свойство `$propagatable` требуется трейтом мультисайта, но может быть оставлено пустым массивом для отключения распространения любого атрибута.
:::

Для добавления столбца `site_id` в вашу таблицу используйте метод `integer` из миграции. Столбец `site_root_id` также может использоваться для связывания записей вместе через корневую запись.

```php
Schema::table('posts', function ($table) {
    $table->integer('site_id')->nullable()->index();
    $table->integer('site_root_id')->nullable()->index();
});
```

Теперь, когда запись создаётся, она будет назначена активному сайту, и переключение на другой сайт автоматически распространит новую запись. При обновлении записи распространяемые поля копируются в каждую запись, принадлежащую корневой записи.

#### Принудительная синхронизация

В некоторых случаях все записи должны существовать для каждого сайта, например, категории и теги. Вы можете принудительно создать каждую запись на всех сайтах, установив свойство `$propagatableSync` в true, которое по умолчанию равно false. После включения, после сохранения модели, она создаст ту же модель для других сайтов, если они ещё не существуют.

```php
protected $propagatableSync = true;
```

При использовании [групп сайтов](../../cms/resources/multisite.md) записи будут распространяться на все сайты в этой группе. Это можно контролировать, установив свойство `$propagatableSync` в массив с параметрами конфигурации.

Параметр | Описание
------------- | -------------
- **sync** - логика синхронизации конкретных сайтов, доступные варианты: `all`, `group`, `locale`. По умолчанию: `group`
- **delete** - удалять все связанные записи при удалении любой записи, по умолчанию: `true`
- **except** - предоставляет имена атрибутов, которые не должны реплицироваться для вновь синхронизированных записей

```php
protected $propagatableSync = [
    'sync' => 'all',
    'delete' => false,
    'except' => [
        'description'
    ]
];
```

#### Сохранение моделей

Модели, сохранённые с трейтом мультисайта, не распространяются по умолчанию. Используйте метод `savePropagate`, чтобы убедиться, что правила распространения вступят в силу.

```php
$model->savePropagate();
```

### Revisionable

Модели October CMS могут записывать историю изменений значений, сохраняя ревизии. Для хранения ревизий вашей модели примените трейт `October\Rain\Database\Traits\Revisionable` и объявите свойство `$revisionable` с массивом, содержащим атрибуты для отслеживания изменений. Вам также необходимо определить `$morphMany` [связь модели](./relations.md) с именем `revision_history`, которая ссылается на класс `System\Models\Revision` с именем `revisionable` — здесь хранятся данные истории ревизий.

```php
class User extends Model
{
    use \October\Rain\Database\Traits\Revisionable;

    protected $revisionable = ['name', 'email'];

    public $morphMany = [
        'revision_history' => [\System\Models\Revision::class, 'name' => 'revisionable']
    ];
}
```

По умолчанию хранится максимум 500 записей, однако это можно изменить, объявив свойство `$revisionableLimit` в модели с новым значением лимита.

```php
/**
 * @var int revisionableLimit as the maximum number records to keep.
 */
public $revisionableLimit = 8;
```

К истории ревизий можно обращаться как к любой другой связи:

```php
$history = User::find(1)->revision_history;

foreach ($history as $record) {
    echo $record->field . ' updated ';
    echo 'from ' . $record->old_value;
    echo 'to ' . $record->new_value;
}
```

Запись ревизии опционально поддерживает связь с пользователем через атрибут `user_id`. Вы можете включить метод `getRevisionableUser` в вашу модель для отслеживания пользователя, внёсшего изменение.

```php
public function getRevisionableUser()
{
    return BackendAuth::getUser()->id;
}
```
