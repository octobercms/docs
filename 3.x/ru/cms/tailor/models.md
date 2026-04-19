---
subtitle: Доступные модели, предоставляемые Tailor.
---
# Модели

В этой статье описывается взаимодействие с Tailor с помощью PHP и доступные модели.

## Запись Entry

Модель `Tailor\Models\EntryRecord` используется для хранения контента записи.

### Доступные атрибуты

В дополнение к определённым полям формы, в полученной модели доступны следующие атрибуты.

Атрибут | Описание
-------- | -------------
**id** | Первичный ключ в базе данных.
**blueprint_uuid** | UUID связанного чертежа.
**content_group** | Имя группы контента, если используется.
**title** | Заголовок записи, например, **My Blog Post**.
**slug** | Идентификатор slug для записи, например, `my-blog-post`.
**is_enabled** | Определяет, видна ли запись в данный момент.
**created_at** | Дата создания записи.
**updated_at** | Дата последнего обновления записи.
**expired_at** | Дата истечения срока действия записи.
**published_at** | Дата публикации записи.
**published_at_date** | Дата публикации или, если не указана, дата создания.

#### Структурные записи

Если тип записи — `structure`, у неё будут дополнительные атрибуты.

Атрибут | Описание
-------- | -------------
**fullslug** | Идентификатор slug, включающий slug родителей, например, `parent-slug/child-slug`.
**parent** | Родительская запись для этой записи, если доступна.
**children** | Дочерние записи для этой записи, если доступны.

#### Потоковые записи

Если тип записи — `stream`, у неё будут дополнительные атрибуты.

Атрибут | Описание
-------- | -------------
**published_at_day** | Числовой день публикации записи.
**published_at_month** | Числовой месяц публикации записи.
**published_at_year** | Числовой год публикации записи.

### Получение нескольких записей

Для работы с записью через PHP используйте модель `Tailor\Models\EntryRecord` и вызовите статический метод `inSection`, передав handle, чтобы получить подготовленный [запрос к модели базы данных](../../extend/database/query.md). Альтернативно можно выполнить поиск по UUID с помощью метода `inSectionUuid`.

Следующий метод `get` возвращает [коллекцию записей](../../extend/services/collection.md).

```php
$records = EntryRecord::inSection('Blog\Post')->get();

$records = EntryRecord::inSectionUuid('a63fabaf-7c0b-4c74-b36f-7abf1a3ad1c1')->get();
```

### Получение одной записи

В сочетании с ограничением `where` можно найти одну запись с помощью метода `first`. Следующий код найдёт запись, где slug равен **first-post**.

```php
$record = EntryRecord::inSection('Blog\Post')->where('slug', 'first-post')->first();
```

Если [тип записи](../tailor/blueprints.md) установлен как `single`, можно использовать метод `findSingleForSection` для поиска записи. Аналогично для поиска по UUID используется `findSingleForSectionUuid`. Эти методы гарантируют существование записи при поиске.

```php
$record = EntryRecord::findSingleForSection('Homepage');

$record = EntryRecord::findSingleForSectionUuid('3328c303-7989-462e-b866-27e7037ba275');
```

### Вставка и обновление записей

Метод `inSection` может использоваться для динамического создания записей. Следующий код создаёт новую запись блога. Тот же код можно использовать для обновления существующей записи после её получения.

```php
$post = EntryRecord::inSection('Blog\Post');
$post->title = 'Imported Post';
$post->save();
```

## Глобальная запись

Модель `Tailor\Models\GlobalRecord` используется для хранения контента глобальной записи.

### Доступные атрибуты

В дополнение к определённым полям формы, в полученной модели доступны следующие атрибуты.

Атрибут | Описание
-------- | -------------
**id** | Первичный ключ в базе данных.
**blueprint_uuid** | UUID связанного чертежа.

### Получение глобальной записи

Для поиска глобальной записи через PHP используйте модель `Tailor\Models\GlobalRecord` и вызовите статический метод `findForGlobal`, передав handle. Альтернативно можно выполнить поиск по UUID с помощью метода `findForGlobalUuid`.

```php
GlobalRecord::findForGlobal('Blog\Config');

GlobalRecord::findForGlobalUuid('7b193500-ac0b-481f-a79c-2a362646364d');
```

## Работа со связанными полями

Связанные поля могут включать [поля-повторители](../../element/form/widget-repeater.md) и [поля записей](../../element/content/field-entries.md), и для чтения и записи этих полей требуются дополнительные шаги.

### Жадная загрузка связей

При чтении связанных полей вы можете жадно загрузить их в коллекцию с помощью метода `load`. Этот метод делает связанный контент доступным одним запросом, что оптимально для производительности.

Следующий пример жадно загружает поле **categories** и добавляет его к результату, а также демонстрирует передачу нескольких связанных полей.

```php
$records->load('categories');

$records->load(['categories', 'author']);
```

### Создание связанных полей

При записи связанных полей можно вызвать имя связи как метод для получения определения связи, а затем вызвать метод `create()`, который возвращает вновь созданную связь.

Следующий пример находит первую публикацию блога в секции **Blog\Post** и затем создаёт связанную категорию.

```php
$post = EntryRecord::inSection('Blog\Post')->first();

$post->categories()->create(['title' => 'Test', 'price' => '100']);
```

Используйте метод `make()` для создания нового пустого экземпляра модели.

```php
$category = $post->categories()->make();
```

Если категория уже существует, используйте метод `add()`. Следующий пример добавляет первую категорию блога к первой публикации.

```php
$post = EntryRecord::inSection('Blog\Post')->first();
$category = EntryRecord::inSection('Blog\Category')->first();

$post->categories()->add($category);
```

::: tip
Обратитесь к [статье о связях](../../extend/database/relations.md), чтобы узнать больше о связях моделей.
:::

## Расширение конструкторов моделей

Аналогично [расширению обычных моделей](../../extend/extending.md), вы можете расширить конструктор модели `EntryRecord` с помощью метода `extendInSection` для нацеливания на конкретный чертёж. Метод `extendInSectionUuid` также может использоваться для более точного нацеливания.

```php
EntryRecord::extendInSection('Blog\Post', function($model) {
    $model->bindEvent('model.afterDelete', function () use ($model) {
        // Model has been deleted!
    });
});
```

Конструктор модели `GlobalRecord` также поддерживает расширение с помощью методов `extendInGlobal` и `extendInGlobalUuid` для нацеливания на конкретный чертёж.

```php
GlobalRecord::extendInGlobal('Blog\Config', function($model) {
    $model->bindEvent('model.beforeSave', function () use ($model) {
        // Model has been saved!
    });
});
```

::: tip
Методы `extendInSectionUuid` и `extendInGlobalUuid` не генерируют исключение, если чертёж не найден.
:::

## Расширение моделей Tailor

В некоторых случаях вам может потребоваться объединить модели Tailor с [обычными моделями базы данных](../../extend/system/models.md).

### Связывание Tailor с обычными моделями

Поле формы `recordfinder` вводит определение связи в обычную модель, например, модель, определённую плагином. **modelClass** должен ссылаться на класс модели, а свойство **list** обязательно для единичных связей, как указано в **maxItems**.

```yaml
products:
    label: Products
    type: recordfinder
    modelClass: Acme\Test\Models\Product
    list: $/acme/test/models/product/columns.yaml
    maxItems: 1
```

Подробнее о [виджете формы recordfinder](../../element/form/widget-recordfinder.md).

### Связывание обычных моделей с Tailor

Поскольку все модели Tailor используют один и тот же класс модели, в определениях связей требуются дополнительные атрибуты. Трейт `Tailor\Traits\BlueprintRelationModel` реализует эти атрибуты для ссылки на модели Tailor, поддерживая связи Belongs To и Belongs To Many.

Когда трейт `BlueprintRelationModel` реализован в ваших моделях, вы можете указать свойство `blueprint` вместе с UUID чертежа, ссылающимся на чертёж Tailor. Следующий пример устанавливает связь Belongs To с классом `Tailor\Models\EntryRecord` под именем **author**.

```php
class Product extends Model
{
    use \Tailor\Traits\BlueprintRelationModel;

    public $belongsTo = [
        'author' => [
            \Tailor\Models\EntryRecord::class,
            'blueprint' => '6947ff28-b660-47d7-9240-24ca6d58aeae'
        ]
    ];
}
```

### Создание пользовательского поля контента

Вы также можете ссылаться на обычную модель, используя поле специфического типа. Например, пользовательское поле контента может быть жёстко привязано к модели `Customer`. Это включает создание пользовательского поля Tailor, которое предоставит полный доступ к модели и таблицам базы данных.

Внутри определения класса поля контента метод `extendModelObject` позволяет полю расширять модель записи, а `extendDatabaseTable` — добавлять столбец в таблицу базы данных.

```php
class MyContentField extends ContentFieldBase
{
    public function extendModelObject($model)
    {
        $model->belongsTo[$this->fieldName] = MyOtherModel::class;
    }

    public function extendDatabaseTable($table)
    {
        $table->integer($this->fieldName . '_id')->nullable();
    }
}
```

Это требует немного больше усилий, но результатом является простое определение **type** поля с минимальной конфигурацией.

```yaml
myfield:
    label: My Field
    type: mycontentfield
```

Подробнее о создании [пользовательских полей Tailor](../../extend/tailor-fields.md).

#### См. также

::: also
* [Виджет формы RecordFinder](../../element/form/widget-recordfinder.md)
* [Создание полей Tailor](../../extend/tailor-fields.md)
:::
