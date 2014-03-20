# Database Basics

- [Direct SQL](#direct-sql)
- [Active Record](#active-record)

In October you have two different approaches to working with databases:

* Using direct SQL queries using the **Db** class
* Using Active Record by extending the **October\Rain\Database\Model** class

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

#### Further reading on Direct SQL

* [Database Basics - Laravel documentation](http://laravel.com/docs/database)
* [Query builder - Laravel documentation](http://laravel.com/docs/queries)



<a name="active-record"></a>
## Active Record

Model classes used for accessing the database should extend the **October\Rain\Database\Model** class, 
this enables the usage of the active record pattern. You should create one model class for each database 
table. For example if you were building a blog plugin, you might use models for the blog posts and 
the user comments.

#### Basic class structure

```php
<?php namespace Acme\Blog\Models;

class Post extends \October\Rain\Database\Model
{
    public $table = 'acme_blog_posts';
}
```

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

* [Eloquent ORM - Laravel documentation](http://laravel.com/docs/eloquent)
* [Active record pattern - Wikipedia](http://en.wikipedia.org/wiki/Active_record_pattern)

