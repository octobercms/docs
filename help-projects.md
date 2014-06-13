# Projects

- [Introduction](#introduction)
- [How to find the project ID](#project-id)
- [Setting a project during the installation](#installation-project)
- [Attaching a project to an existing installation](#existing-project)

October projects allow you to group plugins and themes and simplify the development and deployment process across multiple servers.

<a name="introduction" class="anchor" href="#introduction"></a>
## Introduction

Projects are required if you want to use any [Marketplace plugins](/plugins). You can create a project on the [Projects page](/account/projects) in the Account area or from the **Add to Project** popup window on a Marketplace plugin page. When you have a project you can add plugins to it. The plugins you add to your projects are installed automatically when you update your October installation.

Projects are very useful if you have multiple copies of a same website, for example - several development installation, a staging copy and the production copy. All these installations can be bound to a same project. When you add a plugin to a project on the [October website](/) all your installations will download the plugin as soon as you update them. This reduces the maintenance overhead.

<a name="project-id" class="anchor" href="#project-id"></a>
## How to find the project ID

The project identifier is required if you want to bind a new or existing October installation to a project. After you create a project you can find its identifier on the project details page in the [Account section](/account/projects). A typical project ID looks like this: **2ZF0kAl0lAmN3BJEuZzHlBTIzZzAvLzLkLJWvL2SzZTDlLGHkAD**.

<a name="installation-project" class="anchor" href="#installation-project"></a>
## Setting a project during the installation

You can bind October copy to an existing product during the installation. The Installer has a form field that lets you to specify the [project identifier](#project-id). All plugins bound to the project will be installed automatically.

<a name="existing-project" class="anchor" href="#existing-project"></a>
## Attaching a project to an existing installation

It's possible to bind an existing October installation to a project. Open the **System / Updates** page in the October back-end and click the **Attach to project** link in the page header. Enter the [project identifier](#project-id) to the popup form. After binding the project October will install all the project plugins.
