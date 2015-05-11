# |app

The `|app` filter returns an absolute URL, including the domain name and protocol, to an address specified in the parameter.

    <a href="{{ '/about-us'|app }}">About Us</a>

The above example would return a string like **http://example.com/about-us**.

    <link rel="icon" href="{{ '/favicon.ico'|app }}" />

The above example would return a string like **http://example.com/favicon.ico**.
