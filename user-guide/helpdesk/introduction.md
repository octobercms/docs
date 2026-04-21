---
subtitle: Build a helpdesk ticket system with October CMS using the Responsiv Support plugin.
---
# Creating a Helpdesk

In this tutorial, you will build a helpdesk ticket system where registered users can submit support requests and your team can respond from the backend. The system includes ticket types, file attachments, a conversation thread, and automated email notifications, all powered by the Responsiv Support plugin.

## What You Will Build

You will create a helpdesk powered by two plugins: RainLab.User for authentication and Responsiv.Support for the ticketing system. The finished helpdesk includes:

- **A ticket list page** where users see their submitted tickets and their current status
- **A submission form** for creating new tickets with type selection, Markdown content, and file attachments
- **A ticket detail page** with a conversation thread showing user and staff messages
- **A message editing page** for updating posted tickets and replies
- **Backend management** where support staff respond to tickets, add internal notes, and assign tickets

## Premium Plugins

Responsiv.Support is a premium plugin available from the [October CMS Marketplace](http://octobercms.com/plugin/responsiv-support). Premium plugins work exactly like free plugins: you install them the same way and use their components identically. The only difference is that premium plugins require a license to install.

## Prerequisites

Before starting, you should have:

- October CMS installed and running
- A theme with a default layout that includes Tailwind CSS
- User authentication set up with RainLab.User, including the session component on your layout and login/registration pages

If you need to set up user authentication, work through [Part 1 of the Forum tutorial](../forum/installing-the-user-plugin.md) first. It covers installing RainLab.User, configuring the session component, and building login, registration, and password reset pages.

## Overview

1. [Installing the Plugin](./installing-the-plugin.md): install Responsiv.Support and configure ticket types
2. [Ticket List](./ticket-list.md): create the ticket list page for browsing submitted tickets
3. [Submit Ticket](./submit-ticket.md): build the ticket submission form
4. [Ticket Page](./ticket-page.md): display ticket details with a conversation thread and reply form
5. [Editing Messages](./editing-messages.md): allow users to edit their submitted tickets and messages

## Next Steps

Continue to [Installing the Plugin](./installing-the-plugin.md) to get started.
