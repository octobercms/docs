---
subtitle: Attach multiple files to a model.
---
# Attach Many

`$attachMany` attaches multiple files to a model, stored using the `System\Models\File` model. For example, a product might have many photos.

```php
class Product extends Model
{
    public $attachMany = [
        'photos' => \System\Models\File::class
    ];
}
```

::: warning
Make sure the model's database table does not have a column with the same name as the attachment relation.
:::

## Accessing the Attachments

Set the relation to an array of uploaded files, then loop over them to read each file URL.

```php
$product->photos = (array) files('photos');
$product->save();

foreach ($product->photos as $photo) {
    echo $photo->getUrl();
}
```

Use the `create` method to add a file to the existing attachments instead.

```php
$product->photos()->create(['data' => files('photo')]);
```

## Protected Files

Set the `public` parameter to `false` to store the files in the **uploads/protected** directory, which is not accessible from the web.

```php
public $attachMany = [
    'photos' => [\System\Models\File::class, 'public' => false]
];
```

## Parameters

The following parameters are supported by `attachMany` relations.

Parameter | Description
------------- | -------------
**public** | set to `false` to store the files in the protected uploads directory, which is not accessible from the web. Default: `true`.
**key** | the column on this model that the attachments refer to. Default: `id`.

The [common parameters](../relation-types.md#common-parameters) are also supported.

#### See Also

::: also
* [Attach One](./attach-one.md)
* [File Attachments](../attachments.md)
:::
