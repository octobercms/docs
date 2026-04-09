---
subtitle: Enhance AI-assisted development with October CMS Boost.
---
# AI Development with Boost

::: aside
October CMS Boost requires [Laravel Boost](https://laravel.com/docs/boost) as a foundation.
:::

October CMS Boost is a Composer package that extends [Laravel Boost](https://laravel.com/docs/boost) with October CMS-specific guidelines, skills, and tools. It teaches AI agents how to write idiomatic October CMS code instead of defaulting to standard Laravel patterns.

While Laravel Boost provides the foundation - database tools, log inspection, and documentation search - October CMS Boost adds the layer that understands plugins, Tailor blueprints, backend controllers, CMS themes, the AJAX framework, and October's model conventions.

## Installation

Install [Laravel Boost](https://laravel.com/docs/boost) followed by October CMS Boost via Composer.

```bash
composer require laravel/boost october/boost --dev
```

Then run the Boost installer to configure your AI agent.

```bash
php artisan boost:install
```

During installation, select **october/boost** when prompted to include third-party guidelines.

The installer automatically configures your AI agent based on what it detects in your environment. For Claude Code, it writes a **CLAUDE.md** file with the compiled guidelines, registers the MCP server in **.mcp.json**, and copies skills to **.claude/skills/**. For other agents, it writes to their equivalent configuration files. No manual wiring is needed - once the installer finishes, your AI agent is ready to use.

## Supported Agents

October CMS Boost works with any AI agent that Laravel Boost supports, including Claude Code, Cursor, GitHub Copilot, Codex, Gemini CLI, and Junie. Refer to the [Laravel Boost documentation](https://laravel.com/docs/boost) for agent-specific setup instructions.

## Using AI with October CMS

Once installed, your AI agent automatically knows about October CMS conventions. You can start asking it to build plugins, create backend pages, design themes, and work with Tailor, and it will follow October CMS patterns instead of defaulting to standard Laravel.

### Try These Prompts

Here are some examples of what you can ask your AI agent to do.

**Creating a plugin from scratch:**
> Create a Blog plugin with Post and Category models. Posts should belong to a category and have a featured image. Add a backend controller with list and form pages.

**Building a theme page:**
> Create a blog listing page that displays the 10 most recent published posts with pagination. Use the default layout.

**Working with Tailor:**
> Create a Tailor blueprint for a FAQ section with question, answer, and sort order fields. Make it a stream type with a primary navigation entry.

**Adding AJAX functionality:**
> Add a "Load More" button to the blog listing that loads the next page of posts via AJAX without refreshing the page.

The AI will use October's conventions automatically - array-based model relationships, the `Validation` trait, YAML-configured backend behaviors, Twig templates, and the `data-request` AJAX framework.

## What Gets Configured

October CMS Boost provides three layers of context to your AI agent.

### Guidelines

Guidelines are loaded automatically and tell the AI the fundamental rules about October CMS. For example, the AI learns to use array-based model relationships instead of Laravel's fluent methods, October's scaffolding commands instead of `php artisan make:model`, and the AJAX framework instead of Livewire or Inertia.

### Skills

Skills are on-demand knowledge modules that activate when the AI recognizes it is working in a specific domain.

Skill | When Activated
------------- | -------------
**Plugin Development** | Creating or modifying plugins, Plugin.php, migrations, version.yaml
**Tailor Development** | Working with Tailor blueprints, content fields, entry records
**Backend Controllers** | Building backend pages with FormController, ListController, or RelationController
**Theme Development** | Creating themes, pages, layouts, partials, Twig templates, CMS components
**AJAX Framework** | Using data-request attributes, the jax API, AJAX handlers, partial updates
**Model Development** | Defining models, array relationships, validation, traits, model events

### MCP Tools

MCP (Model Context Protocol) tools give the AI real-time access to your application. The AI can inspect your actual Tailor blueprints, installed plugins, and theme structure instead of guessing.

Tool | Purpose
------------- | -------------
**GetBlueprints** | List and inspect Tailor blueprint definitions
**GetPluginRegistration** | List installed plugins with their components, permissions, and navigation
**GetThemeStructure** | Inspect the active theme's pages, layouts, and partials

MCP tools are registered automatically when the package is installed - no manual configuration needed.

## Keeping Boost Updated

Run the update command after updating your Composer dependencies to ensure Boost guidelines and skills stay current.

```bash
php artisan boost:update
```

You can automate this by adding the command to your `composer.json` scripts.

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
:::
