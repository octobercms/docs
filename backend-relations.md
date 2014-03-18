`Relation behavior` is a controller modifier used for easily managing complex Model relationships on a page. Not to be confused with List relation columns or Form relation fields which only provide simple management. Relation behavior depends on relation definitions.

#### Basic structure

```
# ===================================
#  Relation Behavior Config
# ===================================

comments:
    label: Comment
    list: @/plugins/rainlab/blog/models/comment/columns.yaml
    form: @/plugins/rainlab/blog/models/comment/fields.yaml
```

##### Required configuration

* **label** - a label for the relation.

##### Optional configuration

* **list** - a reference to list column definition file, see Model Configuration of Backend Lists.
* **form** - a reference to form field definition file, see Model Configuration of Backend Forms.
* **pivot** - a reference to form field definition file, used for relations with pivot table data.

#### Displaying a relation manager

Relations can be managed on any page by first initializing the parent model.

```php
$this->initRelation($model);
```
> **Note:** The Form behavior will automatically initialize the model on it's create, update and preview actions.

The relation manager can then be displayed for a specified relation definition.

```php
<?= $this->relationRender('comments') ?>
```

#### Relationship types

How the relation manager is presented depends on the relationship definition in the parent model, and the relation definition.

##### Has Many

* Related records are displayed as a **list**.
* Clicking a record will display an update **form**.
* Clicking toolbar Create button will display a create **form**.
* Clicking toolbar Delete button will destroy the record(s).

##### Belongs to Many

* Related records are displayed as a **list**.
* Clicking toolbar Add button will display a selection **list**.
* Clicking toolbar Delete button will destroy the pivot table record(s).

##### Belongs to Many (with Pivot Data)

* Related records are displayed as a **list**.
* Clicking a record will display a **pivot** data update form.
* Clicking toolbar Add button will display a selection **list**, then a **pivot** data entry form.
* Clicking toolbar Delete button will destroy the pivot table record(s).

##### Belongs to

* Related record is displayed as a **form** preview.
* Clicking toolbar Link to button will display a selection **list**.
* Clicking toolbar Unlink button will orphan the relationship.

##### Has one

* Related record is displayed as a **form** preview.
* Clicking toolbar Create button will display a create **form**.
* Clicking toolbar Update button will display an update **form**.
* Clicking toolbar Delete button will destroy the record.

