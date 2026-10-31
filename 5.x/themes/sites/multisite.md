---
previousPath: cms/multisite/multisite.md
subtitle: Run several websites or languages from one installation, with each site matched by hostname or URL prefix.
---
# Setting Up Multisite

Multisite lets you manage several websites from one October CMS installation, and serve content based on the domain name or URL prefix. Use it for country-specific stores, for a website in several languages, or both.

For example, a website in English and French can use two sites that share a hostname and differ by route prefix.

Site | Locale | Route Prefix
---- | ------ | ------------
English | `en` | `/en`
French | `fr` | `/fr`

## Creating a Site

Create sites on the **Settings → Site Definitions** page in the admin panel. Every installation includes a primary site, which is the default site for every request.

Each site definition has the following settings.

- **Name** - the site name.
- **Unique Code** - a unique site code for lookups using APIs.
- **Enabled** - whether the site is shown on the frontend.
- **Enabled in the Admin Panel** - keeps the site available in the admin panel while it is disabled on the frontend.
- **Theme** - the CMS theme to use when this site is active.
- **Locale** - the application locale used for this site.
- **Timezone** - the timezone to use for this site.
- **Custom application URL** - the URL to use when this site is active, for things like mail templates or when the link policy forces the URL.
- **Use a CMS route prefix** - a prefix added before every page route. It can identify this site when sites share a hostname.
- **Define matching hostnames** - the hostnames that match this site. Enable this for production sites for security reasons. Wildcards are supported, for example `*.mydomain.tld`.
- **Define administrator roles** - limits the site to administrators with specific roles, see [Restricting Sites by Role](#restricting-sites-by-role).
- **Display a style for this site** - shows a colored banner at the top of the admin panel. Use it to identify the active site, or to tell environments apart, for example red for development, green for staging and no color for production.

When you create more than one site, select between them with the site selection dropdown menu in the admin panel.

## How Requests Find a Site

When a request arrives, October CMS matches it against each site definition to decide which site handles it. Understanding this process is important when you run sites on different domains.

### Matching Requests

The active site for each request is resolved in two stages.

1. **Hostname matching**: a site with **Define matching hostnames** enabled only matches requests for those hostnames. A site without this option matches requests from **any hostname**.

2. **Route prefix matching**: a site with **Use a CMS route prefix** enabled only matches when the request URI starts with the prefix. For example, a site with the prefix `/en` matches `/en` and `/en/about`, but not `/fr/about`.

When several sites match, the site with the most specific route prefix wins. If no site matches the request, the primary site is used as the fallback.

### Default Site Fallback

The primary site catches every request that no other site matches. However, if the primary site has no hostname restriction, it matches **every request**, including requests meant for other domains.

For example, consider the following configuration.

Site | Hostname Restriction | Theme
---- | -------------------- | -----
Primary Site | _None_ | default-theme
Secondary Site | `www.domain2.tld` | other-theme

A request to `www.domain2.tld` matches **both** sites. The Secondary Site matches by hostname, and the Primary Site matches because it has no hostname restriction. This can result in the wrong theme being displayed.

### Restricting Every Site to Its Hostnames

To avoid unexpected routing, restrict the hostnames of every site, including the primary site. The following configuration makes each site respond only to its own domain.

Site | Hostname Restriction | Theme
---- | -------------------- | -----
Primary Site | `cms.domain.tld` | default-theme
Secondary Site | `www.domain2.tld` | other-theme

If you only use the primary site to manage content in the admin panel, you can instead disable it on the frontend by turning off **Enabled**, and keep it in the admin panel with **Enabled in the Admin Panel**.

::: tip
Always enable **Define matching hostnames** for production sites. This prevents one site from serving content meant for another domain.
:::

## Linking to Other Sites

The `sitePicker` component provides links to the other sites. The best place for it is your page or layout template.

::: cmstemplate
```ini
[sitePicker]
```
```twig
{% set availableSites = sitePicker.sites %}
```
:::

See the [Site Picker component](../../handbook/tailor-components/sitepicker.md) to learn how to display site URLs and generate alternative page links.

## Detecting the Browser Language

October CMS detects a matching site from the browser's preferred language when the following conditions are met.

- All sites in the group have a prefix set.
- No other site matches the base URL.

For example, if the primary site is **English** with the route prefix `/en`, and a **French** site has the prefix `/fr`, requests behave as follows.

Base URL | Behavior
-------- | --------
https://yoursite.tld/en | Displays the **English** site
https://yoursite.tld/fr | Displays the **French** site
https://yoursite.tld | Redirect based on language preference

A visitor who opens the base URL is redirected to the site that matches their preferred language, based on each site's locale. If no site matches, the primary site is used.

::: tip
Change this behavior with the `redirect_policy` value in the **config/cms.php** file.
:::

## Site Groups

On their own, site definitions work well for several websites in one language, or one website in several languages. Site groups extend this to several websites, each in several languages. Create groups on the **Settings → Site Definitions** page with the **Manage Site Groups** button. Once a group exists, each site has a group selection field.

Each site group represents a website, and the sites in the group represent that website in each language. The following example groups sites for a website about dogs and a website about cats, each in two languages.

Site Group | Site Name
---------- | -----------
Dogs       | English
Dogs       | French
Cats       | English
Cats       | French

Grouped sites only replicate fields within their own group. For example, if a [Tailor blueprint](../tailor/introduction.md) uses the `multisite: sync` option, its records only synchronize across sites in the same group.

## Restricting Sites by Role

A site can limit its visibility to administrators with specific roles, so dedicated roles manage specific sites. To enable a role restriction:

1. Go to **Settings → Site Definitions** and select a site definition.
2. Check the **Define administrator roles** checkbox.
3. Select the roles allowed to view the site.
4. Click **Save**.

The site is then only visible in the admin panel to administrators with the selected roles. For example, to create a site that only Developers can access, select the **Developer** role.

## Multisite Features

Some core features are not multisite-enabled by default, such as the mail configuration. Enable them in the `features` section of the **config/multisite.php** file. The following feature keys are available.

Feature | Description
------- | --------------------------
`system_plugin_sites` | Plugins can be enabled or disabled per site
`system_plugin_site_groups` | Plugins can be enabled or disabled per site group
`system_asset_combiner` | Asset combiner cache keys are unique to the site
`cms_maintenance_setting` | Maintenance Mode Settings are unique for each site
`backend_mail_setting` | Mail Settings are unique for each site
`backend_mail_template` | Mail templates translate via attributes and locale view directories
`dashboard_traffic_statistics` | Dashboard traffic statistics are unique for each site

::: tip
Clear the application cache after you enable or disable these features in the configuration file.
:::

### Managing Plugins per Site

With the `system_plugin_sites` or `system_plugin_site_groups` feature enabled, you can enable or disable plugins for individual sites or site groups. Go to **Settings → Software Updates → Manage Plugins** and use the toggle switch next to each plugin to control its availability for the currently selected site.

A plugin disabled for a site has its admin navigation, settings and controllers hidden for that site. Switching to another site with the site picker restores access to the plugin if it is enabled there.

### Disabling Multisite

To turn off multisite entirely, set the `enabled` value in the **config/multisite.php** file to `false`.

```php
'enabled' => false
```

## Using Multisite in PHP

The [site service](../../backend/services/site.md) provides the global `Site` facade for working with multisite. For example, the following code finds a model in the context of the site with ID **2**.

```php
$model = Site::withContext(2, function() {
    return Model::find(1);
});
```

#### See Also

::: also
* [Multisite Features](https://octobercms.com/features/multisite)
* [Theme Localization](./localization.md)
* [Tailor Localization](./tailor.md)
* [Site Picker Component](../../handbook/tailor-components/sitepicker.md)
* [Multisite Models](../../backend/localization/multisite.md)
* [Site Groups for Models](../../backend/localization/site-groups.md)
* [Site Manager](../../backend/services/site.md)
:::
