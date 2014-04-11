# Database Queries

- [Direct SQL](#direct-sql)
- [Active Record](#active-record)


In October you have two different approaches to working with databases:

* Using direct SQL queries using the `Db` class
* Using Active Record by extending the `Model` class

Direct SQL will perform faster and should be used for simple tasks. Active Record is an approach used by the popular framework, Ruby On Rails. It allows an easy interface for performing repetitive tasks like creating, reading, updating and deleting database records. You can learn more about the [Active record pattern on Wikipedia](http://en.wikipedia.org/wiki/Active_record_pattern).

<a name="direct-sql" class="anchor" href="#direct-sql"></a>
## Direct SQL

The `Db` class has several methods for loading, inserting, updating and deleting data. You can find more information about the DB class here:

* [Database Basics - Laravel documentation](http://laravel.com/docs/database)
* [Query builder - Laravel documentation](http://laravel.com/docs/queries)

The `select()` method returns an array of records.

    $results = Db::select('select * from users where id = ?', [1]);

You can use the `select()` method together with the `lists() method in order to flatten the result. In the next example the lists() method returns an array where the key is the **id** and value is the **name**, eg: ```Array ( [1] => Name ) ```.

    Db::select('select * from users')->lists('name', 'id');

Use the `insert()` method to insert a record to a database table:

    Db::insert('insert into users (id, name) values (?, ?)', [1, 'Dayle']);

The `update()` method allows to update a database record:

    Db::update('update users set votes = 100 where name = ?', ['John']);

Use the `delete` method to delete database records:

    Db::delete('delete from users');

The `statement()` method allows to execute other types of SQL queries, for example:

    Db::statement('drop table users');

<a name="active-record" class="anchor" href="#active-record"></a>
## Active Record

The Active Record pattern is implemented in the `Model` class in October. See the [Models](model) article for details. Below are some basic examples of using Active Record.

The next example demonstrates how to create a new record.

    $post = new Acme\Blog\Models\Post;
    $post->title = 'Hello World!';
    $post->content = 'I am writing to you from my website...';
    $post->save();

Use the `find()` method for finding a record with a specific identifier.

    $post = Acme\Blog\Models\Post::find(1);
    $post->title = 'Hi there, World!';
    $post->save();

The `delete()` method deletes a record from the database.

    $post = Acme\Blog\Models\Post::find(1);
    $post->delete();