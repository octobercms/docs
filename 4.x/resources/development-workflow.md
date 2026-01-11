---
subtitle: Learn how to manage your October CMS project with Git and keep environments in sync.
---
# Development Workflow

October CMS projects can be managed using different Git strategies depending on the size and complexity of your site. This article covers recommended workflows for local development, version control, and server synchronization.

## Repository Strategies

There are two primary approaches to structuring your Git repositories.

### Monolith Repository

For smaller sites, a single Git repository containing the entire project is the simplest approach. This keeps everything in one place and is easy to manage.

```bash
# Clone the entire project
git clone git@github.com:yourorg/myproject.git
```

Use a `.gitignore` file to exclude vendor packages and core modules that are managed by Composer.

```gitignore
/vendor
/modules
/plugins/*/*
!/plugins/yourcompany
/themes/*
!/themes/yourtheme
```

This approach tracks only your custom code while letting Composer manage dependencies.

### Modular Repositories

For larger sites, each in-house plugin and theme can be its own Git repository. This provides better separation of concerns and allows different team members to work on different packages independently.

```
plugins/
├── acme/
│   └── blog/          ← Separate Git repo
├── acme/
│   └── shop/          ← Separate Git repo
themes/
└── mycompany-theme/   ← Separate Git repo
```

Both strategies are compatible with each other. You can have a monolith repository that contains submodules, or manage packages entirely independently.

## Installing Packages from Git

Plugins and themes can be installed directly from a Git repository using Composer.

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git
```

Use the `--want` option to specify a branch or version.

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git --want=dev-develop
```

The same applies to themes.

```bash
php artisan theme:install acme-starter --from=git@github.com:acme/starter-theme.git
```

::: tip
Use the `--oc` option if the repository name has the `oc-` prefix convention, for example `oc-blog-plugin`.
:::

## Synchronizing with the Server

When working with modular repositories, you can pull updates for all Git-managed packages at once using the utility command.

```bash
php artisan october:util git pull
```

This command iterates through all plugins and themes that are Git repositories and pulls the latest changes from their remotes.

For individual packages, navigate to the package directory and use standard Git commands.

```bash
cd plugins/acme/blog
git pull origin main
```

After pulling changes, run migrations to apply any database updates.

```bash
php artisan october:migrate
```

## Recommended Workflow

A typical development workflow looks like this.

1. **Develop locally** using your preferred IDE
2. **Commit changes** to your Git repository
3. **Push to remote** (GitHub, GitLab, Bitbucket, etc.)
4. **Pull on server** via SSH using `git pull` or `october:util git pull`
5. **Run migrations** with `php artisan october:migrate`

### Automated Deployments

For more automated workflows, consider these options.

- **CI/CD pipelines** that deploy on push to specific branches
- **Git hooks** on the server that pull changes automatically
- **[Deploy Plugin](https://octobercms.com/plugin/rainlab-deploy)** for environments without SSH access

## Working with the Backend Editor

The backend CMS editor saves changes directly to the theme files on the server filesystem. When using Git:

- Changes made in the backend editor exist only on the server until committed
- Pull these changes to your local environment before making local edits
- Consider using [database themes](../cms/themes/database-themes.md) if multiple editors need to work simultaneously

For teams where content editors use the backend while developers use local files, establish a clear workflow to avoid conflicts. One approach is to have editors work on a staging server, with changes reviewed and merged into the main repository periodically.

#### See Also

::: also
* [Installing Plugins & Themes](./installing-packages.md)
* [Deployment](../setup/deployment.md)
* [Database Themes](../cms/themes/database-themes.md)
:::