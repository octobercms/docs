---
subtitle: "Get your October CMS site from your local machine to a live web server where the world can see it."
---

# Deploying Your Site

You have built your site, tested it locally, and [prepared it for production](./preparing-for-production.md). Now it is time for the final step — putting it on a live server so your visitors can reach it. There are several ways to deploy an October CMS site, depending on your hosting environment and technical comfort level. This guide covers the two most common approaches.

## Option 1: Git-Based Deployment (Recommended)

If you have SSH access to your server, a Git-based deployment is the most reliable approach. It gives you version control, easy rollbacks, and a repeatable process you can use every time you make changes.

### Step 1: Push Your Project to a Git Repository

If you have not already, initialize a Git repository for your project and push it to a service like GitHub, GitLab, or Bitbucket.

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-project.git
git push -u origin main
```

::: warning
Never commit your `.env` file to version control. It contains sensitive credentials like database passwords, your application key, and API tokens. Add `.env` to your `.gitignore` file (October CMS does this by default). You will create a separate `.env` file directly on your production server.
:::

### Step 2: Connect to Your Server

Use SSH to log into your production server:

```bash
ssh user@your-server.com
```

### Step 3: Clone the Repository

Navigate to the directory where your site will live (your web root or a directory above it) and clone your project:

```bash
cd /var/www
git clone https://github.com/your-username/your-project.git your-site
cd your-site
```

### Step 4: Copy Your Composer Auth File

October CMS uses Composer to manage plugins and dependencies. Your local project has an `auth.json` file that contains your license key, which Composer needs to download packages from the October CMS marketplace.

Copy `auth.json` from your local project to the project root on your server. You can use `scp` from your local machine:

```bash
scp auth.json user@your-server.com:/var/www/your-site/auth.json
```

### Step 5: Install Dependencies

On the server, install the PHP dependencies without development packages:

```bash
composer install --no-dev
```

The `--no-dev` flag skips packages that are only needed during development, keeping your production installation lean.

### Step 6: Configure the Environment

Create a `.env` file on the server with your production settings. You can use the `.env.example` file as a starting point:

```bash
cp .env.example .env
```

Then edit it with your production values — database credentials, `APP_DEBUG=false`, your live `APP_URL`, and so on. See [Preparing for Production](./preparing-for-production.md) for the full list of settings to configure.

### Step 7: Run Migrations

Run the database migrations to set up your production database tables:

```bash
php artisan october:migrate
```

### Step 8: Set Up the Web Server

Configure your web server (Apache, Nginx, etc.) to point its document root to your project's root directory. October CMS includes an `.htaccess` file for Apache and provides Nginx configuration examples in the developer documentation.

::: tip
Git-based deployments are recommended because they are repeatable and reversible. If something goes wrong after an update, you can quickly roll back to the previous version with `git checkout`. For even more reliability, consider setting up a simple deployment script or using a tool like Deployer or Envoyer.
:::

## Option 2: FTP / Shared Hosting

If you are on shared hosting without SSH access, you can deploy by uploading your project files directly via FTP.

### Upload Your Files

Using an FTP client (like FileZilla or Cyberduck), upload your entire project directory to your hosting account's web root (often called `public_html` or `www`).

### Check Server Requirements

Before proceeding, confirm that your hosting environment meets the requirements:

- PHP 8.0 or higher
- A supported database (MySQL 5.7+, PostgreSQL 9.6+, SQLite 3.8.8+, or SQL Server 2017+)
- Required PHP extensions: PDO, cURL, OpenSSL, Mbstring, ZipArchive, GD or Imagick, Fileinfo

### Configure the Environment

Create or edit the `.env` file in your project root with your hosting provider's database credentials and other production settings. Your hosting control panel (cPanel, Plesk, etc.) typically provides the database host, name, username, and password.

### Run Migrations

If your host provides SSH access or a terminal in the control panel, run:

```bash
php artisan october:migrate
```

If SSH is not available, October CMS can handle migrations through the backend interface when you first access the administration area.

## Post-Deployment Checklist

Once your site is live, take a few minutes to verify everything is working correctly.

- **Visit the frontend.** Browse through your main pages and make sure everything loads — images, styles, scripts, and content.
- **Log into the backend.** Go to `yoursite.com/admin` and confirm you can sign in and navigate the administration area.
- **Test interactive features.** Submit any contact forms, test AJAX-powered elements, and verify flash messages appear correctly.
- **Check for mixed content.** If your site uses HTTPS, make sure all assets (images, scripts, stylesheets) are also loaded over HTTPS. Mixed content warnings can break functionality and erode visitor trust.
- **Set up backups.** Configure automated backups for both your files and your database. Many hosting providers offer built-in backup tools. At a minimum, keep regular database exports in a safe location.

::: aside
Your first deployment is usually the most involved. After the initial setup, updating your site is much simpler — push changes to Git, pull them on the server, and run migrations if needed. The process becomes routine quickly.
:::

## Keeping Your Site Updated

After your initial deployment, you will occasionally need to update October CMS, your plugins, or your theme. The general process is:

1. Make and test changes locally.
2. Commit and push to your Git repository.
3. Pull the changes on your server.
4. Run `composer update` if dependencies changed.
5. Run `php artisan october:migrate` if there are new migrations.

For detailed information about deployment options and server configuration, see the [Deployment](../../../4.x/setup/deployment.md) page in the developer documentation.
