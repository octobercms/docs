---
subtitle: "Install October CMS and log in for the first time"
---
# Installation

Now that your development environment is ready, it is time to install October CMS. The whole process takes just a few minutes and uses the command line. Do not worry if you have not used a terminal much before — we will walk through every step.

## Step 1: Create the Project

Open your terminal (Terminal on macOS, PowerShell or Command Prompt on Windows, or the terminal built into your code editor) and run the following command:

```bash
composer create-project october/october mysite
```

This tells Composer to download October CMS and all of its dependencies into a new folder called `mysite`. You can replace `mysite` with whatever you want to name your project. The download may take a minute or two depending on your internet connection.

## Step 2: Enter the Project Directory

Once Composer finishes, navigate into your new project folder:

```bash
cd mysite
```

All remaining commands should be run from inside this directory.

## Step 3: Run the Installer

Now run the October CMS installation command:

```bash
php artisan october:install
```

This interactive wizard will guide you through the setup process. It will ask you for the following information:

- **License Key** — your October CMS license key, which links the installation to your account and unlocks updates.
- **Database configuration** — the type of database you want to use (MySQL, PostgreSQL, or SQLite) and the connection details. If you are using SQLite for local development, you can accept the defaults.
- **Administrator account** — a username, email, and password for the first admin user. This is the account you will use to log into the backend.

::: aside
You can obtain a license key by creating an account at [octobercms.com](https://octobercms.com) and starting a new project. Each project is assigned a unique license key. If you do not have a key yet, you can still install and explore October CMS locally.
:::

The installer will create your database tables, set up the default theme, and configure everything you need. When it finishes, you will see a success message in the terminal.

## Step 4: Start the Development Server

To see your new site in action, start the built-in Laravel development server:

```bash
php artisan serve
```

This will start a local web server, typically at `http://localhost:8000`. The terminal will display the exact URL — keep this terminal window open while you work.

## Step 5: View Your Website

Open your web browser and visit:

```
http://localhost:8000
```

You should see the default October CMS demo theme. This is the public-facing frontend of your website — what your visitors will see.

## Step 6: Log Into the Backend

The backend is where you manage your website's content, settings, and appearance. To access it, visit:

```
http://localhost:8000/backend
```

Enter the administrator username and password you created during the installation in Step 3. Once logged in, you will see the October CMS dashboard — your site's control center.

::: tip
If you prefer a browser-based installer instead of the command line, October CMS also offers a wizard installer. After running `composer create-project`, point your web browser to the project URL and the setup wizard will launch automatically. This can be a more visual way to configure your database and admin account.
:::

## Troubleshooting

If you run into issues during installation, here are a few things to check:

- **Composer errors** — make sure you are running Composer 2.0 or higher (`composer --version`). If you see memory errors, try running `php -d memory_limit=-1 $(which composer) create-project october/october mysite`.
- **Database connection failures** — double-check that your database server is running and that the credentials you entered are correct.
- **Permission errors** — the `storage/` and `bootstrap/cache/` directories need to be writable. On macOS and Linux, you can fix this with `chmod -R 775 storage bootstrap/cache`.

## Next Steps

Your site is installed and running. Next, take a look at the [Project Structure](./project-structure.md) page to understand where everything lives, or skip ahead to [Exploring the Backend](./backend-tour.md) to get familiar with the admin panel.

For advanced installation options, including web server configuration and deployment, see the [Installation Guide](../../../4.x/setup/installation.md) in the developer documentation.
