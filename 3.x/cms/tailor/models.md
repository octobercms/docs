---
subtitle: The available models in Tailor.
---
# Models

## Entry Record

The `Tailor\Models\EntryRecord` model is used to store content for an entry.

### Available Attributes

In addition to the defined form fields, the following attributes can be found on the retrieved model.

Attribute | Description
-------- | -------------
**id** | The Primary Key found in the database.
**blueprint_uuid** | The UUID of the associated blueprint.
**content_group** | The content group name, if used.
**title** | A title descriptor for the entry, for example, **My Blog Post**.
**slug** | A slug identifier for the entry, for example, `my-blog-post`.
**is_enabled** | Determines if the entry is currently visible.
**created_at** | The creation date for the entry.
**updated_at** | The last updated date for the entry.
**expired_at** | The expiry date for the entry.
**published_at** | The published date for the entry.
**published_at_date** | The published date, or if none is specified, the creation date.

#### Structure Entries

If an entry type is a `structure`, it will have some extra attributes.

Attribute | Description
-------- | -------------
**fullslug** | A slug identifier that includes parent slugs, for example, `parent-slug/child-slug`.
**parent** | The parent record for this entry, if available.
**children** | The child records for this entry, if available.

#### Stream Entries

If an entry type is a `stream`, it will have some extra attributes.

Attribute | Description
-------- | -------------
**published_at_day** | The numerical day the entry was published.
**published_at_month** | The numerical month the entry was published.
**published_at_year** | The numerical year the entry was published.

### PHP Interface

To look up an entry using PHP, you may use the `inSection` static method and pass the handle to return a prepared database query.

```php
// Return all entries by the handle
Tailor\Models\EntryRecord::inSection('Blog\Posts')->get();
```

Alternatively, you can look it up using the UUID and the `inSectionUuid` method.

```php
// Return all entries by the UUID
Tailor\Models\EntryRecord::inSectionUuid('a63fabaf-7c0b-4c74-b36f-7abf1a3ad1c1')->get();
```

If an entry type is a `single`, you can use the `findSingleForSection` method to look up the entry.

```php
// Return a single entry by the handle
Tailor\Models\EntryRecord::findSingleForSection('Homepage');
```

Likewise, the `findSingleForSectionUuid` can be used for looking up by the UUID.

```php
// Return a single entry by the UUID
Tailor\Models\EntryRecord::findSingleForSectionUuid('3328c303-7989-462e-b866-27e7037ba275');
```

## Global Record

The `Tailor\Models\GlobalRecord` model is used to store content for a global.

### Available Attributes

In addition to the defined form fields, the following attributes can be found on the retrieved model.

Attribute | Description
-------- | -------------
**id** | The Primary Key found in the database.
**blueprint_uuid** | The UUID of the associated blueprint.

### PHP Interface

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
