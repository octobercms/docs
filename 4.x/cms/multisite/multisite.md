---
subtitle: Learn how to translate content using multiple sites
---
# Multisite

The multisite feature lets you manage multiple websites from a single October CMS installation and assign content dependent on the domain name. For example, an e-commerce store with different country-specific sub-sites. You can also use it to manage translations for a localized website.

## Managing Sites

You can create sites by visiting the admin panel's **Settings → Manage Sites** page. Every installation includes a primary site that acts as the default site for every request.

The following configuration defines each site:

- **Enabled** - determines if you can access the site on the front end and admin panel.
- **Name** - specifies the site name.
- **Unique Code** - specifies a unique site code for lookup using APIs.
- **Theme** - the CMS theme to use when this site is active.
- **Locale** - the application locale used for this site.
- **Timezone** - the timezone to use for this site.
- **Custom application URL** - the URL to use when this site is active, for things like mail templates or when the link policy forces the URL.
- **Use a CMS route prefix** - defines a prefix to include before every page route. It can identify this site when using a shared hostname.
- **Define matching hostnames** - matches the site using specific hostnames. You should enable this for production sites for security reasons. Wildcard values are supported, e.g.: `*.mydomain.tld`.
- **Display a color for this site** - when enabled, displays a banner at the top of the admin panel. Useful to identify the active site or distinguish different environments, for example, red for development, green for staging and no color for production.

When you create more than one site, each can be selected in the admin panel using the site selection dropdown menu.

## Site Routing

When a request arrives, October CMS determines which site should handle it by matching the request against each site definition. Understanding this process is important when running multiple sites on different domains.

### How Requests Are Matched

The system uses a two-stage matching process to resolve the active site for each request.

1. **Hostname matching**: if a site has **Define matching hostnames** enabled, it will only match requests for those specific hostnames. If a site does not have this option enabled, it will match requests from **any hostname**.

2. **Route prefix matching**: if a site has **Use a CMS route prefix** enabled, the request URI must match the prefix. For example, a site with the prefix `/en` will match `/en` and `/en/about` but not `/fr/about`.

When multiple sites match, the site with the most specific route prefix takes priority. If no site matches the request, the primary site is used as the fallback.

### Default Site Fallback

The primary site acts as a catch-all when no other site matches. However, if the primary site does not have its hostnames restricted, it will match **every request**, including requests intended for other domains.

For example, consider the following configuration.

Site | Hostname Restriction | Theme
---- | -------------------- | -----
Primary Site | _None_ | default-theme
Secondary Site | `www.domain2.tld` | other-theme

In this case, a request to `www.domain2.tld` will match **both** sites — the Secondary Site matches by hostname, and the Primary Site matches because it has no hostname restriction. This can result in the wrong theme being displayed.

### Best Practices

To avoid unexpected routing, you should restrict the hostnames of every site, including the primary site. The following configuration ensures each site only responds to its intended domain.

Site | Hostname Restriction | Theme
---- | -------------------- | -----
Primary Site | `cms.domain.tld` | default-theme
Secondary Site | `www.domain2.tld` | other-theme

Alternatively, if the primary site is only used for managing content in the admin panel, you can disable it on the frontend by unchecking **Enabled** while keeping it accessible in the backend.

::: tip
Always enable **Define matching hostnames** for production sites. This prevents one site from unintentionally serving content for another domain.
:::

## Site Picker Component

The `sitePicker` component lets you manage links to other sites. The best place to include this is in your page or layout template.

::: cmstemplate
```ini
[sitePicker]
```
```twig
{% set availableSites = sitePicker.sites %}
```
:::

View the [Site Picker component](../components/sitepicker.md) article to learn how to display site URLs and generating alternative page links.

## Browser Language Detection

October CMS is configured to automatically detect a matching site based on the browser's preferred language when the following conditions are met.

- All sites in the group have a prefix set
- There are no other sites matching the base URL

For example, if the primary site is **English** with a route prefix of `/en` and another site **French** has a prefix of `/fr` then the following behavior can be observed.

Base URL | Behavior
-------- | --------
https://yoursite.tld/en | Displays the **English** site
https://yoursite.tld/fr | Displays the **French** site
https://yoursite.tld | Redirect based on language preference

When the user visits the base URL, their preferred language is automatically detected and will be redirected to a matching site. The matching site is based on its locale value and if no match is found then the primary site is used.

::: tip
You can modify this behavior using the `redirect_policy` value found in the **config/cms.php** file.
:::

## Site Groups

In its initial state, multisite is helpful in creating multiple websites in a single language, or a single website using multiple languages. Grouping sites allow you to extend this concept further to create multiple sites with multiple languages. Create site groups by navigating to **Settings → Manage Sites → Manage Site Groups**, and once a group is created, a group selection field should appear for each site.

In practical terms, each site group represents a website and site definitions belonging to the group represent the site in an alternative language. The following example shows a grouped site configuration for a website about cats and dogs with two languages for each.

Site Group | Site Name
---------- | -----------
Dogs       | English
Dogs       | French
Cats       | English
Cats       | French

Grouped sites will only replicate fields within their specific group. For example, if a [Tailor blueprint](../tailor/introduction.md) uses the `multisite: sync` option, the records will only synchronize across sites in the same group.

## Role Restrictions

Site definitions can restrict their visibility based on the administrator role, which allows you to use dedicated administrator roles to manage a specific sites. To enable the multisite role restrictions feature:

1. Navigate to **Manage Sites** and select a site definition
2. Place check in the **Define administrator roles** checkbox.
3. Select the roles allowed to view the site.
4. Click **Save**.

When enabled, the site will only be visible in the backend panel to administrators that are specified in the field. For example, to create a site that is only accessible to Developers, select the **Developer** role in the field.

## Multisite Features

There are some core features that are not multisite-enabled by default, such as the mail configuration. You may selectively enable multisite features using the **config/multisite.php** file found under the `features` section. The following feature keys are available to use with multiple site definitions.

Feature | Description
------- | --------------------------
`cms_maintenance_setting` | Maintenance Mode Settings are unique for each site
`backend_mail_setting` | Mail Settings are unique for each site
`system_asset_combiner` | Asset combiner cache keys are unique to the site

### Disabling Multisite

You may disable the multisite features entirely by setting the `enabled` configuration to a `false` value.

```php
'enabled' => false
```

## PHP Interface

The [site service](../../extend/services/site.md) includes the global `Site` facade that provides tools for working with multisite. For example, the following code locates a model in the context of the site with ID **2**.

```php
$model = Site::withContext(2, function() {
    return Model::find(1);
});
```

Read the [Site Service article](../../extend/services/site.md) to learn more.

#### See Also

::: also
* [Multisite Features](https://octobercms.com/features/multisite)
* [Theme Localization](./localization.md)
* [Tailor Localization](./tailor.md)
* [Site Picker Component](../components/sitepicker.md)
* [Multisite Trait](../../extend/multisite/multisite.md)
* [Site Service](../../extend/services/site.md)
:::
