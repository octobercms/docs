# Database Queries

- [Introduction](#introduction)
- [Direct SQL](#direct-sql)
- [Active Record](#active-record)



<a name="introduction"></a>
## Introduction

In October you have two different approaches to working with databases:

* Using direct SQL queries using the **Db** class
* Using Active Record by extending the **Model** class

Direct SQL will perform faster and should be used for simple tasks. Active Record is an approach 
used by the popular framework, Ruby On Rails. It allows an easy interface for performing repetitive 
tasks like creating, reading, updating and deleting database records. You can learn more about the 
[Active record pattern on Wikipedia](http://en.wikipedia.org/wiki/Active_record_pattern).



<a name="direct-sql"></a>
## Direct SQL

#### Retrieving data
```
$results = Db::select('select * from users where id = ?', [1]);
```
The select method will always return an array of results.

#### Flatten results as an array
```
Db::select('select * from users')->lists('name', 'id');
```
Returns an array where the key is the **id** and value is the **name**, eg: ```Array ( [1] => Name ) ```.

#### Inserting data
```
Db::insert('insert into users (id, name) values (?, ?)', [1, 'Dayle']);
```

#### Updating data
```
Db::update('update users set votes = 100 where name = ?', ['John']);
```

#### Removing data
```
Db::delete('delete from users');
```

#### Raw query
```
Db::statement('drop table users');
```

#### Further reading on Direct SQL

* [Database Basics - Laravel documentation](http://laravel.com/docs/database)
* [Query builder - Laravel documentation](http://laravel.com/docs/queries)



<a name="active-record"></a>
## Active Record

#### Creating a new record

```php
$post = new Acme\Blog\Models\Post;
$post->title = 'Hello World!';
$post->content = 'I am writing to you from my website...';
$post->save();
```

#### Finding and updating a record

```php
$post = Acme\Blog\Models\Post::find(1);
$post->title = 'Hi there, World!';
$post->save();
```

#### Deleting a record

```php
$post = Acme\Blog\Models\Post::find(1);
$post->delete();
```

#### Further reading on Active Record

* [Models](http://octobercms.com/docs/database/models)
* [Eloquent ORM - Laravel documentation](http://laravel.com/docs/eloquent)
* [Active record pattern - Wikipedia](http://en.wikipedia.org/wiki/Active_record_pattern)

