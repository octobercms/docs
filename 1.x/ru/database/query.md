# Запросы к базе данных

<a name="introduction" class="anchor"></a>
## Введение

Query Builder - конструктор запросов - предоставляет удобный, выразительный интерфейс для создания и выполнения запросов к базе данных. Он может использоваться для выполнения большинства типов операций и работает со всеми подерживаемыми СУБД.

> **Примечание:**  конструктор запросов использует средства PDO для защиты вашего приложения от SQL-инъекций. Нет необходимости экранировать строки перед их передачей в запрос.

<a name="retrieving-results" class="anchor"></a>
## Получение результатов

#### Получение всех строк из таблицы

Давайте получим все записи из таблицы при помощи метода `get`. Для этого используем метод `table` из фасада `Db`, который вернет экземпляр конструктора запросов, позволяя Вам добавлять остальные методы друг за другом и затем, наконец, получить результат:

    $users = Db::table('users')->get();

Как и [сырые SQL-запросы](../database/basics#running-queries), метод `get` возвращает массив с результатами, элементы которого являются экземплярами объекта PHP `stdClass`. Вы можете получить доступ к значению каждого столбца, обратившись к нему как свойству объекта:

    foreach ($users as $user) {
        echo $user->name;
    }

#### Получение одной записи

    $user = Db::table('users')->where('name', 'John')->first();

    echo $user->name;

#### Получение одного поля из записей

    $email = Db::table('users')->where('name', 'John')->pluck('email');

#### Обработка большого объема данных

Если Вам нужно обработать тысячи записей базы данных, используйте метод `chunk`, который извлекает несколько строк за раз и передает их в `Closure` для обработки. Пример:

    Db::table('users')->chunk(100, function($users) {
        foreach ($users as $user) {
            //
        }
    });

Вы можете остановить извлечение строк при помощи `return false` в `Closure`:

    Db::table('users')->chunk(100, function($users) {
        // Process the records...

        return false;
    });

#### Получение списка всех значений одного поля

Используйте метод `lists`, чтобы вернуть массив значений одного поля:

    $titles = Db::table('roles')->lists('title');

    foreach ($titles as $title) {
        echo $title;
    }

Вы можете указать произвольный ключ для возвращаемого массива:

    $roles = Db::table('roles')->lists('title', 'name');

    foreach ($roles as $name => $title) {
        echo $title;
    }

<a name="aggregates" class="anchor"></a>
### Аггрегатные функции

Конструктор запросов содержит множество аггрегатных методов, таких как `count`, `max`, `min`, `avg` и `sum`.

    $users = Db::table('users')->count();

    $price = Db::table('orders')->max('price');

Вы также можете комбинировать эти методы с другими:

    $price = Db::table('orders')
        ->where('is_finalized', 1)
        ->avg('price');

<a name="selects" class="anchor"></a>
## Выборки (SELECT)

#### Указание выбора

Вы можете использовать метод `select`, чтобы выбрать только те данные, которые Вам нужны:

    $users = Db::table('users')->select('name', 'email as user_email')->get();

Метод `distinct` позволяет принудительно возвращать результаты запроса:

    $users = Db::table('users')->distinct()->get();

Используйье метод `addSelect`, чтобы добавить еще один столбец в конструктор запросов:

    $query = Db::table('users')->select('name');

    $users = $query->addSelect('age')->get();

#### Использование сырого выражения

Используйте метод `Db::raw`, чтобы добавить уже готовое SQL-выражение в ваш запрос:

    $users = Db::table('users')
        ->select(Db::raw('count(*) as user_count, status'))
        ->where('status', '<>', 1)
        ->groupBy('status')
        ->get();

<a name="joins" class="anchor"></a>
## Объединения (JOIN)

#### Объединение типа INNER JOIN

    $users = Db::table('users')
        ->join('contacts', 'users.id', '=', 'contacts.user_id')
        ->join('orders', 'users.id', '=', 'orders.user_id')
        ->select('users.*', 'contacts.phone', 'orders.price')
        ->get();

#### Объединение типа LEFT JOIN

    $users = Db::table('users')
        ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
        ->get();

#### Расширенное объединение

Вы можете указать более сложные условия:

    Db::table('users')
        ->join('contacts', function ($join) {
            $join->on('users.id', '=', 'contacts.user_id')->orOn(...);
        })
        ->get();

Внутри join() можно использовать `where` и `orWhere`:

    Db::table('users')
        ->join('contacts', function ($join) {
            $join->on('users.id', '=', 'contacts.user_id')
                ->where('contacts.user_id', '>', 5);
        })
        ->get();

<a name="unions" class="anchor"></a>
## Слияния (UNION)

Конструктор запросов позволяет создавать слияния двух запросов вместе:

    $first = Db::table('users')
        ->whereNull('first_name');

    $users = Db::table('users')
        ->whereNull('last_name')
        ->union($first)
        ->get();

Также существует метод `unionAll` с аналогичными параметрами.

<a name="where-clauses" class="anchor"></a>
## Выражения с WHERE

#### Простой пример

    $users = Db::table('users')->where('votes', '=', 100)->get();

или

    $users = Db::table('users')->where('votes', 100)->get();

Вы также можете использовать другие операторы сравнения:

    $users = Db::table('users')
        ->where('votes', '>=', 100)
        ->get();

    $users = Db::table('users')
        ->where('votes', '<>', 100)
        ->get();

    $users = Db::table('users')
        ->where('name', 'like', 'T%')
        ->get();

#### Условия ИЛИ:

    $users = Db::table('users')
        ->where('votes', '>', 100)
        ->orWhere('name', 'John')
        ->get();

#### Фильтрация по интервалу значений

    $users = Db::table('users')
        ->whereBetween('votes', [1, 100])->get();

    $users = Db::table('users')
        ->whereNotBetween('votes', [1, 100])
        ->get();

#### Фильтрация по совпадению с массивом значений

    $users = Db::table('users')
        ->whereIn('id', [1, 2, 3])
        ->get();

    $users = Db::table('users')
        ->whereNotIn('id', [1, 2, 3])
        ->get();

#### Поиск неустановленных значений (NULL)

    $users = Db::table('users')
        ->whereNull('updated_at')
        ->get();

    $users = Db::table('users')
        ->whereNotNull('updated_at')
        ->get();

<a name="advanced-where-clauses" class="anchor"></a>
## Сложные выражения с WHERE

#### Группировка условий

Иногда вам нужно сделать выборку по более сложным параметрам, таким как "существует ли" или вложенная группировка условий. Конструктор запросов справится и с этим:

    Db::table('users')
        ->where('name', '=', 'John')
        ->orWhere(function ($query) {
            $query->where('votes', '>', 100)
                ->where('title', '<>', 'Admin');
        })
        ->get();

Команда выше выполнит такой SQL:

    select * from users where name = 'John' or (votes > 100 and title <> 'Admin')

#### Проверка на существование

    Db::table('users')
        ->whereExists(function ($query) {
            $query->select(Db::raw(1))
                ->from('orders')
                ->whereRaw('orders.user_id = users.id');
        })
        ->get();

Эта команда выше выполнит такой запрос:

    select * from users where exists (
        select 1 from orders where orders.user_id = users.id
    )

<a name="ordering-grouping-limit-and-offset" class="anchor"></a>
## Сортировка, группировка, ограничение и смещение

#### Сортировка

    $users = Db::table('users')
        ->orderBy('name', 'desc') // `asc` или `desc`
        ->get();

#### Группировка

    $users = Db::table('users')
        ->groupBy('account_id')
        ->having('account_id', '>', 100) // также как в where
        ->get();

    $users = Db::table('orders')
        ->select('department', Db::raw('SUM(price) as total_sales'))
        ->groupBy('department')
        ->havingRaw('SUM(price) > 2500')
        ->get();

#### Ограничение и смещение

    $users = Db::table('users')->skip(10)->take(5)->get();

<a name="inserts" class="anchor"></a>
## Вставка (INSERT)

####Вставка записи в таблицу

    Db::table('users')->insert(
        ['email' => 'john@example.com', 'votes' => 0]
    );

#### Вставка нескольких записей одновременно

    Db::table('users')->insert([
        ['email' => 'taylor@example.com', 'votes' => 0],
        ['email' => 'dayle@example.com', 'votes' => 0]
    ]);

#### Вставка записи и получение её нового ID

Если таблица имеет автоинкрементный индекс, то можно использовать метод `insertGetId` для вставки записи и получения её порядкового номера:

    $id = Db::table('users')->insertGetId(
        ['email' => 'john@example.com', 'votes' => 0]
    );

<a name="updates" class="anchor"></a>
## Обновление (UPDATE)

#### Обновление записей в таблице

    Db::table('users')
        ->where('id', 1)
        ->update(['votes' => 1]);

#### Увеличение или уменьшение значения поля

    Db::table('users')->increment('votes');

    Db::table('users')->increment('votes', 5);

    Db::table('users')->decrement('votes');

    Db::table('users')->decrement('votes', 5);

Вы также можете указать дополнительные поля для изменения:

    Db::table('users')->increment('votes', 1, ['name' => 'John']);

<a name="deletes" class="anchor"></a>
## Удаление (DELETE)

#### Удаление всех записей

    Db::table('users')->delete();

#### Удаление записей из таблицы

    Db::table('users')->where('votes', '<', 100)->delete();

#### Очистка таблицы

    Db::table('users')->truncate();

<a name="pessimistic-locking" class="anchor"></a>
## Блокирование (lock) данных

#### SELECT с 'shared lock':

    Db::table('users')->where('votes', '>', 100)->sharedLock()->get();

#### SELECT с 'lock for update':

    Db::table('users')->where('votes', '>', 100)->lockForUpdate()->get();

<a name="caching-queries" class="anchor"></a>
## Кэширование запросов

Вы можете легко закэшировать запрос при помощи методов `remember` или `rememberForever`:

    $users = Db::table('users')->remember(10)->get();

В этом примере результаты выборки будут сохранены в кэше на 10 минут. В течении этого времени данный запрос не будет отправляться к СУБД - вместо этого результат будет получен из системы кэширования, указанного по умолчанию в вашем файле настроек.
