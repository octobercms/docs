---
previousPath: resources/development-workflow.md
subtitle: Manage your October CMS project with Git and keep your local and server environments in sync.
---
# Development Workflow

You can manage an October CMS project with Git in different ways, depending on the size and complexity of your site. This page covers the recommended workflow for local development, version control and keeping servers in sync.

```bash
git pull
php artisan october:migrate
```

## A Typical Workflow

A typical development workflow looks like this.

1. **Develop locally** using your preferred IDE
2. **Commit changes** to your Git repository
3. **Push to remote** (GitHub, GitLab, Bitbucket, etc.)
4. **Pull on server** via SSH using `git pull` or `october:util git pull`
5. **Run migrations** with `php artisan october:migrate`

### Automating Deployments

For more automated workflows, consider these options.

- **CI/CD pipelines** that deploy on push to specific branches
- **Git hooks** on the server that pull changes automatically
- **[Deploy Plugin](https://octobercms.com/plugin/rainlab-deploy)** for environments without SSH access

## Choosing a Repository Strategy

There are two main ways to structure your Git repositories. They work together: you can have a monolith repository that contains submodules, or manage each package on its own.

### Using a Single Repository

For smaller sites, keep the entire project in a single Git repository. Everything stays in one place.

```bash
# Clone the entire project
git clone git@github.com:yourorg/myproject.git
```

Use a `.gitignore` file to exclude the vendor packages and core modules that Composer manages.

```gitignore
/vendor
/modules
/plugins/*/*
!/plugins/yourcompany
/themes/*
!/themes/yourtheme
```

This tracks only your custom code and lets Composer manage the dependencies.

### Using a Repository per Package

For larger sites, give each in-house plugin and theme its own Git repository. This separates concerns better and lets team members work on different packages independently.

```
plugins/
└── acme/
    ├── blog/          ← Separate Git repo
    └── shop/          ← Separate Git repo
themes/
└── mycompany-theme/   ← Separate Git repo
```

## Installing Packages from Git

Install plugins and themes directly from a Git repository using Composer.

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git
```

Use the `--want` option to specify a branch or version.

```bash
php artisan plugin:install Acme.Blog --from=git@github.com:acme/blog-plugin.git --want=dev-develop
```

Themes work the same way.

```bash
php artisan theme:install acme-starter --from=git@github.com:acme/starter-theme.git
```

::: tip
Use the `--oc` option if the repository name follows the `oc-` prefix convention, for example `oc-blog-plugin`.
:::

## Synchronizing with the Server

With a repository per package, you can pull updates for every Git-managed package at once with the utility command.

```bash
php artisan october:util git pull
```

This command goes through every plugin and theme that is a Git repository and pulls the latest changes from its remote.

For a single package, go to the package directory and use the standard Git commands.

```bash
cd plugins/acme/blog
git pull origin main
```

After pulling changes, run the migrations to apply any database updates.

```bash
php artisan october:migrate
```

## Working with the Backend Editor

The backend CMS editor saves changes directly to the theme files on the server. When you use Git:

- Changes made in the backend editor exist only on the server until they are committed
- Pull these changes to your local environment before you make local edits
- Consider [database themes](../themes/database-themes.md) if several editors need to work at the same time

When content editors use the backend while developers use local files, agree on a clear workflow to avoid conflicts. For example, editors can work on a staging server, with their changes reviewed and merged into the main repository from time to time.

#### See Also

::: also
* [Installing Plugins & Themes](./installing-packages.md)
* [Deployment](./deployment.md)
* [Storing Themes in the Database](../themes/database-themes.md)
:::
