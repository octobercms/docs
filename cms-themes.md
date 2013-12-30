Themes are directories that reside in the **/themes** directory by default.
Themes can contain the following CMS templates:

- *Pages* - hold the content for each URL.
- *Partials* - contain reusable chunks of HTML markup.
- *Layouts* - define the page scaffold.
- *Content files* - text or HTML blocks that can be edited separately from the page or layout.
- *Asset files* - are resource files like images and stylesheets.

Example theme directory structure:

```
themes/
  website/ <== theme starts here
    pages/
      home.htm
    layouts/
      default.htm
    partials/
      sidebar.htm
    content/
      intro.htm
    assets/
      css/
        my-styles.css
      javascript
      images
```

##### Subdirectories

All CMS templates can be grouped as a single level of subdirectories. This simplifies organizing large websites.

```
themes/
  website/ <== theme starts here
    pages/
      home.htm
      blog/
        archive.htm
        category.htm
    partials/
      sidebar.htm
      blog/
        category-list.htm
    content/
      footer-contacts.txt
      home/
        intro.htm
    ...
```

To refer to a template from a subdirectory, specify the subdirectory name before the template name.
Example:

```php
{% partial "blog/category-list" %}
```

#### Template structure

Template files (pages, partials and layouts) can include up to 3 sections: configuration, PHP code, and Twig markup. 
Sections are separated with the `==` sequence.
For example:

```php
url = "/blog"
layout = "default"
==
function onStart()
{
  $this['posts'] = ...;
}
==
<h3>Blog archive</h3>
{% for post in posts %}
  <h4>{{ post.title }}</h4>
  {{ post.content }}
{% endfor %}
```

The **configuration section** uses INI format, where string parameter values are enclosed within quotes.
Supported configuration parameters are specific for different CMS templates.

The **PHP code section** can contain optional open and close PHP tags to enable syntax highlighting in text editors.
The open and close tags should always be specified on another line to the section separator (`==`):

```php
url = "/blog"
layout = "default"
==
<?
function onStart()
{
  $this['posts'] = ...;
}
?>
==
<h3>Blog archive</h3>
{% for post in posts %}
  <h4>{{ post.title }}</h4>
  {{ post.content }}
{% endfor %}
```

The PHP section is optional for all CMS templates.
