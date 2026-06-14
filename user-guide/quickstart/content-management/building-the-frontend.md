---
subtitle: "Display team members on the frontend with collection, section, and global components"
---
# Building the Frontend

You have team members in the database and settings configured. Now let's build the frontend pages to display them. We will create a team listing page and an individual profile page, both powered by Tailor components.

October CMS provides three components for displaying Tailor content:

- **Collection**: loops through a list of entries (our team members)
- **Section**: displays a single entry by its slug (one team member's profile)
- **Global**: makes global settings available to the page (our team settings)

## Create the Team Listing Page

1. Navigate to **Editor → Pages** and click **+ Add**.
2. Fill in the settings:
   - **Title**: `Our Team`
   - **URL**: `/team`
   - **File Name**: `team`
   - **Layout**: select `default`
3. Before writing the markup, we need to add components. Click the **Components** panel on the side and add:
   - **Collection**: set its **handle** to `Team\Member`
   - **Global**: set its **handle** to `Team\Settings`
4. In the markup editor, enter:

```twig
<h1 class="text-3xl font-bold mb-2">{{ global.page_title }}</h1>

{% if global.introduction %}
    <p class="text-lg text-gray-600 mb-8">{{ global.introduction }}</p>
{% endif %}

{% set members = collection.paginate(global.per_page) %}

<div class="grid gap-6 sm:grid-cols-2">
    {% for member in members %}
        <div class="bg-white rounded-lg shadow-sm p-6">
            {% if global.show_photos and member.photo %}
                <img
                    src="{{ member.photo.thumb(200, 200, {mode: 'crop'})}}"
                    alt="{{ member.title }}"
                    class="w-24 h-24 rounded-full mb-4"
                >
            {% endif %}
            <h2 class="text-xl font-semibold">
                <a href="{{ 'team-profile'|page({slug: member.slug}) }}" class="hover:text-blue-600">
                    {{ member.title }}
                </a>
            </h2>
            {% if member.role %}
                <p class="text-gray-500">{{ member.role }}</p>
            {% endif %}
        </div>
    {% endfor %}
</div>

{{ pager(members) }}
```

5. Click **Save**.

::: tip
Don't worry about the `team-profile` link showing errors. We haven't created that page yet. We will do that next.
:::

### What This Does

- **`{{ global.page_title }}`** and **`{{ global.introduction }}`**: pull the title and intro text from our Team Settings global.
- **`collection.paginate(global.per_page)`**: fetches team members with pagination controlled by the `per_page` setting. Since we set it to `2`, you will see 2 members per page.
- **`global.show_photos`**: controls whether profile photos are shown. Toggle this off in the backend and the photos disappear.
- **`{{ pager(members) }}`**: renders pagination links (Previous, Next, page numbers).

## Create the Team Profile Page

1. Go to **Editor → Pages** and click **+ Add**.
2. Fill in the settings:
   - **Title**: `Team Profile`
   - **URL**: `/team/:slug`
   - **File Name**: `team-profile`
   - **Layout**: select `default`
3. Add a component:
   - **Section**: set its **handle** to `Team\Member`
4. In the markup editor, enter:

```twig
{% if section is empty %}
    {% do abort(404) %}
{% endif %}

<div class="max-w-2xl">
    <a href="{{ 'team'|page }}" class="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to team</a>

    {% if section.photo %}
        <img
            src="{{ section.photo.thumb(300, 300, {mode: 'crop'}) }}"
            alt="{{ section.title }}"
            class="w-32 h-32 rounded-full mb-6"
        >
    {% endif %}

    <h1 class="text-3xl font-bold mb-2">{{ section.title }}</h1>

    {% if section.role %}
        <p class="text-lg text-gray-500 mb-4">{{ section.role }}</p>
    {% endif %}

    {% if section.email %}
        <p class="mb-4">
            <a href="mailto:{{ section.email }}" class="text-blue-600 hover:underline">{{ section.email }}</a>
        </p>
    {% endif %}

    {% if section.bio %}
        <div class="prose mt-6">
            <p>{{ section.bio }}</p>
        </div>
    {% endif %}
</div>
```

5. Click **Save**.

### How the URL Works

The `:slug` in the URL (`/team/:slug`) is a parameter. When someone visits `/team/ada-lovelace`, the section component looks up the team member with that slug and makes it available as `section`. If no match is found, the `{% do abort(404) %}` returns a 404 page.

## Add the Team Link to the Layout

Let's add a link to the team page in our navigation.

1. Open **Editor → Layouts → default**.
2. Add a team link to the navigation:

```twig
<a href="{{ 'home'|page }}" class="text-gray-600 hover:text-gray-900">Home</a>
<a href="{{ 'about'|page }}" class="text-gray-600 hover:text-gray-900">About</a>
<a href="{{ 'team'|page }}" class="text-gray-600 hover:text-gray-900">Team</a>
```

3. Click **Save**.

## Try It Out

1. Preview your site and click the **Team** link in the navigation.
2. You should see the team listing page with the title and introduction from your global settings, and your team members displayed in a grid.
3. Since you set **Members Per Page** to `2`, you will see pagination at the bottom. Click through the pages.
4. Click on a team member's name to see their profile page.
5. Go back to the backend and toggle **Show Profile Photos** off in Team Settings. Refresh the frontend and the photos disappear.
6. Change **Members Per Page** to `10` and all members now appear on one page with no pagination.

This is the power of Tailor: the content, the structure, and the display settings are all managed through the backend without touching any code.

## Next Steps

You have built a complete content-driven section of your site, from blueprints to backend management to frontend display. The Content Management section is complete.

Continue to [Meet the AJAX Framework](../interactive-features/ajax-introduction.md) to add interactive features like forms and dynamic page updates.

For the full reference on Tailor components, see [Collection](../../../4.x/cms/components/collection.md), [Section](../../../4.x/cms/components/section.md), and [Global](../../../4.x/cms/components/global.md) in the developer documentation.
