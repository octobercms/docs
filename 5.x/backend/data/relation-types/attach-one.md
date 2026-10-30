---
subtitle: Attach a single file to a model.
---
# Attach One

`$attachOne` attaches a single file to a model, stored using the `System\Models\File` model. For example, a user might have one avatar image.

```php
class User extends Model
{
    public $attachOne = [
        'avatar' => \System\Models\File::class
    ];
}
```

::: warning
Make sure the model's database table does not have a column with the same name as the attachment relation.
:::

## Accessing the Attachment

Set the relation to an uploaded file, then read the file URL using the `getUrl` method.

```php
$user->avatar = files('avatar');
$user->save();

echo $user->avatar->getUrl();
```

## Protected Files

Set the `public` parameter to `false` to store the file in the **uploads/protected** directory, which is not accessible from the web.

```php
public $attachOne = [
    'avatar' => [\System\Models\File::class, 'public' => false]
];
```

## Parameters

The following parameters are supported by `attachOne` relations.

Parameter | Description
------------- | -------------
**public** | set to `false` to store the file in the protected uploads directory, which is not accessible from the web. Default: `true`.
**key** | the column on this model that the attachment refers to. Default: `id`.

The [common parameters](../relation-types.md#common-parameters) are also supported.

#### See Also

::: also
* [Attach Many](./attach-many.md)
* [File Attachments](../attachments.md)
:::
