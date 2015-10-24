# |page

The `|page` filter creates a link to a page using a page file name, without an extension, as a parameter. For example, if there is the about.htm page you can use the following code to generate a link to it:

    <a href="{{ 'about'|page }}">About Us</a>

Remember that if you refer a page from a subdirectory you should specify the subdirectory name:

    <a href="{{ 'contacts/about'|page }}">About Us</a>

> **Note**: The [Themes documentation](../cms/themes#subdirectories) has more details on subdirectory usage.

You can create a link to the current page by filtering an empty string:

    <a href="{{ ''|page }}">Refresh page</a>

<a name="reverse-routing"></a>
## Reverse routing

When linking to a page that has URL parameters defined, the `|page` filter supports reverse routing by passing an array as the first argument.

    url = "/blog/post/:post_id"
    ==
    [...]

Given the above content is found in a CMS page file **post.htm** you can link to this page using:

    <a href="{{ 'post'|page({ post_id: 10 }) }}">
        Blog post #10
    </a>

If the website address is __http://octobercms.com__ the above example would output the following:

    <a href="http://octobercms.com/blog/post/10">
        Blog post #10
    </a>

<a name="persistent-parameters"></a>
## Persistent URL parameters

If a URL parameter is already presented in the environment, the `|page` filter will use it automatically.

    url = "/blog/post/:post_id"

    url = "/blog/post/edit/:post_id"

If there are two pages, **post.htm** and **post-edit.htm**, with the above URLs defined, you can link to either page without needing to define the `post_id` parameter.

    <a href="{{ 'post-edit'|page }}">
        Edit this post
    </a>

When the above markup appears on the **post.htm** page, it will output the following:

    <a href="http://octobercms.com/blog/post/edit/10">
        Edit this post
    </a>

The `post_id` value of *10* is already known and has persisted across the environments. You can disable this functionality by passing the 2nd argument as `false`:

    <a href="{{ 'post'|page(false) }}">
        Unknown blog post
    </a>

Or by defining a different value:

    <a href="{{ 'post'|page({ post_id: 6 }) }}">
        Blog post #6
    </a>
