---
previousPath: resources/ai-boost.md
subtitle: Teach AI coding agents to write idiomatic October CMS code with October CMS Boost.
---
# AI Development with Boost

October CMS Boost is a Composer package that extends [Laravel Boost](https://laravel.com/docs/boost) with October CMS guidelines, skills and tools. It teaches AI agents to write idiomatic October CMS code instead of defaulting to standard Laravel patterns.

```bash
composer require october/boost --dev
php artisan boost:install
```

Laravel Boost provides the foundation, such as database tools, log inspection and documentation search. October CMS Boost adds the layer that understands plugins, Tailor blueprints, backend controllers, CMS themes, the AJAX framework and October's model conventions.

## Installing Boost

::: aside
October CMS Boost requires [Laravel Boost](https://laravel.com/docs/boost) as a foundation.
:::

Install the package as a dev dependency.

```bash
composer require october/boost --dev
```

Then run the Boost installer to configure your AI agent.

```bash
php artisan boost:install
```

When the installer asks whether to include third-party guidelines, select **october/boost**.

The installer configures your AI agent based on what it detects in your environment. For Claude Code, it writes a **CLAUDE.md** file with the compiled guidelines, registers the MCP server in **.mcp.json**, and copies the skills to **.claude/skills/**. For other agents, it writes to their equivalent configuration files. No manual wiring is needed: your AI agent is ready when the installer finishes.

### Supported Agents

October CMS Boost works with any AI agent that Laravel Boost supports, including Claude Code, Cursor, GitHub Copilot, Codex, Gemini CLI and Junie. See the [Laravel Boost documentation](https://laravel.com/docs/boost) for agent-specific setup instructions.

## Building with an AI Agent

Once Boost is installed, your AI agent knows the October CMS conventions. Ask it to build plugins, create backend pages, design themes and work with Tailor, and it follows October CMS patterns instead of standard Laravel ones.

### Example Prompts

Here are some examples of what you can ask your AI agent to do.

**Creating a plugin from scratch:**
> Create a Blog plugin with Post and Category models. Posts should belong to a category and have a featured image. Add a backend controller with list and form pages.

**Building a theme page:**
> Create a blog listing page that displays the 10 most recent published posts with pagination. Use the default layout.

**Working with Tailor:**
> Create a Tailor blueprint for a FAQ section with question, answer, and sort order fields. Make it a stream type with a primary navigation entry.

**Adding AJAX functionality:**
> Add a "Load More" button to the blog listing that loads the next page of posts via AJAX without refreshing the page.

The AI uses October's conventions automatically: array-based model relationships, the `Validation` trait, YAML-configured backend behaviors, Twig templates and the `data-request` AJAX framework.

## What Boost Adds

October CMS Boost gives your AI agent three layers of context.

### Guidelines

A core guideline file is loaded into every AI conversation. It covers:

- Critical differences from Laravel (don't suggest Livewire, Inertia, Blade, etc.)
- Architecture overview (plugins, themes, backend, Tailor, AJAX)
- Model conventions (array-based relationships, Validation trait)
- Event system and settings model patterns
- Artisan commands and naming conventions

### Skills

Skills are on-demand knowledge modules that an AI agent activates when it works in a specific area.

Skill | Covers
------------- | -------------
`octobercms-plugin-development` | Plugin.php, registration, migrations, settings models, events, console commands, localization, mail templates
`octobercms-tailor-development` | Blueprints, content fields, entry records, multisite, navigation, columns
`octobercms-backend-controllers` | Form/List/Relation/Import-Export/Reorder controllers, behavior overrides, filter scopes, YAML configs
`octobercms-theme-development` | Pages, layouts, partials, Twig, components, theme.yaml customization, error pages, asset compilation
`octobercms-ajax-framework` | Data attributes, jax API, handlers, partial updates, file uploads, validation, turbo router
`octobercms-model-development` | Relationships, validation, traits, events, accessors/mutators, deferred bindings, eager loading, extending models

### MCP Tools

MCP (Model Context Protocol) tools give the AI real-time access to your application. The AI can inspect your actual Tailor blueprints, installed plugins and theme structure instead of guessing.

Tool | Purpose
------------- | -------------
**SearchOctoberDocs** | Search official documentation for Laravel, October CMS, Larajax, and Meloncart from their GitHub-hosted repos
**GetBlueprints** | List and inspect Tailor blueprint definitions and fields
**GetPluginRegistration** | List installed plugins with their components, permissions, and navigation
**GetThemeStructure** | Inspect the active theme's pages, layouts, partials, and content files

The MCP tools register automatically when you install the package. No manual configuration is needed.

## Keeping Boost Updated

Run the update command after you update your Composer dependencies, so the Boost guidelines and skills stay current.

```bash
php artisan boost:update
```

To automate this, add the command to the scripts in your `composer.json` file.

```json
"scripts": {
    "post-update-cmd": [
        "@php artisan boost:update --ansi"
    ]
}
```

#### See Also

::: also
* [Laravel Boost Documentation](https://laravel.com/docs/boost)
* [Console Commands](./console-commands.md)
:::
