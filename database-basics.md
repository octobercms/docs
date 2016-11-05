# Database: Getting Started

- [Introduction](#introduction)
- [Configuration](#configuration)
    - [Read / write connections](#read-write-connections)
- [Running raw SQL queries](#running-queries)
- [Multiple database connections](#accessing-connections)
- [Database transactions](#database-transactions)
- [Database events](#database-events)
    - [Query logging](#query-logging)


<a name="introduction"></a>
## Introduction

Connecting to databases and running queries is a simple process, supported by using either raw SQL, the [query builder](../database/query) or [active record models](../database/model). Managing database tables and populating seed data is handled by the [migration and seeder process](../database/structure).

Raw SQL and using the query builder will perform faster and should be used for simple tasks. Active Record is an approach used by the popular framework, Ruby On Rails. It allows an easy interface for performing repetitive tasks like creating, reading, updating and deleting database records. You can learn more about the [active record pattern on Wikipedia](http://en.wikipedia.org/wiki/Active_record_pattern).

<a name="configuration"></a>
## Configuration

The database configuration for your application is located in the `config/database.php` file. In this file you may define all of your database connections, as well as specify which connection should be used by default. Examples for all of the supported database systems are provided in this file.

<a name="read-write-connections"></a>
### Read / write connections

Sometimes you may wish to use one database connection for SELECT statements, and another for INSERT, UPDATE, and DELETE statements. It is easy to specify which connection is used whether you are using raw queries, the query builder or a model.

To see how read / write connections should be configured, let's look at this example:

    'mysql' => [
        'read' => [
            'host' => '192.168.1.1',
        ],
        'write' => [
            'host' => '196.168.1.2'
        ],
        'driver'    => 'mysql',
        'database'  => 'database',
        'username'  => 'root',
        'password'  => '',
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix'    => '',
    ],

Note that two keys have been added to the configuration array: `read` and `write`. Both of these keys have array values containing a single key: `host`. The rest of the database options for the `read` and `write` connections will be merged from the main `mysql` array.

We only need to place items in the `read` and `write` arrays if we wish to override the values in the main array. So, in this case, `192.168.1.1` will be used as the "read" connection, while `192.168.1.2` will be used as the "write" connection. The database credentials, prefix, character set, and all other options in the main `mysql` array will be shared across both connections.

<a name="running-queries"></a>
## Running raw SQL queries

Once you have configured your database connection, you may run queries using the `Db` facade. The `Db` facade provides methods for each type of query: `select`, `update`, `insert`, `delete`, and `statement`.

#### Running a select query

To run a basic query, we can use the `select` method on the `Db` facade:

    $users = Db::select('select * from users where active = ?', [1]);

The first argument passed to the `select` method is the raw SQL query, while the second argument is any parameter bindings that need to be bound to the query. Typically, these are the values of the `where` clause constraints. Parameter binding provides protection against SQL injection.

The `select` method will always return an `array` of results. Each result within the array will be a PHP `stdClass` object, allowing you to access the values of the results:

    foreach ($users as $user) {
        echo $user->name;
    }

#### Using named bindings

Instead of using `?` to represent your parameter bindings, you may execute a query using named bindings:

    $results = Db::select('select * from users where id = :id', ['id' => 1]);

#### Running an insert statement

To execute an `insert` statement, you may use the `insert` method on the `Db` facade. Like `select`, this method takes the raw SQL query as its first argument and bindings as the second argument:

    Db::insert('insert into users (id, name) values (?, ?)', [1, 'Joe']);

#### Running an update statement

The `update` method should be used to update existing records in the database. The number of rows affected by the statement will be returned by the method:

    $affected = Db::update('update users set votes = 100 where name = ?', ['John']);

#### Running a delete statement

The `delete` method should be used to delete records from the database. Like `update`, the number of rows deleted will be returned:

    $deleted = Db::delete('delete from users');

#### Running a general statement

Some database statements should not return any value. For these types of operations, you may use the `statement` method on the `Db` facade:

    Db::statement('drop table users');

<a name="accessing-connections"></a>
## Multiple database connections

When using multiple connections, you may access each connection via the `connection` method on the `Db` facade. The `name` passed to the `connection` method should correspond to one of the connections listed in your `config/database.php` configuration file:

    $users = Db::connection('foo')->select(...);

You may also access the raw, underlying PDO instance using the `getPdo` method on a connection instance:

    $pdo = Db::connection()->getPdo();

<a name="database-transactions"></a>
## Database transactions

To run a set of operations within a database transaction, you may use the `transaction` method on the `Db` facade. If an exception is thrown within the transaction `Closure`, the transaction will automatically be rolled back. If the `Closure` executes successfully, the transaction will automatically be committed. You don't need to worry about manually rolling back or committing while using the `transaction` method:

    Db::transaction(function () {
        Db::table('users')->update(['votes' => 1]);

        Db::table('posts')->delete();
    });

#### Manually using transactions

If you would like to begin a transaction manually and have complete control over rollbacks and commits, you may use the `beginTransaction` method on the `Db` facade:

    Db::beginTransaction();

You can rollback the transaction via the `rollBack` method:

    Db::rollBack();

Lastly, you can commit a transaction via the `commit` method:

    Db::commit();

> **Note:** Using the `Db` facade's transaction methods also controls transactions for the [query builder](../database/query) and [model queries](../database/model).

<a name="database-events"></a>
## Database events

If you would like to receive each SQL query executed by your application, you may use the `listen` method. This method is useful for logging queries or debugging.

    Db::listen(function($sql, $bindings, $time) {
        //
    });

Just like [event registration](../services/events#event-registration), you may register your query listener in the `boot()` method of a [Plugin registration file](../plugin/registration#registration-methods). Alternatively, plugins can supply a file named **init.php** in the plugin directory that you can use to place this logic.

<a name="query-logging"></a>
### Query logging

When query logging is enabled, a log is kept in memory of all queries that have been run for the current request. Call the `enableQueryLog` method to enable this feature.

    Db::connection()->enableQueryLog();

To get an array of the executed queries, you may use the `getQueryLog` method:

    $queries = Db::getQueryLog();

However, in some cases, such as when inserting a large number of rows, this can cause the application to use excess memory. To disable the log, you may use the `disableQueryLog` method:

    Db::connection()->disableQueryLog();

> **Note**: For quicker debugging it may be more useful to call the `trace_sql()` [helper function](../services/error-log#helpers) instead.
