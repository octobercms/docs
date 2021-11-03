# Трейты ( Database Traits )

<a href="hashable" name="hashable" class="anchor"></a>
## Hashable

Используйте трейт `October\Rain\Database\Traits\Hashable` и свойство `$hashable` в модели, чтобы указать какие из ее атрибутов должны хэшироваться. Пример:

    class User extends Model
    {
        use \October\Rain\Database\Traits\Hashable;

        /**
         * @var array List of attributes to hash.
         */
        protected $hashable = ['password'];
    }

<a href="purgeable" name="purgeable" class="anchor"></a>
## Purgeable

Используйте трейт `October\Rain\Database\Traits\Purgeable` и свойство`$purgeable` в модели, чтобы указать какие из ее атрибутов не должны сохранятся при создании и обновлении. Пример:

    class User extends Model
    {
        use \October\Rain\Database\Traits\Purgeable;

        /**
         * @var array List of attributes to purge.
         */
        protected $purgeable = ['password_confirmation'];
    }

Используйте метод `getOriginalPurgeValue`, чтобы получить значение атрибута:

    return $user->getOriginalPurgeValue('password_confirmation');

<a href="encryptable" name="encryptable" class="anchor"></a>
## Encryptable

Используйте трейт `October\Rain\Database\Traits\Encryptable` и свойство `$encryptable` в модели, чтобы указать какие из ее атрибутов должны быть зашифрованы. Пример:

    class User extends Model
    {
        use \October\Rain\Database\Traits\Encryptable;

        /**
         * @var array List of attributes to encrypt.
         */
        protected $encryptable = ['api_key', 'api_secret'];
    }

<a href="sluggable" name="sluggable" class="anchor"></a>
## Sluggable

Используйте трейт `October\Rain\Database\Traits\Sluggable` и свойство `$slugs` для автоматической генерации URL. Пример:

    class User extends Model
    {
        use \October\Rain\Database\Traits\Sluggable;

        /**
         * @var array Generate slugs for these attributes.
         */
        protected $slugs = ['slug' => 'name'];
    }

Вы можете указать несколько источников:

    protected $slugs = [
        'slug' => ['first_name', 'last_name']
    ];

URL будет сгенерирован автоматически только при создании записи в БД. Чтобы заменить слаг на другой, укажите его вручную:

    $user = new User;
    $user->name = 'Remy';
    $user->slug = 'custom-slug';
    $user->save(); // Slug will not be generated

Используйте метод `slugAttributes`, чтобы сгенерировать новый URL при обновлении модели:

    $user = User::find(1);
    $user->slug = null;
    $user->slugAttributes();
    $user->save();

<a href="revisionable" name="revisionable" class="anchor"></a>
## Revisionable

Модели в OctoberCMS могут запоминать историю изменений при помощи ревизий. Для этого используйте трейт `October\Rain\Database\Traits\Revisionable`, свойство `$revisionable` и связь `revision_history` в модели, чтобы указать какие из ее атрибутов необходимо отслеживать. Пример:

    class User extends Model
    {
        use \October\Rain\Database\Traits\Revisionable;

        /**
         * @var array Monitor these attributes for changes.
         */
        protected $revisionable = ['name', 'email'];

        /**
         * @var array Relations
         */
        public $morphMany = [
            'revision_history' => ['System\Models\Revision', 'name' => 'revisionable']
        ];
    }

Вы можете ограничить количество записей при помощи свойства `$revisionableLimit`:

    /**
     * @var int Maximum number of revision records to keep.
     */
    public $revisionableLimit = 8;

Вы можете получить все ревизии, как и любое другое отношение:

    $history = User::find(1)->revision_history;

    foreach ($history as $record) {
        echo $record->field . ' updated ';
        echo 'from ' . $record->old_value;
        echo 'to ' . $record->new_value;
    }

<a href="sortable" name="sortable" class="anchor"></a>
## Sortable

Используйте трейт `October\Rain\Database\Traits\Sortable`, чтобы отсортировать модели в коллекции:

    class User extends Model
    {
        use \October\Rain\Database\Traits\Sortable;
    }

Используйте метод `setSortableOrder`, чтобы изменить порядок одной или нескольких моделей:

    // Sets the order of the user to 1...
    $user->setSortableOrder($user->id, 1);

    // Sets the order of records 1, 2, 3 to 3, 2, 1 respectively...
    $user->setSortableOrder([1, 2, 3], [3, 2, 1]);

<a href="simple-tree" name="simple-tree" class="anchor"></a>
## Simple Tree

Используйте трейт `October\Rain\Database\Traits\SimpleTree` и колонку `parent_id` в БД для создания простого дерева. Пример:

    class Category extends Model
    {
        use \October\Rain\Database\Traits\SimpleTree;
    }

Он автоматически добавит две [связи](../database/relations.md) `parent` и `children`, которые эквивалентны следующим описаниям:

    public $belongsTo = [
        'parent'    => ['User', 'key' => 'parent_id'],
    ];

    public $hasMany = [
        'children'    => ['User', 'key' => 'parent_id'],
    ];

Вы можете изменить название столбца при помощи константы `PARENT_ID`:

    const PARENT_ID = 'my_parent_column';

Коллекция моделей, которая использует этот трейт будет иметь тип `October\Rain\Database\TreeCollection`.

Используйте метод `toNested`, чтобы получить древовидную структуру:

    Category::all()->toNested();

<a href="nested-tree" name="nested-tree" class="anchor"></a>
## Nested Tree

[Модель вложенных множеств](https://en.wikipedia.org/wiki/Nested_set_model) представляет собой усовершенствованную технику для поддержания иерархии при помощи столбцов `parent_id`, `nest_left`, `nest_right`, `nest_depth` в БД и трейта `October\Rain\Database\Traits\NestedTree`. Пример:

    class Category extends Model
    {
        use \October\Rain\Database\Traits\NestedTree;
    }

### Создание корневого узла

    $root = Category::create(['name' => 'Root category']);

или

    $node->makeRoot();

или

    $node->parent_id = null;
    $node->save();

### Вставка узлов

    $child1 = $root->children()->create(['name' => 'Child 1']);

или

    $child2 = Category::create(['name' => 'Child 2']);
    $child2->makeChildOf($root);

### Удаление узлов

    $child1->delete();

### Получение уровня вложенности узла

    // 0 when root
    $node->getLevel()

### Перемещение узлов

`moveLeft()`: Найти "брата" слева и переместить узел левее него.
`moveRight()`: Найти "брата" справа и переместить узел правее него.
`moveBefore($otherNode)`: Переместить узел слева от ...
`moveAfter($otherNode)`: Переместить узел справа от ...
`makeChildOf($otherNode)`: Сделать узел дочерним ...
`makeRoot()`: Сделайте текущий узел корневым.

<a href="validation" name="validation" class="anchor"></a>
## Валидация

Модели в OctoberCMS используют встроенный класс [валидации](../services/validation.md). Используйте трейт `October\Rain\Database\Traits\Validation` и свойство `$rules`, чтобы задать правила валидации:

    class User extends Model
    {
        use \October\Rain\Database\Traits\Validation;

        public $rules = [
            'name'                  => 'required|between:4,16',
            'email'                 => 'required|email',
            'password'              => 'required|alpha_num|between:4,8|confirmed',
            'password_confirmation' => 'required|alpha_num|between:4,8'
        ];
    }

> **Примечание**: Вы также можете использовать [array syntax](../services/validation.md#basic-usage).

Модели автоматически проверяют себя при вызове метода `save()`.

    $user = new User;
    $user->name = 'Adam Person';
    $user->email = 'a.person@email.address.com';
    $user->password = 'passw0rd';

    // Returns false if model is invalid
    $success = $user->save();

> **Примечание:** Вы можете использовать метод `validate()`, чтобы проверить модель в любое время.

<a href="retrieving-validation-errors" name="retrieving-validation-errors" class="anchor"></a>
### Retrieving validation errors

Когда модель не проходит валидацию, к ней добавляется объект `Illuminate\Support\MessageBag`, который содержит сообщение об ошибке. Используйте метод `errors()` или свойство `$validationErrors`, чтобы получить экземпляр коллекции. Используйте метод `errors()->all()`, чтобы получить все ошибки. Используйте метод `validationErrors->get('attribute')`, чтобы получить сообщение об ошибки конкретного атрибута.

> **Примечание:** Модель использует объект MessagesBag, который имеет [простой и элегантный метод](../services/validation.md#working-with-error-messages) для форматирования ошибок.

<a href="overriding-validation" name="overriding-validation" class="anchor"></a>
### Переопределение валидации

Используйте метод `forceSave()`, чтобы сохранить модель, не смотря на ошибки.

    $user = new User;

    // Creates a user without validation
    $user->forceSave();

<a href="custom-error-messages" name="custom-error-messages" class="anchor"></a>
### Пользовательские сообщения об ошибках

Вы можете изменить сообщения об ошибках при помощи свойства `$customMessages`:

    class User extends Model
    {
        public $customMessages = [
           'required' => 'The :attribute field is required.',
            ...
        ];
    }

<a href="custom-attribute-names" name="custom-attribute-names" class="anchor"></a>
### Пользовательские имена атрибутов

Вы можете изменить имена атрибутов при помощи свойства `$attributeNames`:

    class User extends Model
    {
        public $attributeNames = [
           'email' => 'Email Address',
            ...
        ];
    }

<a href="dynamic-validation-rules" name="dynamic-validation-rules" class="anchor"></a>
### Динамическая валидация

Вы можете использовать динамическую валидацию при помощи метода `beforeValidate`. Пример:

    public function beforeValidate()
    {
        if (!$this->is_remote) {
            $this->rules['latitude'] = 'required';
            $this->rules['longitude'] = 'required';
        }
    }

<a href="custom-validation-rules" name="custom-validation-rules" class="anchor"></a>
### Пользовательские правила проверки

Вы также можете создавать свои собственные [правила проверки](../services/validation.md#custom-validation-rules).

<a href="soft-deleting" name="soft-deleting" class="anchor"></a>
## Soft deleting

Используйте трейт `October\Rain\Database\Traits\SoftDelete` и столбец `deleted_at`, чтобы при удалении записи из БД к ней добавлялась метка со временем ее удаления:

    class User extends Model
    {
        use \October\Rain\Database\Traits\SoftDelete;

        protected $dates = ['deleted_at'];
    }

> **Примечание:** Сама запись при этом не удаляется.

Используйте метод `softDeletes`, чтобы добавить столбец `deleted_at` в вашу таблицу:

    Schema::table('posts', function ($table) {
        $table->softDeletes();
    });

Используйте метод `trashed`, чтобы получить все удаленные записи:

    if ($user->trashed()) {
        //
    }

<a href="querying-soft-deleted-models" name="querying-soft-deleted-models" class="anchor"></a>
### Запросы с мягко-удалёнными моделями

#### Включить мягко-удалённые модели

Используйте метод `withTrashed`, чтобы включить мягко-удалённые модели в результаты запроса:

    $users = User::withTrashed()->where('account_id', 1)->get();

Вы также можете использовать метод `withTrashed` при работе со связями:

    $flight->history()->withTrashed()->get();

#### Получение только мягко-удалённых моделей

Используйте метод `onlyTrashed`, чтобы получить **только** мягко-удалённые модели:

    $users = User::onlyTrashed()->where('account_id', 1)->get();

#### Восстановление мягко-удалённых моделей

Используйте метод `restore`, чтобы восстановить мягко-удалённые модели:

    $user->restore();

    // Восстановить модель с account_id=1
    User::withTrashed()->where('account_id', 1)->restore();

    // Восстановить все удаленные модели
    $user->posts()->restore();

#### Удаление мягко-удалённых моделей

Используйте метод `forceDelete`, чтобы удалить мягко-удалённые модели навсегда:

    // Принудительное удаление экземпляра одной модели
    $user->forceDelete();

    // Принудительное удаление всех связанных моделей
    $user->posts()->forceDelete();

<a href="soft-deleting-relations" name="soft-deleting-relations" class="anchor"></a>
### Мягкое удаление связей

Используйте параметр `softDelete`, чтобы применить каскадное удаление. Например, при удалении пользователя, все принадлежащие ему комментарии будут также удалены. Пример:

    class User extends Model
    {
        use \October\Rain\Database\Traits\SoftDelete;

        public $hasMany = [
            'comments' => ['Acme\Blog\Models\Comment', 'softDelete' => true]
        ];
    }

> **Примечание:** Если связанная модель не использует "мягкое удаление", то все ее записи удалятся навсегда.

Under these same conditions, when the primary model is restored, all the related models that use the `softDelete` option will also be restored.

    // Restore the user and comments
    $user->restore();

<a href="nullable" name="nullable" class="anchor"></a>
## Nullable

Используйте трейт `October\Rain\Database\Traits\Nullable` и свойство `$nullable`, чтобы задать `NULL` всем пустым атрибутам. Пример:

    class Product extends Model
    {
        use \October\Rain\Database\Traits\Nullable;

        /**
         * @var array Nullable attributes.
         */
        protected $nullable = ['sku'];
    }
