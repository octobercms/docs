# Коллекции

<a name="introduction" class="anchor" ></a>
## Введение

Все наборы результатов, возвращаемые моделью, являются экземплярами объекта `Illuminate\Database\Eloquent\Collection`, в том числе результаты, получаемые при помощи метода `get` или доступные через отношения. Объект коллекции расширяет [базовую коллекцию](../services/collections). Поэтому он наследует десятки методов, используемых для гибкой работы с базовым набором моделей.

Конечно же, все коллекции также служат в качестве итераторов, позволяя вам перебирать их в цикле, как простые массивы в PHP:

    $users = User::where('is_active', true)->get();

    foreach ($users as $user) {
        echo $user->name;
    }

Тем не менее, коллекции гораздо мощнее, чем массивы и предоставляют различные варианты операций отображения/уменьшения с использованием интуитивно понятного интерфейса. Например, давайте удалим все неактивные модели и возвратим имена для каждого оставшегося пользователя:

    $users = User::get();

    $names = $users->filter(function ($user) {
            return $user->is_active === true;
        })
        ->map(function ($user) {
            return $user->name;
        });

<a name="usage-examples" class="anchor" ></a>
## Примеры

Следующие методы вернут объект `Коллекции`:

    $collection = User::all();
    $collection = User::where('name', 'Joe')->get();
    $collection = User::find(3)->groups;

#### Конвертация коллекции в JSON или массив

    $phpArray = $collection->toArray();

    $jsonString = $collection->toJson();

#### Нахождение первого совпадения

    $found = $collection->first(function($model) {
        return $model->color == 'red';
    });

#### Итерация коллекции

    $collection->each(function($model) {
        $model->is_cool = true;
    });

#### Проверка ключа

    if ($collection->contains(3)) {
        // Коллекция имеет Модель с ID = 3
    }

<a name="custom-collections" class="anchor" ></a>
## Пользовательские коллекции

Если вам нужно использовать пользовательский объект `Collection` со своими собственными методами наследования, вы можете переопределить метод `newCollection` в вашей модели:

    class User extends Model
    {
        /**
         * Create a new Collection instance.
         */
        public function newCollection(array $models = [])
        {
            return new CustomCollection($models);
        }
    }

После определения метода `newCollection` Вы получите экземпляр пользовательской коллекции при любом обращении к экземпляру `Collection` этой модели. Если вы хотите использовать собственную коллекцию для каждой модели в вашем приложении, вы должны переопределить метод `newCollection` в базовом классе модели, наследуемой всеми вашими моделями.

    use October\Rain\Database\Collection as CollectionBase;

    class CustomCollection extends CollectionBase
    {
    }

<a name="data-feed" class="anchor" ></a>
## Data feed

Data feed позволяют Вам объединять модели классов в одну коллекцию. Это полезно для создания списка данных, в котором используется навигация. Объекты подготавливаются до вызова метода `get`, после чего они объединяются в коллекцию, которая имеет вид обычного набора данных

Класс `DataFeed` имитирует модель Active Record и поддерживает методы `limit` и `paginate`.

<a name="creating-feed" class="anchor" ></a>
### Использование

В следующем примере модели User, Post и Comment будут объединены в одну коллекцию, которая будет содержать 10 записей.

    $feed = new October\Rain\Database\DataFeed;
    $feed->add('user', new User);
    $feed->add('post', Post::where('category_id', 7));

    $feed->add('comment', function() {
        $comment = new Comment;
        return $comment->where('approved', true);
    });

    $results = $feed->limit(10)->get();

<a name="data-feed-processing" class="anchor" ></a>
### Обработка результатов

Метод `get` вернет объект `Collection`, который содержит результаты запроса. Записи могут быть дифференцированны при помощи атрибута `tag_name`, который был установлен в качестве первого параметра при создании модели.

    foreach ($results as $result) {

        if ($result->tag_name == 'post')
            echo "New Blog Post: " . $record->title;

        elseif ($result->tag_name == 'comment')
            echo "New Comment: " . $record->content;

        elseif ($result->tag_name == 'user')
            echo "New User: " . $record->name;

    }

<a name="data-feed-ordering" class="anchor" ></a>
### Сортировка результатов

Результаты могут быть отсортированы по одной колонке таблицы для всех результатов или индивидуально при помощи метода `add`. Отдельно указывается направление сортировки.

    // Ordered by updated_at if it exists, otherwise created_at
    $feed->add('user', new User, 'ifnull(updated_at, created_at)');

    // Ordered by id
    $feed->add('comments', new Comment, 'id');

    // Ordered by name (specified default below)
    $feed->add('posts', new Post);

    // Specifies the default column and the direction
    $feed->orderBy('name', 'asc')->get();
