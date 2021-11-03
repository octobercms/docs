# Мутаторы (Mutators)

<a name="introduction" class="anchor"></a>
## Введение

Аксессоры (accessors) и мутаторы (mutators) - это специальные методы, которые позволяют Вам преобразовывать данные на лету в процессе получения или записи данных в модель. Например, Вы хотите [шифровать](../services/encryption.md) данные в БД, и дешифровать их в момент чтения из базы данных. При помощи аксессоров и мутаторов вы можете сделать этот процесс прозрачным для всей остальной логики приложения.

<a name="accessors-and-mutators" class="anchor"></a>
## Accessors & mutators

#### Определение аксессора

Чтобы определить аксессор на поле `foo` модели, создайте метод `getFooAttribute`. `Foo` - это название поля, переведенное в "camel case". Названия полей с подчеркиваниями, как всегда, будут преобразованы в строки с большими буквами перед подчеркиваниями. Аксессрор будет вызываться каждый раз, когда будет производиться чтение заданного поля в модели. Например, создадим аксессор на поле `first_name`:

    <?php namespace Acme\Blog\Models;

    use Model;

    class User extends Model
    {
        /**
         * Get the user's first name.
         *
         * @param  string  $value
         * @return string
         */
        public function getFirstNameAttribute($value)
        {
            return ucfirst($value);
        }
    }

Аксессор получает значение оригинальное поля и возвращает преобразованное. Теперь при обычном доступе к полю, мы получим значение с заменённой первой буквой на большую:

    $user = User::find(1);

    $firstName = $user->first_name;

#### Определение мутатора

Чтобы определить мутатор на поле foo модели, создайте метод `setFooAttribute`. `Foo` - это название поля, переведенное в "camel case". Названия полей с подчеркиваниями, как всегда, будут преобразованы в строки с большими буквами перед подчеркиваниями. Мутатор будет автоматически вызываться каждый раз, когда заданному полю модели будет присваиваться значение. Например, создадим мутатор на поле `first_name`:

    <?php namespace Acme\Blog\Models;

    use Model;

    class User extends Model
    {
        /**
         * Set the user's first name.
         *
         * @param  string  $value
         * @return string
         */
        public function setFirstNameAttribute($value)
        {
            $this->attributes['first_name'] = strtolower($value);
        }
    }

Мутатор получит значение, которое устанавливается в атрибуте, что позволяет Вам манипулировать им. Например, если Вы попытаетесь установить значение `Sally` для атрибута `first_name`:

    $user = User::find(1);

    $user->first_name = 'Sally';

то вызовется функция `setFirstNameAttribute` со значением `Sally`. Мутатор принимает значение, которое надо присвоить полю и присваивает его, используя внутреннее свойство модели Eloquent $attributes.

<a name="date-mutators" class="anchor"></a>
## Мутаторы дат

По умолчанию в моделях Октября есть внутренние мутаторы и аксессоры на поля `created_at` и `updated_at`, которые преобразуют timestamp, хранящийся в базе данных, в объект [Carbon](https://github.com/briannesbitt/Carbon), который расширяет встроенный в PHP класс `DateTime` и содержит много полезных методов для манипуляции с датой.

Вы можете изменить список полей, к которым применяются эти мутаторы дат (в том числе полностью запретив такое поведение), переопределив у себя в модели свойство `$dates`:

    class User extends Model
    {
        /**
         * The attributes that should be mutated to dates.
         *
         * @var array
         */
        protected $dates = ['created_at', 'updated_at', 'disabled_at'];
    }

В полях, определенные в $dates, Вы можете записывать UNIX timestamp (целое число секунд с начала эпохи UNIX), строку даты (Y-m-d), строку даты со временем (Y-m-d H:i:s) и объект `DateTime` / `Carbon` -  мутаторы все это поймут и при записи в базу данных преобразуют в timestamp-строку.

    $user = User::find(1);

    $user->disabled_at = Carbon::now();

    $user->save();

При получении значений из этих полей вы получите объект класса [Carbon](https://github.com/briannesbitt/Carbon). Далее вы можете использовать все методы этого класса.

    $user = User::find(1);

    return $user->disabled_at->getTimestamp();

По умолчанию все даты отформатированы в виде`'Y-m-d H:i:s'`. Если Вы хотите изменить формат отображения, то добавьте свойство `$dateFormat` в Вашу модель.

    class Flight extends Model
    {
        /**
         * The storage format of the model's date columns.
         *
         * @var string
         */
        protected $dateFormat = 'U';
    }

<a name="attribute-casting" class="anchor"></a>
## Приведение типов

Помимо аксессоров, у моделей есть более простой способ приводить атрибуты к определённому типу при чтении из базы данных. Для реализации такого поведения, определите свойство `$casts`. Это должен быть массив, где ключ - название атрибута, а значение - типа данных. Поддерживаются: `integer`, `real`, `float`, `double`, `string`, `boolean`, `object` and `array`.


Например, если мы хотим, чтобы атрибут `is_admin`, который в базе данных имеет тип tiny integer и принимает значения 0 или 1, у нас в модели имел логический тип:

    class User extends Model
    {
        /**
         * The attributes that should be casted to native types.
         *
         * @var array
         */
        protected $casts = [
            'is_admin' => 'boolean',
        ];
    }

Теперь каждый раз, когда мы будем запрашивать в модели этот атрибут, будем получать `true` или `false`.

    $user = User::find(1);

    if ($user->is_admin) {
        //
    }

#### Преобразование в массив

Преобразование в массив особенно полезно применять там, где данные в базе данных хранятся в сериализованном JSON. В этом случае в коде можно работать с атрибутом как с массивом, а при записи/чтении из базы данных он будет автоматически сериализовываться/десериализовываться.

    class User extends Model
    {
        /**
         * The attributes that should be casted to native types.
         *
         * @var array
         */
        protected $casts = [
            'options' => 'array',
        ];
    }

Пример:

    $user = User::find(1);

    $options = $user->options;

    $options['key'] = 'value';

    $user->options = $options;

    $user->save();
