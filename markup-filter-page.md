# |page

The `|page` filter creates a link to a page using a page file name, without an extension, as a parameter. For example, if there is the about.htm page you can use the following code to generate a link to it:

    <a href="{{ 'about'|page }}">About Us</a>

Remember that if you refer a page from a [subdirectory](themes#subdirectories) you should specify the subdirectory name:

    <a href="{{ 'contacts/about'|page }}">About Us</a>

The reverse routing is built into the the `|page` filter. It allows you to provide URL parameters required for a page you refer. For example, if you want to create a link to a page post.htm that has the following URL pattern: */blog/post/:post_id* you need to provide the **post_id** parameter. You can do it with the page filter:

    <a href="{{ 'post'|page({post_id: 10}) }}">Blog post #10</a>

Another great feature of the reverse routing is the route parameter persisting. It sounds complicated, but in practice it's a simple concept. If a parameter is already presented in the environment, the `|page` filter will use it automatically. For example, if you are building a web application with the Preview Post (**/blog/post/preview/:post_id**) and Edit Post (**/blog/post/edit/:post_id**) pages and you want to create a link to the Edit Post from the Preview Post page you can do it like this:

    <a href="{{ 'post/edit'|page }}">Edit this post</a>

As you can see we don't need to specify the **post_id** parameter, because it is already known on the Preview page - it was loaded from the Preview Post page URL.