---
subtitle: The model returned when looking up a global blueprint.
---
# Global Record

The `Tailor\Models\GlobalRecord` model is used to store content for a global.

## Available Attributes

In addition to the defined form fields, the following attributes can be found on the retrieved model.

Attribute | Description
-------- | -------------
**id** | The Primary Key found in the database.
**blueprint_uuid** | The UUID of the associated blueprint.

## PHP Interface

To look up a global using PHP, you may use the `findForGlobal` static method and pass the handle.

```php
// Return a global using the handle
Tailor\Models\GlobalRecord::findForGlobal('Blog\Settings');
```

Alternatively, you can look it up using the UUID and the `findForGlobalUuid` method.

```php
// Return a global using the UUID
Tailor\Models\GlobalRecord::findForGlobal('7b193500-ac0b-481f-a79c-2a362646364d');
```
