---
subtitle: The model returned when looking up an entry blueprint.
---
# Entry Record

## Available Attributes

In addition to the defined form fields, the following attributes can be found on the model.

Attribute | Description
-------- | -------------
**id** | The Primary Key found in the database.
**blueprint_uuid** | The UUID of the associated blueprint.
**content_group** | The content group name, if used.
**title** | A title descriptor for the entry, for example, **My Blog Post**.
**slug** | A slug identifier for the entry, for example, `my-blog-post`.
**is_enabled** | Determines if the entry is currently visible.
**published_at** | The published date for the entry.
**created_at** | The creation date for the entry.
**updated_at** | The last updated date for the entry.
**published_at_date** | The published date, or the creation date, if none is specified.
**expired_at** | The expiry date for the entry.
**draft_mode** | A special flag for determining the draft status.


### Structure Entries

If an entry type is a `structure`, it will have some extra attributes.

Attribute | Description
-------- | -------------
**fullslug** | A slug identifier that includes parent slugs, for example, `parent-slug/child-slug`.
**parent_id** | The Primary Key of the parent record.

### Stream Entries

If an entry type is a `stream`, it will have some extra attributes.

Attribute | Description
-------- | -------------
**published_at_day** | The numerical day the entry was published.
**published_at_month** | The numerical month the entry was published.
**published_at_year** | The numerical year the entry was published.
