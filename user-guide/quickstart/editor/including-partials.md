---
subtitle: "Extract reusable template fragments into partials"
---
# Including Partials

A **partial** is a reusable template fragment — a piece of HTML and Twig that you write once and include wherever you need it. Partials are ideal for things that appear in multiple places: navigation menus, footers, card layouts, sidebars, call-to-action banners.

The difference from content files: content files hold **editable text** (Markdown or plain HTML), while partials hold **template markup** with full Twig support.

## Create a Partial

Let's extract the footer from our layout into a partial so it can be reused.

1. Navigate to **Editor** in the top menu, then click **Partials** in the side panel.
2. Click the **+ Add** button.
3. In the **File Name** field, enter `site-footer`.
4. In the markup editor, enter:

```twig
<footer class="bg-white border-t mt-16">
    <div class="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
        &copy; {{ 'now'|date('Y') }} My Website
    </div>
</footer>
```

5. Click **Save**.

## Include It in the Layout

1. Open **Editor → Layouts → default**.
2. Find the `<footer>` block and replace it with:

```twig
{% partial 'site-footer' %}
```

3. Click **Save** and preview the site.

The page looks exactly the same — but now the footer markup lives in its own file. If you ever need to change the footer, you update it in one place and every layout that includes it gets the change.

## Passing Variables to Partials

Partials can accept variables, making them flexible. For example, you could make the site name configurable:

```twig
{% partial 'site-footer' siteName="My Website" %}
```

Inside the partial, use the variable:

```twig
<div class="max-w-4xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
    &copy; {{ 'now'|date('Y') }} {{ siteName }}
</div>
```

This is especially useful for partials like cards, hero sections, or any component where the structure stays the same but the content changes.

## Partials as UI Components

Partials can do more than just include a chunk of HTML — they can act as full UI components that accept content inside them. Let's build a reusable styled button.

### Create the Button Partial

1. Go to **Editor → Partials** and click **+ Add**.
2. Name it `btn`.
3. Enter the following markup:

```twig
{% props {href: '#', style: 'primary'} %}

{% set colors = style == 'primary'
    ? 'bg-blue-600 text-white hover:bg-blue-700'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300' %}

<a href="{{ href }}" {{ attributes.merge({class: 'inline-block px-5 py-2.5 rounded-lg font-medium transition ' ~ colors}) }}>
    {{ body|raw }}
</a>
```

4. Click **Save**.

This partial uses `{% props %}` to declare two parameters: `href` and `style`. Any other attributes you pass (like `class` or `id`) flow into the `attributes` bag and get merged onto the element automatically.

### Use the Button on a Page

1. Open **Editor → Pages → Home**.
2. Add a couple of buttons to the markup:

```twig
{% partial 'btn' href="/" style="primary" body %}
    Get Started
{% endpartial %}

{% partial 'btn' href="/about" style="secondary" body %}
    Learn More
{% endpartial %}
```

3. Click **Save** and preview the page.

You should see two styled buttons — a blue primary button and a grey secondary button. The `body` keyword lets you pass the button label as content inside the partial tag, rather than as a variable.

### Why This Matters

You now have a reusable button component. Need a button anywhere on your site? Use `{% partial 'btn' %}` with the right props. Change the styling in one place and every button updates. This pattern works for any UI element — cards, alerts, badges, modals.

::: aside
For the full reference on partials, including the `{% props %}` tag and `attributes` API, see [Partials](../../../4.x/cms/themes/partials.md) in the developer documentation.
:::

## Next Steps

Continue to [Media Manager](./media-manager.md) to upload an image and display it on your page.
