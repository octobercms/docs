# Коллекции

<a name="introduction" class="anchor"></a>
## Введение

Класс `October\Rain\Support\Collection` - гибкая и удобная обёртка для работы с массивами.

Для примера, взгляните на код ниже. Мы создадим новую коллекцию из массива и применим функцию `strtoupper` к каждому элементу. После чего удалим все пустые элементы:

    $collection = new October\Rain\Support\Collection(['stewie', 'brian', null]);

    $collection = $collection
        ->map(function ($name) {
            return strtoupper($name);
        })
        ->reject(function ($name) {
            return empty($name);
        })
    ;

Как вы можете видеть, класс `Collection` позволяет строить цепочки вызовов для операций типа map и reduce над заданным массивом данных. В основном каждый метод класса `Collection` возвращает новый объект класса `Collection`.

<a name="creating-collections" class="anchor"></a>
## Создание коллекций

Просто передайте массив в конструктор класса  `October\Rain\Support\Collection`. Пример:

    $collection = new October\Rain\Support\Collection([1, 2, 3]);

Там, где методы [модели бд](../database/model) возвращают не один, а несколько объектов - возвращается коллекция. Однако, коллекции предоставляют слишком мощный функционал. Попробуйте применить класс `Collection` у себя в приложении.

<a name="available-methods" class="anchor"></a>
## Доступные методы

Вместо того, чтобы приводить здесь огромный скучный список методов коллекции, мы отсылаем вас к более удобной [документации API этого класса](https://octobercms.com/docs/api/october/rain/support/collection).
