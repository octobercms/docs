---
previousPath: extend/database/traits.md#sortable-relation
subtitle: Adds sorting support to pivot relationships.
---
# Sortable Relation

Sortable relations add sorting support to pivot relationships, such as `belongsToMany`. To add sorting to a pivot relationship, apply the `October\Rain\Database\Traits\SortableRelation` trait and define the `pivotSortable` option in your relation definition.

```php
class Post extends Model
{
    use \October\Rain\Database\Traits\SortableRelation;

    public $belongsToMany = [
        'tags' => [
            \Acme\Blog\Models\Tag::class,
            'table' => 'acme_blog_post_tag',
            'pivotSortable' => 'sort_order'
        ]
    ];
}
```

To add a `sort_order` column to your pivot table, you may use the `integer` method inside a migration.

```php
Schema::table('acme_blog_post_tag', function ($table) {
    $table->integer('sort_order')->default(0);
});
```

Use the `setSortableRelationOrder` method to set the order of related records. The first argument is the relation name, the second is an array of record IDs in the desired order.

```php
$post->setSortableRelationOrder('tags', [3, 1, 2]);
```

If you want to use an incrementing pool starting from 1, pass `true` as the third argument.

```php
$post->setSortableRelationOrder('tags', [3, 1, 2], true);
```

Alternatively, you can provide a specific array of sort order values.

```php
$post->setSortableRelationOrder('tags', [3, 1, 2], [100, 200, 300]);
```
