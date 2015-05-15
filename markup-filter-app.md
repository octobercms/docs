# |app

The `|app` filter returns an address relative to the public path of the website. The result is an absolute URL, including the domain name and protocol, to the location specified in the filter parameter. The filter can be applied to any path.

    <link rel="icon" href="{{ '/favicon.ico'|app }}" />

If the website address is __http://octobercms.com__ the above example would output the following:

    <link rel="icon" href="http://octobercms.com/favicon.ico" />

It can also be used for static URLs:

    <a href="{{ '/about-us'|app }}">
        About Us
    </a>

The above would output:

    <a href="http://octobercms.com/about-us">
        About us
    </a>

> **Note**: The `|page` filter is reccommended for linking to other pages.
