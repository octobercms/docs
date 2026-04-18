---
subtitle: "Managing site-wide settings and shared content"
---
# Global Content

Not all content belongs to a list. Some content applies to your entire website — things like your site tagline, social media links, footer text, or contact information. This is where global blueprints come in. A global blueprint defines a single record of site-wide content that you can edit in one place and display anywhere on your site.

## When to Use Globals

Global content is the right choice when you have information that:

- **Appears on multiple pages** — Footer content, header announcements, or navigation links that show up across your entire site.
- **Exists as a single record** — There is only one set of social media links, one company address, one site tagline.
- **Changes infrequently** — Site-wide settings tend to be updated occasionally rather than daily.

Common examples include:

- Company name, address, and phone number
- Social media profile links
- Footer text and copyright notices
- Default SEO metadata
- Site-wide announcements or banners
- Business hours

## Creating a Global Blueprint

Global blueprints follow the same structure as other blueprints, with `type` set to `global`. Here is a complete example for managing site settings:

```yaml
uuid: b8c9d0e1-f2a3-4567-8901-bcdef456789a
handle: Site\Settings
type: global
name: Site Settings

fields:
    tagline:
        label: Site Tagline
        type: text
    social_links:
        label: Social Media Links
        type: repeater
        form:
            fields:
                platform:
                    label: Platform
                    type: dropdown
                    options:
                        twitter: Twitter
                        facebook: Facebook
                        instagram: Instagram
                        linkedin: LinkedIn
                url:
                    label: URL
                    type: text
    footer_text:
        label: Footer Text
        type: richeditor
        size: small
```

Save this file in your `app/blueprints/` directory (for example, `app/blueprints/site/settings.yaml`) and then run the migration:

```bash
php artisan october:migrate
```

Let's look at what each field provides:

- **tagline** — A simple text field for a short site description or slogan.
- **social_links** — A repeater field that lets you add as many social media links as you need. Each entry in the repeater has a platform dropdown and a URL field. You can add, remove, and reorder items freely.
- **footer_text** — A rich text editor for formatted footer content like copyright notices, disclaimers, or brief company descriptions.

## Managing Global Content in the Backend

Global content works differently from entry-type content in the backend. Instead of seeing a list of records, you see a single form. When you click on a global content type in the backend menu, it opens the form directly — there is no list view because there is only one record.

To update your global content:

1. Click on the global content type in the backend sidebar (for example, "Site Settings").
2. The form opens with the current values already filled in.
3. Make your changes — update the tagline, add a new social media link, edit the footer text.
4. Click **Save** to apply your changes.

Your updates take effect immediately across your entire site.

::: tip
Global content is a great place to put information that non-technical team members need to update occasionally. Instead of editing theme files or code, they can simply update a form field in the backend.
:::

## Adding Navigation for Globals

Just like entry blueprints, you can add a `navigation` section so your global content appears in the backend sidebar:

```yaml
navigation:
    icon: icon-cog
    label: Site Settings
    order: 500
```

Using a higher `order` value (like 500) places global settings lower in the sidebar menu, which makes sense since they are typically accessed less frequently than regular content.

## Displaying Global Content on the Frontend

Once you have global content set up, you will want to display it on your website pages. October CMS provides a **Global** component that you can add to your theme layouts and pages.

In a CMS layout or page, you can add the Global component and then access the fields in your Twig templates. For example, to display the site tagline:

```twig
{{ global.tagline }}
```

Or to loop through the social media links:

```twig
{% for link in global.social_links %}
    <a href="{{ link.url }}">{{ link.platform }}</a>
{% endfor %}
```

::: aside
The details of adding components to themes and working with Twig templates are covered in the Themes section of this guide. For now, just know that any global content you define is easily accessible in your frontend templates.
:::

## Practical Example: Multiple Global Blueprints

You are not limited to a single global blueprint. It is common to have several, each managing a different aspect of your site. For example:

- `Site\Settings` — General site information (tagline, logo, contact details)
- `Site\SEO` — Default meta titles, descriptions, and social sharing images
- `Site\Footer` — Footer navigation links, copyright text, and partner logos

Keeping globals organized by purpose makes them easier to find and manage, especially when multiple people are updating the site.

## Next Steps

You now know how to manage both collection-based content with entries and site-wide content with globals. Next, learn about the [Media Manager](./media-manager.md) to handle images, documents, and other files on your site.

For the full technical reference on global blueprints and all available options, see the [Blueprints](../../../4.x/cms/tailor/blueprints.md) developer documentation.
