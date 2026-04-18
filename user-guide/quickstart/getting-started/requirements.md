---
subtitle: "What you need before installing October CMS"
---
# Requirements

Welcome to the October CMS User Guide! This guide will walk you through everything you need to know to build and manage a website with October CMS — from installation and setup to creating content, customizing your theme, and managing your site day to day. No deep programming knowledge is required.

## What is October CMS?

October CMS is a content management system built on PHP and the Laravel framework. It gives you a clean, modern backend for managing your website while keeping things flexible enough for any kind of project. Here are a few things that make it stand out:

- **Tailor** lets you define custom content structures (like blog posts, portfolios, or product catalogs) without writing any code — just simple blueprint files.
- **A powerful theming system** gives you full control over your site's HTML, CSS, and JavaScript, so your website looks exactly the way you want.
- **A plugin ecosystem** lets you extend your site with additional features whenever you need them.

Whether you are building a personal blog, a business website, or something more complex, October CMS gives you the tools to get it done.

## System Requirements

Before you install October CMS, you need to make sure your computer or server has the right software in place. Here is what you will need:

- **PHP 8.2 or higher** — PHP is the programming language that October CMS runs on. Most modern hosting environments already include it.
- **Composer 2.0 or higher** — Composer is a tool that manages PHP packages and dependencies. You will use it to install October CMS and keep it up to date.
- **A database** — October CMS stores your content and settings in a database. You can use any of the following:
  - **MySQL 5.7+** (or MariaDB 10.2+) — the most common choice
  - **PostgreSQL 9.6+** — a popular open-source alternative
  - **SQLite 3.8.8+** — a lightweight option that stores everything in a single file, great for local development
- **A web server** — Apache, Nginx, or any web server that supports PHP. For local development, you can use the built-in Laravel development server instead.

::: tip
This might sound like a lot, but most of these requirements are handled automatically by the local development tools recommended below. You will be up and running in minutes.
:::

## Recommended Local Development Environments

If you are setting up October CMS on your own computer for the first time, we recommend using one of these tools. They bundle PHP, a database, and a web server together so you do not have to install each piece separately.

### Laravel Herd (macOS and Windows)

[Laravel Herd](https://herd.laravel.com/) is the easiest way to get started. It installs PHP, a database, and everything else you need with a single download. It is free for basic use and works on both macOS and Windows.

### Laragon (Windows)

[Laragon](https://laragon.org/) is a lightweight, beginner-friendly development environment for Windows. It comes with Apache, PHP, MySQL, and more — all preconfigured and ready to use.

### October CMS Docker Image

If you are comfortable with Docker, October CMS provides an official development image. This is a great option if you want an isolated, reproducible environment. You can find it on [Docker Hub](https://hub.docker.com/r/octobercms/october).

## Installing Composer

If your development environment does not already include Composer (Laravel Herd and Laragon both include it), you can install it manually.

Visit [getcomposer.org](https://getcomposer.org/) and follow the installation instructions for your operating system. On most systems, the installation takes just a minute or two. Once installed, you can verify it is working by opening a terminal and running:

```bash
composer --version
```

You should see output showing Composer version 2.x. If you see version 1.x, follow the upgrade instructions on the Composer website.

## Next Steps

Once you have a development environment set up with PHP, Composer, and a database, you are ready to install October CMS. Head over to the [Installation](./installation.md) page to get started.

For the complete technical requirements, including a full list of required PHP extensions and web server configuration details, see the [full system requirements](../../../4.x/setup/installation.md) in the developer documentation.
