# Связи базы данных

- [Введение](#introduction)
- [Определение отношений](#defining-relationships)
- [Типы отношений](#relationship-types)
    - [Один к одному](#one-to-one)
    - [Один ко многим](#one-to-many)
    - [Многие ко многим](#many-to-many)
    - [Has Many Through](#has-many-through)
    - [Полиморфические отношения](#polymorphic-relations)
    - [Полиморфические отношения «многие ко многим»](#many-to-many-polymorphic-relations)
- [Запросы к отношениям](#querying-relations)
    - [Жадная загрузка (eager loading)](#eager-loading)
    - [Ограничения жадной загрузки](#constraining-eager-loads)
    - [Ленивая жадная загрузка](#lazy-eager-loading)
- [Вставка связанных моделей](#inserting-related-models)
    - [Связывание моделей Many to Many](#inserting-many-to-many-relations)
    - [Обновление времени](#touching-parent-timestamps)
- [Отложенное связывание](#deferred-binding)

<a name="introduction" class="anchor"></a>
## Введение

Таблицы в базе данных часто связаны между собой. Например, статья в блоге может иметь множество комментариев и быть связана с ее автором. Октябрь упрощает работу и управление такими отношениями.

<a name="defining-relationships" class="anchor"></a>
## Определение отношений

Отношения задаются в файле с классом модели. Пример:

    class User extends Model
    {
        public $hasMany = [
            'posts' => 'Acme\Blog\Models\Post'
        ]
    }

Вы можете использовать [конструктор запросов](./database-query) для работы с отношениями:

    $user->posts()->where('is_active', true)->get();

Или вы можете использовать свойства объекта:

    $user->posts;

<a name="detailed-relationships" class="anchor"></a>
### Подробные определения отношений

Каждое определение - это массив, где ключ - название отношения, а значение - массив с его свойствами. Первый элемент такого массива - название класса модели, а остальные - дополнительные параметры.

    public $hasMany = [
        'posts' => ['Acme\Blog\Models\Post', 'delete' => true]
    ];

Ниже приведены параметры, которые можно использовать со всеми отношениями:

Параметр | Описание
------------- | -------------
**order** | порядок сортировки для нескольких записей.
**conditions** | фильтрует отношение, используя запрос "raw where".
**scope** | фильтрует отношение, используя указанный метод.
**push** | если установлено `false`, то это отношение не будет сохранено при помощи метода `push()`. По умолчанию: `true`.
**delete** | если установлено `true`, то связанная модель будет удалена при удалении текущей модели или разрушении связи. По умолчанию: `false`.
**count** | если установлено `true`, то результат будет содержать только `count`. Используется для подсчета связей. По умолчанию: `false`.

Пример с использованием **order** и **conditions**:

    public $belongsToMany = [
        'categories' => [
            'Acme\Blog\Models\Category',
            'order'      => 'name desc',
            'conditions' => 'is_active = 1'
        ]
    ];

Пример с использованием **scope**:

    class Post extends Model
    {
        public $belongsToMany = [
            'categories' => [
                'Acme\Blog\Models\Category',
                'scope' => 'isActive'
            ]
        ];
    }

    class Category extends Model
    {
        public function scopeIsActive($query)
        {
            return $query->where('is_active', true)->orderBy('name', 'desc');
        }
    }

Пример с использованием **count**:

    public $belongsToMany = [
        'users' => ['Backend\Models\User'],
        'users_count' => ['Backend\Models\User', 'count' => true]
    ];

<a name="relationship-types" class="anchor"></a>
## Типы отношений

Доступны следующие типы отношений

- [Один к одному](#one-to-one)
- [Один ко многим](#one-to-many)
- [Многие ко многим](#many-to-many)
- [Has Many Through](#has-many-through)
- [Полиморфические связи](#polymorphic-relations)
- [Полиморфические связи многие ко многим](#many-to-many-polymorphic-relations)

<a name="one-to-one" class="anchor"></a>
### Один к одному

Связь вида «один к одному» является очень простой. Например, модель `User` может иметь один `Phone`. Чтобы определить это отношение, мы добавляем запись `phone` в свойство `$hasOne` в модели `User`.

    <?php namespace Acme\Blog\Models;

    use Model;

    class User extends Model
    {
        public $hasOne = [
            'phone' => 'Acme\Blog\Models\Phone'
        ];
    }

После определения отношения мы можем получить связанную запись, используя свойство модели с тем же именем. Эти свойства являются динамическими и позволяют получить к ним доступ, как если бы они были обычными атрибутами модели:

    $phone = User::find(1)->phone;

Заметьте, что модель предполагает, что внешний ключ (foreign_key) в связанной таблице называется по имени модели плюс `_id`. В данном случае предполагается, что это `user_id`. Если Вы хотите перекрыть стандартное имя, то передайте второй параметр в свойство `$hasOne`:

    public $hasOne = [
        'phone' => ['Acme\Blog\Models\Phone', 'key' => 'my_user_id']
    ];

Если же в модели, для которой Вы строите отношение (в данном случае `User`) ключ находится не в столбце id, то Вы можете указать его в качестве третьего аргумента:

    public $hasOne = [
        'phone' => ['Acme\Blog\Models\Phone', 'key' => 'my_user_id', 'otherKey' => 'my_id']
    ];

#### Определение обратного отношения

Для создания обратного отношения в модели `Phone` используйте свойство `$belongsTo` («принадлежит к»):

    class Phone extends Model
    {
        public $belongsTo = [
            'user' => 'Acme\Blog\Models\User'
        ];
    }

В примере выше модель будет искать поле `user_id` в таблице с телефонами. Если Вы хотите назвать этот ключ по-другому, то передайте это имя вторым параметром в свойстве `$belongsTo`:

    public $belongsTo = [
        'user' => ['Acme\Blog\Models\User', 'key' => 'my_user_id']
    ];


Если Ваша родительская модель не использует `id` в качестве основного ключа, или Вы хотите присоединиться к дочерней модели через другой столбец, то передайте параметр `otherKey` с названием столбца:

    public $belongsTo = [
        'user' => ['Acme\Blog\Models\User', 'key' => 'my_user_id', 'otherKey' => 'my_id']
    ];

<a name="one-to-many" class="anchor"></a>
### Один ко многим

Примером отношения «один ко многим» является статья в блоге, которая имеет несколько («много») комментариев. Вы можете смоделировать это отношение следующим образом:

    class Post extends Model
    {
        public $hasMany = [
            'comments' => 'Acme\Blog\Models\Comment'
        ];
    }

Помните, что модель автоматически определит правильный столбец внешнего ключа в модели `Comment`. По соглашению, это название модели в формате "snake case" и суффикс `_id`. В этом примере `post_id` - внешний ключ для модели `Comment`.

Теперь Вы можете получить все комментарии с помощью "динамического свойства":

    $comments = Post::find(1)->comments;

    foreach ($comments as $comment) {
        //
    }

Вы также можете добавить ограничения на получаемые комментарии при помощи метода `comments` и необходимых условий:

    $comments = Post::find(1)->comments()->where('title', 'foo')->first();

Вы также можете переопределить внешний и внутренний ключ при помощи параметров `key` и`otherKey` соответственно:

    public $hasMany = [
        'comments' => ['Acme\Blog\Models\Comment', 'key' => 'my_post_id', 'otherKey' => 'my_id']
    ];

#### Определение обратного отношения

Для определения обратного отношения используйте свойство `$belongsTo` :

    class Comment extends Model
    {
        public $belongsTo = [
            'post' => 'Acme\Blog\Models\Post'
        ];
    }

После определения отношения Вы можете получить модель `Post` для` Comment`, обратившись к "динамическому свойству" `post`:

    $comment = Comment::find(1);

    echo $comment->post->title;

Вы также можете переопределить внешний и внутренний ключ при помощи параметров `key` и`otherKey` соответственно:

    public $belongsTo = [
        'post' => ['Acme\Blog\Models\Post', 'key' => 'my_post_id', 'otherKey' => 'my_id']
    ];

<a name="many-to-many" class="anchor"></a>
### Многие ко многим

Отношения типа «многие ко многим» являются более сложными для понимания, чем остальные виды отношений. Примером может служить пользователь, имеющий много ролей, где роли также относятся ко многим пользователям. Например, один пользователь может иметь роль «Admin». Нужны три таблицы для этой связи: `users`, `roles` и `role_user`. Название таблицы `role_user` происходит от упорядоченного по алфавиту имён связанных моделей и должна иметь поля `user_id` и `role_id`.


Пример [структуры таблицы в БД](./plugin-updates#migration-files), которая может быть использована для связи моделей.

    Schema::create('role_user', function($table)
    {
        $table->integer('user_id')->unsigned();
        $table->integer('role_id')->unsigned();
        $table->primary(['user_id', 'role_id']);
    });

Вы можете определить отношение «многие ко многим» при помощи свойства `$belongsToMany` в классе модели. Пример:

    class User extends Model
    {
        public $belongsToMany = [
            'roles' => 'Acme\Blog\Models\Role'
        ];
    }

Теперь Вы можете получить роли пользователя при помощи "динамического свойства" `roles`:

    $user = User::find(1);

    foreach ($user->roles as $role) {
        //
    }

Вы также можете добавить ограничения на получаемые роли при помощи метода `roles` и необходимых условий:

    $roles = User::find(1)->roles()->orderBy('name')->get();

Вы также можете переопределить название таблицы, которая содержит связи:

    public $belongsToMany = [
        'roles' => ['Acme\Blog\Models\Role', 'table' => 'acme_blog_role_user']
    ];

Вы также можете переопределить внешний и внутренний ключ при помощи параметров `key` и`otherKey` соответственно:

    public $belongsToMany = [
        'roles' => [
            'Acme\Blog\Models\Role',
            'table'    => 'acme_blog_role_user',
            'key'      => 'my_user_id',
            'otherKey' => 'my_role_id'
        ]
    ];

#### Определение обратного отношения

Используйте свойство `$belongsToMany`, чтобы определить обратное отношение и получить, например, всех пользователей с одинаковой ролью:

    class Role extends Model
    {
        public $belongsToMany = [
            'users' => 'Acme\Blog\Models\User'
        ];
    }

#### Получение промежуточных столбцов таблицы

Как Вы уже узнали, работа с отношениями «многие ко многим» требует наличия промежуточной таблицы. Модели предоставляют некоторые очень полезные способы взаимодействия с этой таблицей. Например, предположим, что наш объект `User` имеет много объектов `Role`, с которыми он связан. После доступа к этой связи мы можем получить доступ к промежуточной таблице, используя атрибут `pivot` для моделей:

    $user = User::find(1);

    foreach ($user->roles as $role) {
        echo $role->pivot->created_at;
    }

Обратите внимание на то, что каждой модели `Role`, которую мы получаем, автоматически присваивается атрибут `pivot`. Этот атрибут содержит модель, представляющую собой промежуточную таблицу, и может использоваться как любая другая модель.

По умолчанию в такой модели будут доступны только ключи. Если ваша промежуточная таблица содержит дополнительные атрибуты, то Вы должны указать их при определении отношения:

    public $belongsToMany = [
        'roles' => [
            'Acme\Blog\Models\Role',
            'pivot' => ['column1', 'column2']
        ]
    ];

Если Вы хотите, чтобы сводная таблица автоматически сохраняла отметки времени`created_at` и `updated_at`, используйте параметр `timestamps` в определении отношения:

    public $belongsToMany = [
        'roles' => ['Acme\Blog\Models\Role', 'timestamps' => true]
    ];

Следующие параметры поддерживаются отношениями `belongsToMany`:

Параметр | Описание
------------- | -------------
**table** | название промежуточной таблицы.
**key** | внешний ключ.
**otherKey** | внутренний ключ.
**pivot** | массив со свойствами из промежуточной таблицы.
**pivotModel** | пользовательский класс модели. По умолчанию: `October\Rain\Database\Pivot`.
**timestamps** | добавлять или не добавлять отметки времени `created_at` и `updated_at`. По умолчанию: `false`

<a name="has-many-through" class="anchor"></a>
### Множество связей через третью таблицу (Has Many Through)

Отношение «has many through» обеспечивает удобный короткий путь для доступа к удаленным отношениям через промежуточные отношения. Например, сделаем так, чтобы модель `Country` могла иметь много `Post` через модель `User`. Структура таблиц такая:

    countries
        id - integer
        name - string

    users
        id - integer
        country_id - integer
        name - string

    posts
        id - integer
        user_id - integer
        title - string

Хотя `posts` и не содержит `country_id`, отношение `hasManyThrough` позволяет получить доступ до стран через `$country->posts`. Чтобы выполнить этот запрос, модель проверяет существование `country_id` в промежуточной таблице `users`. После поиска совпадающих идентификаторов пользователей они используются для запроса таблицы `posts`. 

Давайте теперь определим отношение для модели `Country`:

    class Country extends Model
    {
        public $hasManyThrough = [
            'posts' => [
                'Acme\Blog\Models\Post',
                'through' => 'Acme\Blog\Models\User'
            ],
        ];
    }

Первый аргумент, переданный в отношение `$hasManyThrough` - это имя конечной модели, к которой мы хотим получить доступ, а параметр `through` - это имя промежуточной модели.

При выполнении запросов используются стандартные соглашения с внешними ключами, где `key` - это название внешнего ключа промежуточной модели, а параметр `throughKey` - название внешнего ключа в конечной модели.

    public $hasManyThrough = [
        'posts' => [
            'Acme\Blog\Models\Post',
            'key'        => 'my_country_id',
            'through'    => 'Acme\Blog\Models\User',
            'throughKey' => 'my_user_id'
        ],
    ];

<a name="polymorphic-relations" class="anchor"></a>
### Полиморфические отношения

#### Структура таблицы

Полиморфные отношения позволяют модели быть связанной с более, чем одной моделью. Например, модель `Photo` может быть связана с моделям `Staff` (сотрудник) и `Product` (товар). Вы можете задать такое отношение следующим образом:

    staff
        id - integer
        name - string

    products
        id - integer
        price - integer

    photos
        id - integer
        path - string
        imageable_id - integer
        imageable_type - string

Следует особо отметить два столбца: `imageable_id` и `imageable_type` в таблице `photos`. Столбец `imageable_id` будет содержать значения идентификаторов владельцев или товаров, в то время как столбец `imageable_type` будет содержать имя класса модели владельца. Столбец `imageable_type` - это то, как ORM определяет, какой «тип» модели должен возвращаться при доступе к отношению `imageable`.

#### Структура модели

Давайте теперь рассмотрим описание модели, необходимое для построения этого отношения:

    class Photo extends Model
    {
        public $morphTo = [
            'imageable' => []
        ];
    }

    class Staff extends Model
    {
        public $morphMany = [
            'photos' => ['Acme\Blog\Models\Photo', 'name' => 'imageable']
        ];
    }

    class Product extends Model
    {
        public $morphMany = [
            'photos' => ['Acme\Blog\Models\Photo', 'name' => 'imageable']
        ];
    }

#### Чтение полиморфной связи

После определения таблицы и моделей базы данных Вы можете получить доступ к отношениям через свои модели. Например, чтобы получить доступ ко всем фотографиям для сотрудника достаточно просто использовать "динамическое свойство" `photos`:


    $staff = Staff::find(1);

    foreach ($staff->photos as $photo) {
        //
    }

Вы также можете получить владельца полиморфного отношения из полиморфной модели, обратившись к названию отношения `morphTo`. В нашем случае это `imageable` в модели `Photo`. Далее используем "динамическое свойство":

    $photo = Photo::find(1);

    $imageable = $photo->imageable;

Отношение `imageable` в модели `Photo` будет возвращать либо экземпляр `Staff`, либо` Product`, в зависимости от того, какому типу модели принадлежат фотографии.

<a name="many-to-many-polymorphic-relations" class="anchor"></a>
### Полиморфные отношения «многие ко многим»

#### Структура таблицы

Помимо стандартных полиморфных отношений, Вы можете определить полиморфные отношения типа «многие ко многим». Например, у нас есть блог, в котором могут публиковаться `Post` и `Video`, и каждый из них может иметь набор тэгов `Tag`. Использование полиморфного отношения «многие ко многим» позволяет Вам иметь единый список уникальных тегов, которые используются и в сообщениях, и в видео. Сначала рассмотрим структуру таблицы:

    posts
        id - integer
        name - string

    videos
        id - integer
        name - string

    tags
        id - integer
        name - string

    taggables
        tag_id - integer
        taggable_id - integer
        taggable_type - string

#### Структура модели

Затем опишем отношение в моделях `Post` и` Video` в свойстве `$morphToMany`:

    class Post extends Model
    {
        public $morphToMany = [
            'tags' => ['Acme\Blog\Models\Tag', 'name' => 'taggable']
        ];
    }

#### Определение обратного отношения

В модели `Tag` Вы должны указать связь к необходимым моделям. Пример:

    class Tag extends Model
    {
        public $morphedByMany = [
            'posts'  => ['Acme\Blog\Models\Post', 'name' => 'taggable'],
            'videos' => ['Acme\Blog\Models\Video', 'name' => 'taggable']
        ];
    }

#### Получение отношения

После определения таблицы и моделей базы данных Вы можете получить доступ к отношениям через свои модели. Например, чтобы получить доступ ко всем тегам для поста, используйте "динамическое свойство" `tags`:

    $post = Post::find(1);

    foreach ($post->tags as $tag) {
        //
    }

Вы также можете получить владельца полиморфного отношения из полиморфной модели, обратившись к имени отношения, определенного в свойстве `$morphedByMany`. В нашем случае это методы `posts` или` videos` в модели `Tag`. Таким образом, вы получите доступ к этим отношениям как "динамические свойства":

    $tag = Tag::find(1);

    foreach ($tag->videos as $video) {
        //
    }

<a name="querying-relations" class="anchor"></a>
## Запросы к отношениям

Поскольку все типы отношений Модели могут быть вызваны через функции, то Вы можете вызывать эти функции для получения экземпляра отношения без фактического выполнения запросов. Кроме того, все типы отношений также используют [конструктор запросов](./database-query), позволяя Вам накладывать ограничения, фильтровать и сортировать отношения прежде чем выполнить SQL запрос.

Например, у нас есть блог, в котором модель `User` связана с моделью `Post`:

    class User extends Model
    {
        public $hasMany = [
            'posts' => ['Acme\Blog\Models\Post']
        ];
    }

Вы можете получить все опубликованные записи пользователя следующим образом:

    $user = User::find(1);

    $user->posts()->where('active', 1)->get();

#### Методы отношений и Динамические свойства

Если Вам не нужны дополнительные ограничения на запрос, то лучше всего использовать динамические свойства. Например, продолжая рассматривать модели `User` и `Post`, Вы можете получить доступ ко всем сообщениям пользователя следующим образом:

    $user = User::find(1);

    foreach ($user->posts as $post) {
        //
    }


Динамические свойства являются "lazy loading", то есть они будут загружать данные только тогда, когда Вы хотите их получить. Также разработчики часто используют ["eager loading"](#eager-loading), для получения предварительно загруженных отношений, которые, как они знают, будут доступны после загрузки модели. 

#### Запрос на существование отношений

Вы можете ограничить свои результаты при доступе к записям модели. Например, представьте, что Вы хотите получить все сообщения в блоге, содержащие хотя бы один комментарий. Для этого вы можете передать имя отношения методу `has`:

    // Retrieve all posts that have at least one comment...
    $posts = Post::has('comments')->get();

Вы также можете использовать операторы сравнения:

    // Retrieve all posts that have three or more comments...
    $posts = Post::has('comments', '>=', 3)->get();

Вы также можете использовать точечную нотацию. Например, чтобы получить все записи, у которой есть хотя бы один оцененный комментарий:

    // Retrieve all posts that have at least one comment with votes...
    $posts = Post::has('comments.votes')->get();

Вы также можете использовать методы `whereHas` и `orWhereHas`:

    // Retrieve all posts with at least one comment containing words like foo%
    $posts = Post::whereHas('comments', function ($query) {
        $query->where('content', 'like', 'foo%');
    })->get();

<a name="eager-loading" class="anchor"></a>
### Жадная загрузка (eager loading)


Данные об отношениях подгружаются только в момент обращения к динамическому свойству. Жадная загрузка (eager loading) призвана устранить проблему N+1. Например, представьте, что у нас есть модель `Book`, которая связана с моделью `Author`. Отношение определено как:

    class Book extends Model
    {
        public $belongsTo = [
            'author' => ['Acme\Blog\Models\Author']
        ];
    }

Теперь загрузим все книги и их авторов:

    $books = Book::all();

    foreach ($books as $book) {
        echo $book->author->name;
    }

Цикл выполнит один запрос для получения всех книг в таблице, а затем будет выполнять по одному запросу на каждую книгу для получения автора. Таким образом, если у нас 25 книг, то потребуется 26 запросов.

Теперь давайте заранее получим всех авторов при помощи методов `with`:

    $books = Book::with('author')->get();

    foreach ($books as $book) {
        echo $book->author->name;
    }

Тогда будут выполнены всего два запроса:

    select * from books

    select * from authors where id in (1, 2, 3, 4, 5, ...)

#### Жадная загрузка нескольких отношений

Иногда Вам может потребоваться жадная загрузка нескольких разных отношений за одну операцию. Для этого просто передайте дополнительные аргументы методу `with`:

    $books = Book::with('author', 'publisher')->get();

#### Вложенная жадная загрузка

Используйте точечную нотацию, чтобы получить вложенные отношения. Например, давайте получим всех авторов и их контакты:

    $books = Book::with('author.contacts')->get();

<a name="constraining-eager-loads" class="anchor"></a>
### Ограничения жадной загрузки

Иногда вам может быть нужно не только загрузить отношение, но также указать условие для его загрузки:

    $users = User::with([
        'posts' => function ($query) {
            $query->where('title', 'like', '%first%');
        }
    ])->get();

В этом примере мы загружаем сообщения пользователя, но только те, заголовок которых содержит подстроку `first`.

    $users = User::with([
        'posts' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }
    ])->get();

<a name="lazy-eager-loading" class="anchor"></a>
### Ленивая жадная загрузка

Можно подгрузить отношения динамически, т.е. после того как вы получили коллекцию основных объектов. Это может быть полезно тогда, когда Вам неизвестно, понадобятся ли они в дальнейшем:

    $books = Book::all();

    if ($someCondition) {
        $books->load('author', 'publisher');
    }

Вы также можете дополнить запрос при помощи функции-замыкания:

    $books->load([
        'author' => function ($query) {
            $query->orderBy('published_date', 'asc');
        }
    ]);

<a name="inserting-related-models" class="anchor"></a>
## Вставка связанных моделей

#### Метод Save

Часто Вам нужно будет добавить связанную модель. Например, Вы можете добавить новый комментарий к посту. Вместо явного указания значения для поля `post_id` Вы можете вставить модель через её родительскую модель - `Post`:

    $comment = new Comment(['message' => 'A new comment.']);

    $post = Post::find(1);

    $comment = $post->comments()->save($comment);

Обратите внимание, что мы не получили доступ к отношению `comments` как динамическому свойству. Вместо этого мы вызвали метод `comments`, чтобы получить экземпляр отношения. Метод `save` автоматически добавит соответствующее значение` post_id` к новой модели `Comment`.

Если вам нужно сохранить несколько связанных моделей, вы можете использовать метод `saveMany`:

    $post = Post::find(1);

    $post->comments()->saveMany([
        new Comment(['message' => 'A new comment.']),
        new Comment(['message' => 'Another comment.']),
    ]);

#### Save и Отношения Many To Many

При работе с отношениями «многие ко многим» метод `save` принимает в качестве второго аргумента массив дополнительных атрибутов промежуточной таблицы:

    User::find(1)->roles()->save($role, ['expires' => $expires]);

#### Метод Create

В дополнение к методам `save` и `saveMany`, Вы можете также использовать метод `create`, который принимает массив атрибутов, создает модель и добавляет запись в БД. В отличие от метода `save`, метод `create` не использует экземпляр модели, а принимает обычный PHP `array`:

    $post = Post::find(1);

    $comment = $post->comments()->create([
        'message' => 'A new comment.',
    ]);

Перед использованием метода `create` убедитесь, что у Вас настроено [массовое заполнение ](model#mass-assignment).

<a name="updating-belongs-to-relationships" class="anchor"></a>
#### Обновление отношений "Belongs To"

При обновлении отношения `belongsTo` Вы можете использовать метод `associate`. Этот метод установит внешний ключ для дочерней модели:

    $account = Account::find(10);

    $user->account()->associate($account);

    $user->save();

Используйте метод `dissociate`, чтобы разорвать связь между моделями и удалить внешний ключ:

    $user->account()->dissociate();

    $user->save();

<a name="inserting-many-to-many-relations" class="anchor"></a>
### Связывание моделей Many to Many

#### Прикрепление / Отсоединение

Вы также можете вставлять связанные модели при работе с отношениями «многие ко многим». Продолжим использовать наши модели `User` и `Role` в качестве примеров (`User` может иметь несколько `Role`). Вы можем легко привязать новые роли к пользователю методом `attach`:

    $user = User::find(1);

    $user->roles()->attach($roleId);

Вы также можете передать массив атрибутов, которые должны быть сохранены в связующей (pivot) таблице для этого отношения:

    $user->roles()->attach($roleId, ['expires' => $expires]);

Конечно, существует противоположность `attach` - метод `detach`:

    // Detach a single role from the user...
    $user->roles()->detach($roleId);

    // Detach all roles from the user...
    $user->roles()->detach();

И `attach` и `detach` могут принимать массивы ID:

    $user = User::find(1);

    $user->roles()->detach([1, 2, 3]);

    $user->roles()->attach([1 => ['expires' => $expires], 2, 3]);

#### Использование Sync для привязки моделей "многие ко многим"

Вы также можете использовать метод `sync` для привязки связанных моделей. Этот метод принимает массив ID, которые должны быть сохранены в связующей таблице. Когда операция завершится только переданные ID будут существовать в промежуточной таблице для данной модели:

    $user->roles()->sync([1, 2, 3]);

Вы также можете передать дополнительные атрибуты в промежуточную таблицу:

    $user->roles()->sync([1 => ['expires' => true], 2, 3]);

<a name="touching-parent-timestamps" class="anchor"></a>
### Обновление времени

Когда модель принадлежит к другой посредством `belongsTo` или `belongsToMany` - например, `Comment`, принадлежащий `Post`, то иногда нужно обновить время изменения владельца при обновлении связанной модели. Например, при изменении модели `Comment` Вы можете обновлять поле `updated_at ` её модели `Post`. Просто добавьте свойство `touches`, содержащее имена всех отношений с моделями-потомками:

    class Comment extends Model
    {
        /**
         * All of the relationships to be touched.
         */
        protected $touches = ['post'];

        /**
         * Relations
         */
        public $belongsTo = [
            'post' => ['Acme\Blog\Models\Post']
        ];
    }

Теперь при обновлении `Comment` владелец `Post` также обновит своё поле `updated_at`:

    $comment = Comment::find(1);

    $comment->text = 'Edit to this comment!';

    $comment->save();

<a name="deferred-binding" class="anchor"></a>
## Отложенное связывание

Отложенное связывание позволяет отложить привязку отношений до тех пор, пока основная запись не зафиксирует изменения. Это особенно полезно, если Вам нужно подготовить некоторые модели (например, загрузку файлов) и связать их с другой моделью, которая еще не существует.

Вы можете отложить любое количество связываний при помощи **session key**. Когда основная запись сохраняется вместе с ключом сеанса, отношения обновляются автоматически. Отложенное связывание  поддерживается автоматически в административной части сайта в [формах](./backend-form), но Вы можете использовать эту функцию и в других местах.

<a name="deferred-session-key" class="anchor"></a>
### Генерация **session key**

Используйте PHP функцию `uniqid()`для генерации **session key**:

    $sessionKey = uniqid('session_key', true);

<a name="defer-binding" class="anchor"></a>
### Отложить связывания отношений

Комментарий в следующем примере не будет добавлен к статье, пока статья не будет сохранена.

    $comment = new Comment;
    $comment->content = "Hello world!";
    $comment->save();

    $post = new Post;
    $post->comments()->add($comment, $sessionKey);

<a name="defer-unbinding" class="anchor"></a>
### Отложить разрыв связей

Комментарий в следующем примере не будет удален, если сообщение не будет сохранено.

    $comment = Comment::find(1);
    $post = Post::find(1);
    $post->comments()->delete($comment, $sessionKey);

<a name="list-all-bindings" class="anchor"></a>
### Список всех связей

Используйте метод `withDeferred()`, чтобы получить все записи, включая отложенные. Результаты также будут включать существующие отношения.

    $post->comments()->withDeferred($sessionKey)->get();

<a name="cancel-all-bindings" class="anchor"></a>
### Отмена всех связей

Используйте метод `cancelDeferred()`, чтобы отменить отложенное связывание и удалить дочерние объекты.

    $post->cancelDeferred($sessionKey);

<a name="commit-all-bindings" class="anchor"></a>
### Зафиксировать все связи

Используйте **session key** в методе `save()`, чтобы зафиксировать все отложенные связи.

    $post = new Post;
    $post->title = "First blog post";
    $post->save(null, $sessionKey);

Используйте такой же подход с методом `create()`:

    $post = Post::create(['title' => 'First blog post'], $sessionKey);

<a name="lazily-commit-bindings" class="anchor"></a>
### Ленивая фиксация связей

Если у Вас нет возможности использовать `$sessionKey` во время сохранения, то Вы можете зафиксировать связывание в любое время, используя следующий код:

    $post->commitDeferred($sessionKey);

<a name="cleanup-bindings" class="anchor"></a>
### Очистка осиротевших привязок

Уничтожает все привязки старше 1 дня, которые не были зафиксированы:

    October\Rain\Database\Models\DeferredBinding::cleanUp(1);

> **Примечание:** Октябрь автоматически уничтожает отложенные связывания, которые старше 5 дней. Это происходит, когда пользователь заходит в административную часть сайта.
