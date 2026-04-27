---
subtitle: 了解如何配置数据库层。
---
# 数据库配置

应用程序的数据库配置位于 `config/database.php` 文件中。在此文件中，您可以定义所有数据库连接，并指定默认使用的连接。该文件中提供了所有受支持数据库系统的示例。

## SQLite 配置

SQLite 数据库使用文件系统上的单个文件。要创建新的 SQLite 数据库，请使用 `touch` 命令。

```bash
touch storage/database.sqlite
```

之后，您可以通过将绝对路径填入 `DB_DATABASE` 变量来配置环境变量以使用该数据库。

```text
DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/database.sqlite
```

## 读/写连接

有时您可能希望使用一个数据库连接处理 SELECT 语句，而使用另一个连接处理 INSERT、UPDATE 和 DELETE 语句。无论您使用的是原始查询、查询构建器还是模型，都可以轻松指定所使用的连接。

要了解如何配置读/写连接，请看以下示例：

```php
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
```

请注意，配置数组中添加了两个键：`read` 和 `write`。这两个键的数组值都包含一个键：`host`。`read` 和 `write` 连接的其余数据库选项将从主 `mysql` 数组中合并。

我们只需要在 `read` 和 `write` 数组中放置希望覆盖主数组值的项目。因此，在本例中，`192.168.1.1` 将用作"读"连接，而 `192.168.1.2` 将用作"写"连接。主 `mysql` 数组中的数据库凭据、前缀、字符集以及所有其他选项将在两个连接之间共享。

<a id="oc-index-lengths-using-mysql-mariadb"></a>
## 使用 MySQL / MariaDB 时的索引长度

默认情况下，October CMS 使用 `utf8mb4` 字符集。如果运行的 MySQL 版本低于 v5.7.7 或 MariaDB 版本低于 v10.2.2，您需要手动配置迁移生成的默认字符串长度，以便 MySQL 能够为其创建索引。要配置默认字符串长度，请将以下内容添加到 **config/database.php** 配置文件中的 `connections.mysql` 键下。

```php
'mysql' => [
    // ...
    'varcharmax' => 191,
],
```
