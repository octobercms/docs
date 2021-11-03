# Сериализация

<a name="introduction" class="anchor"></a>
## Введение

При построении JSON API очень часто требуется преобразовать модель и отношения в массив или JSON. Октябрь обладает как удобным механизмом для подобных конвертаций, так и инструментами для контроля над отдельными атрибутами при сериализации.

<a name="basic-usage" class="anchor"></a>
## Основы использования

#### Преобразование модели в массив

Используйте метод `toArray`, чтобы преобразовать модель и соответствующие ей [связи](../database/relations) в массив. Этот метод рекурсивный, так что все атрибуты и все отношения (включая отношения отношений) так же будут преобразованы в массивы:

    $user = User::with('roles')->first();

    return $user->toArray();

Также можно преобразовывать в массивы и [коллекции](../database/collections):

    $users = User::all();

    return $users->toArray();

#### Преобразование модели в JSON

Для преобразования модели в JSON Вы можете использовать метод `toJson`. Как и `toArray`, метод `toJson` также является рекурсивным, поэтому все атрибуты и отношения так же будут преобразованы в JSON:

    $user = User::find(1);

    return $user->toJson();

Как вариант, можно привести модель или коллекцию к строке, что автоматически вызовет метод `toJson`:

    $user = User::find(1);

    return (string) $user;

Т.к. модели и коллекции преобразуются в JSON при приведении к строке, Вы можете возвращать объекты модели напрямую из маршрутов и контроллеров:

    Route::get('users', function () {
        return User::all();
    });

<a name="hiding-attributes-from-json" class="anchor"></a>
## Скрытие атрибутов из JSON

Иногда Вам может потребоваться ограничения видимости атрибутов (например, пароля) при конвертации в массив или JSON представление. Для реализации этого функционала используйте свойство `$hidden` в своей модели:

    <?php namespace Acme\Blog\Models;

    use Model;

    class User extends Model
    {
        /**
         * The attributes that should be hidden for arrays.
         *
         * @var array
         */
        protected $hidden = ['password'];
    }

В качестве альтернативного варианта, можно использовать атрибут `$visible` и определить «белый» список разрешенных полей и отношений при конвертации в JSON:

    class User extends Model
    {
        /**
         * The attributes that should be visible in arrays.
         *
         * @var array
         */
        protected $visible = ['first_name', 'last_name'];
    }

<a name="appending-values-to-json" class="anchor"></a>
## Добавление атрибутов в JSON

Бывают ситуации, когда при экспорте Вам может понадобиться добавить атрибуты, соответствующих полей для которых в БД нет. Чтобы сделать это, для начала, определите для него [аксессор](../database/mutators):

    class User extends Model
    {
        /**
         * Get the administrator flag for the user.
         *
         * @return bool
         */
        public function getIsAdminAttribute()
        {
            return $this->attributes['admin'] == 'yes';
        }
    }

После того, как такой метод создан, добавьте имя атрибута в свойство `appends`:

    class User extends Model
    {
        /**
         * The accessors to append to the model's array form.
         *
         * @var array
         */
        protected $appends = ['is_admin'];
    }

После того как атрибут добавлен в массив `appends`, он будет доступен как при конвертации в массив так и JSON. К этим атрибутам также относятся правила, заданные в `visible` и `hidden` массивах.
