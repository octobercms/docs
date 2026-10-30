---
subtitle: Build applications and admin panels using plugins, models and controllers.
shortname: Overview
---
# Backend Development

Backend development builds the application behind a website, or an application with no website at all when October CMS is used as a headless CMS. Everything is built with plugins, which add models, admin pages, permissions and services.

## Where to Start

Read these in order to learn the essentials.

1. [Plugins](./plugins/introduction.md), how a plugin is structured and registered.
1. [Defining Models](./data/models.md), [Model Queries](./data/model-queries.md) and [Relationships](./data/relationships.md), working with data.
1. [Controllers](./panel/controllers.md), adding pages to the admin panel.
1. [Form Controller](./forms/form-controller.md) and [List Controller](./lists/list-controller.md), managing records with forms and lists.
1. [Navigation](./panel/navigation.md) and [Permissions](./panel/permissions.md), adding pages to the menu and controlling access.

## Controller Behaviors

Admin pages get their features from controller behaviors. Each behavior has its own section, so you can focus on one at a time.

Behavior | Use it to
------------- | -------------
[Form Controller](./forms/form-controller.md) | create, update and preview records.
[List Controller](./lists/list-controller.md) | display, search, filter and sort records.
[Relation Controller](./relations/relation-controller.md) | manage related records inside a form.
[Import & Export Controller](./import-export/import-export-controller.md) | import and export records using CSV or JSON files.
[Dash Controller](./dashboards/dash-controller.md) | display reports and charts on a dashboard.

## Going Further

- [Plugin Settings](./settings/introduction.md) and [Dashboards](./dashboards/dash-controller.md) for settings pages and reports.
- [Localization](./localization/introduction.md) for translating the admin panel and model data.
- [Services](./services/events.md) such as events, mail and validation. The [Laravel Services](./services/routing.md) work as they do in Laravel, with examples shown using facades.
- [Relation Types](./data/relation-types.md), [Model Traits](./data/model-traits.md) and [Validation Rules](./services/validation-rules.md) for looking up model definitions.
- The [API Handbook](../handbook/) lists every form field, list column, filter scope and controller option.
