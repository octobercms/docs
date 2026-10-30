# Guide Page Template

Guide pages live in the Getting Started, Theme Development and Backend Development tabs. They explain a concept and show how to use it. Anything written in YAML or Twig that a reader looks up by name, such as field types, Twig filters or config options, belongs in the API Handbook instead. PHP lookups, such as relation types, model traits and validation rules, are reference pages in Backend Development, placed next to the guide they support.

The motto applies to every page: as simple as possible, no simpler.

## Page Shape

````md
---
previousPath: cms/themes/pages.md
subtitle: One sentence on what the reader can do with this page.
---
# A Title That Says What You Get

One or two sentences on what this is and when you would use it.

```twig
{# The smallest working example, ready to copy #}
```

## A Task the Reader Wants to Do

Short paragraphs, each followed by an example where it helps.

### A Variation of That Task

The same pattern, one level down.

## An Advanced Topic

Less common detail goes last, so a reader who stops early still has the essentials.

#### See Also

::: also
* [A related guide](./related-guide.md)
* [The Handbook entry for an option used above](../handbook/form-fields.md)
:::
````

Only keep `previousPath` when the page replaces a 4.x page. It drives the version switcher and redirects from old links.

## Rules

- **One question per page.** If a page answers two, split it.
- **Example first.** Show the smallest working example before explaining it, and make sure it works when copied.
- **Titles say what you get.** Use "Storing Themes in the Database", not "Database-driven Themes". Never title a page "Introduction". Tab overview pages are the exception, using the tab name as the title and `shortname: Overview`.
- **Every page has a subtitle.** It becomes the meta description, so write it as one complete sentence.
- **Headings are tasks.** Use the words a reader would search for.
- **Essentials first, advanced last.** Order sections and pages so that stopping early still leaves the reader with what they need.
- **Link, don't repeat.** Show the two or three options a task needs, then link to the Handbook entry for the full table.
- **Keep the voice plain.** Address the reader as "you", keep sentences short, and avoid "simply", "just" and "easy".
- **Use callouts sparingly.** Reserve `::: tip` and `::: warning` for things that would otherwise catch the reader out.
- **No em-dashes.** Use commas, colons or separate sentences.
- **Laravel services keep facade examples.** Laravel's own docs moved away from facades, so October's service pages show the facade style.

## Migrating a Stub

1. Read the 4.x articles linked in the stub's tip box.
1. Leave out anything the Handbook covers. Search `5.x/handbook` for `previousPath:` entries that name the same 4.x article, since those sections now live in the Handbook.
1. Rewrite the rest into the page shape above.
1. Remove the stub tip box.
