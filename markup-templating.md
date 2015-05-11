# Introduction to Twig

October extends [Twig](http://twig.sensiolabs.org/documentation) engine with a number of functions, tags, filters and variables. Those extensions allow you to use the CMS features and access the page environment information inside your templates.

Please refer to the [Twig documentation](http://twig.sensiolabs.org/doc/templates.html) for the full information about the native Twig language syntax and elements.

October leverages Twig for the front-end templating language. Twig is a robust and mature library that shares syntax with other systems such as AngularJS and Jinja. More can be discovered by reading the [Twig documentation](http://twig.sensiolabs.org/documentation).

## Variables

Template variables are printed on the page using *double curly brackets*.

    {{ variable }}

Variables can also represent *expressions*.

    {{ isAjax ? 'Yes' : 'No' }}

Variables can be concatenated with the `~` character.

    {{ 'Your name: ' ~ name }}

October provides global variables under the `this` variable, as listed under the **Variables** section.

## Tags

Tags are a unique feature to Twig and are wrapped with `{% %}` characters.

    {% tag %}

Tags provide a more fluent way to describe template logic.

    {% if stormCloudComing %}
        Stay inside
    {% else %}
        Go outside and play
    {% endif %}

The `{% set %}` tag can be used to set variables inside the template.

    {% set activePage = 'blog' %}

Tags can take on many different syntaxes and are listed under the **Tags** section.

## Filters

Filters act as modifiers to variables for a single instance and are applied using a *pipe symbol* follow by the filter name.

    {{ 'string'|filter }}

Filters can take arguments like a function.

    {{ price|currency('USD') }}

Filters can be applied in succession.

    {{ 'October Glory'|upper|replace({'October': 'Morning'}) }}

Filters are listed under the **Filters** section.

## Functions

Functions allow logic to be executed and the return result acts as a variable.

    {{ function() }}

Functions can take arguments.

    {{ dump(variable) }}

Functions are listed under the **Functions** section.

## Access logic

The most important thing to learn about Twig is how it accesses the PHP layer. For convenience sake `{{ foo.bar }}` does the following checks on a PHP object:

1. Check if `foo` is an array and `bar` a valid element
1. If not, and if `foo` is an object, check that `bar` is a valid property
1. If not, and if `foo` is an object, check that `bar` is a valid method (even if bar is the constructor - use __construct() instead)
1. If not, and if `foo` is an object, check that `getBar` is a valid method
1. If not, and if `foo` is an object, check that `isBar` is a valid method
1. If not, return a `null` value.
