# Section

Defines a website section with a supporting entry.

Attaching the sectionto a page.

```ini
[section author]
handle = "Blog\Author"
entrySlug = "{{ :slug }}"
```

Showing the entry.

```twig
<h1>Posts by {{ author.title }}</h1>
```
