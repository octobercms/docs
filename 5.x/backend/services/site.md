---
previousPath: extend/services/site.md
subtitle: Find, list and switch between site definitions in PHP using the Site facade.
---
# Site Manager

The `Site` facade gives you access to the site definitions of a [multisite](../../themes/sites/multisite.md) installation. Use it to find the active site, list the available sites, and run code in the context of another site.

```php
$site = Site::getActiveSite();
```

## Finding a Site

Requesting a site returns a `System\Models\SiteDefinition` instance, with its attributes loaded from the cache driver or the database.

The `getPrimarySite` method returns the primary site definition, which is used as the fallback in every case.

```php
$site = Site::getPrimarySite();
```

The frontend theme has a selected site that is used when rendering CMS pages. The `getActiveSite` method returns this site.

```php
$site = Site::getActiveSite();
```

The admin panel can also select a site. Use the `getEditSite` method to get it.

```php
$site = Site::getEditSite();
```

To look up a site by its unique ID, pass the identifier to the `getSiteFromId` method.

```php
$siteFour = Site::getSiteFromId(4);
```

To look up a site by its locale code, pass the locale to the `getSiteForLocale` method.

```php
$frenchSite = Site::getSiteForLocale('fr');
```

## Listing Sites

Methods that return several sites return an `October\Rain\Database\Collection` object.

Use the `listSites` method to list all sites, including disabled sites.

```php
$sites = Site::listSites();
```

Use the `listEnabled` method to list only the enabled sites.

```php
$sites = Site::listEnabled();
```

Use the `listEditEnabled` method to list the sites enabled in the admin panel.

```php
$sites = Site::listEditEnabled();
```

## Checking the Site Configuration

Use the `hasAnySite` method to check if any enabled site is available.

```php
if (Site::hasAnySite()) {
    // ...
}
```

The `hasMultiSite` method returns `true` if more than one site definition is available.

```php
if (Site::hasMultiSite()) {
    // ...
}
```

The `hasSiteGroups` method returns `true` if the site definitions use [site groups](../../themes/sites/multisite.md#site-groups).

```php
if (Site::hasSiteGroups()) {
    // ...
}
```

## Running Code for Another Site

The site context decides the active site, and lookups for multisite models are restricted to that site automatically. A global context gives access to data across all sites.

Use the `withContext` method to run code in the context of a different site, passing the ID of that site. The method returns the value returned by the closure.

```php
Site::withContext(2, function() {
    // Models in site 2 are now available.
});
```

Use the `withGlobalContext` method to run a closure in the global context.

```php
Site::withGlobalContext(function() {
    // All models are available in here.
});
```

Use the `hasGlobalContext` method to check if the global context is active.

```php
$global = Site::hasGlobalContext();
```

## Checking Multisite Features

Optional multisite features are turned on or off in the **config/multisite.php** configuration file.

```php
'features' => [
    'cms_maintenance_setting' => false,
    // ...
]
```

Use the `hasFeature` method to check if a multisite feature is enabled.

```php
$useMultisite = Site::hasFeature('cms_maintenance_setting');
```

The available feature keys are listed under [Multisite Features](../../themes/sites/multisite.md#multisite-features).

#### See Also

::: also
* [Setting Up Multisite](../../themes/sites/multisite.md)
* [Multisite Models](../localization/multisite.md)
* [Site Groups](../localization/site-groups.md)
:::
