# Developer Standards and Patterns

## Repository naming

Plugins to be named with the `-plugin` suffix and optional `oc-` prefix.

    blog-plugin
    oc-blog-plugin

Themes to be named with the `-theme` suffix and optional `oc-` prefix.

    happy-theme
    oc-happy-theme

## Variable naming

Use **camelCase** everywhere except for the following:

* Postback parameters should use **snake_case**
* Database columns should use **snake_case**
* Language keys should use **snake_case**

## Class naming

Recommended class suffixes and prefixes:

* Manager
* Builder
* Writer
* Reader
* Handler
* Container
* Protocol
* Target
* Converter
* Controller
* View
* Factory
* Entity
* Bag

NB: Don't get naming paralysis. Yes, names are very important but they're not important enough to waste huge amounts of time on. If you can't think up a good name in 10 minutes, move on.
