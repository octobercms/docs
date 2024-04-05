# Site Manager

### Introduction

The global `Site` facade is included with October CMS to provide tools for working with [multisite implementations](../../cms/resources/multisite.md). All optional multisite features are enabled or disabled using the configuration file **config/multisite.php**.

```php
'features' => [
    'cms_maintenance_setting' => false,
    // ...
]
```

The `hasFeature` is used to check if a specific multisite feature is enabled.

```php
$useMultisite = Site::hasFeature('cms_maintenance_setting');
```

## Checking Site Configuration State

Use the `hasAnySite` to check if any enabled site is available.

```php
if (Site::hasAnySite()) {
    // ...
}
```

The `hasMultiSite` will return true if multiple site definitions are available.

```php
if (Site::hasMultiSite()) {
    // ...
}
```

The `hasSiteGroups` will return true if multiple site definitions are using grouped definitions.

```php
if (Site::hasSiteGroups()) {
    // ...
}
```

## Retrieving a Site

Requesting a site will return a `System\Models\SiteDefinition` instance, with available attributes loaded from the cache driver or database.

The `getPrimarySite` method returns the primary site definition, used as a fallback for every occasion.

```php
$site = Site::getPrimarySite();
```

The frontend theme has a selected site that is used when rendering CMS pages, the `getActiveSite` site will return this site.

```php
$site = Site::getActiveSite();
```

Likewise, the admin panel can select a site and this can be retrieved using the `getEditSite` method.

```php
$site = Site::getEditSite();
```

To look up a site by its unique ID, use the `getSiteFromId` with the identifier.

```php
$siteFour = Site::getSiteFromId(4);
```

To look up a site using its locale code, use the `getSiteForLocale` passing it the desired locale.

```php
$frenchSite = Site::getSiteForLocale('fr');
```

## Accessing Multiple Sites

If multiple sites are returned, it will be as a populated instance of the `October\Rain\Database\Collection` object.

List all the sites, including disabled sites, with the `listSites` method.

```php
$sites = Site::listSites();
```
List only enabled sites with the `listEnabled` method.

```php
$sites = Site::listEnabled();
```

List sites enabled in the admin panel using `listEditEnabled`.

```php
$sites = Site::listEditEnabled();
```

## Site Context

A site context is used to determine the active site, and this will restrict lookups to that site automatically. In some cases a global state is used to allow access to data across all states.

Use the `withContext` to change the context to a different site, passing it the ID of the desired site.

```php
Site::withContext(2, function() {
    // Models in site 2 are now available.
});
```

Activating the global context is performed using the `withGlobalContext` and passing it a closure.

```php
Site::withGlobalContext(function() {
    // All models are available in here.
});
```

Use the `hasGlobalContext` method to check if the global state is currently activated.

```php
$global = Site::hasGlobalContext();
```

#### See Also

::: also
* [Multisite](../../cms/resources/multisite.md)
* [Multisite Trait](../database/traits.md)
:::
