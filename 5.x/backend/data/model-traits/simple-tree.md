---
previousPath: extend/database/traits.md#simple-tree
subtitle: Maintains a parent and child hierarchy using a `parent_id` column.
---
# Simple Tree

A simple tree model will use the `parent_id` column maintain a parent and child relationship between models. To add the `parent_id` column to your table, you may use the `integer` method inside a migration.

```php
Schema::table('categories', function ($table) {
    $table->integer('parent_id')->nullable()->unsigned();
});
```

To use the simple tree, apply the `October\Rain\Database\Traits\SimpleTree` trait.

```php
class Category extends Model
{
    use \October\Rain\Database\Traits\SimpleTree;
}
```

This trait will automatically inject two [model relations](../relationships.md) called `parent` and `children`, it is the equivalent of the following definitions.

```php
public $belongsTo = [
    'parent' => [Category ::class, 'key' => 'parent_id'],
];

public $hasMany = [
    'children' => [Category ::class, 'key' => 'parent_id'],
];
```

You do not need to define these relations yourself, however, you may modify the key name used to identify the parent by defining the `PARENT_ID` constant:

```php
const PARENT_ID = 'my_parent_column';
```

Collections of models that use this trait will return the type of `October\Rain\Database\TreeCollection` which adds the `toNested` method. To build an eager loaded tree structure, return the records with the relations eager loaded.

```php
Category::all()->toNested();
```

## Rendering

In order to render all levels of items and their children, you can use recursive processing

```twig
{% macro renderChildren(item) %}
    {% if item.children is not empty %}
        <ul>
            {% for child in item.children %}
                <li>{{ child.name }}{{ _self_.renderChildren(child)|raw }}</li>
            {% endfor %}
        </ul>
    {% endif %}
{% endmacro %}

{% import _self as nav %}
{{ nav.renderChildren(category)|raw }}
```
