# Marketplace

- [Adding plugins to your projects](#adding-plugins)
- [Marketplace for authors](#for-authors)
- [Suggestions for plugin authors](#for-plugin-authors)

October Marketplace is a great source of [October plugins](/plugins) and themes (coming soon!). The Marketplace allows authors to share their work, be creative and for those interested, to produce an income. This article explains the technical principles of the Marketplace and we strongly recommend that you to read the [Marketplaces Terms](/terms/marketplace-terms) and the [Author Terms](/terms/author-terms).

<a name="adding-plugins" class="anchor" href="#adding-plugins"></a>
## Adding plugins to your projects

Before you can add a plugin to a project, you should have a project. You can create a new project right from the Add Plugin popup window. Please read the [Projects documentation](/docs/help/projects) for information about projects and why they are needed. Free plugins are added to projects immediately. When you add a paid plugin, you're first redirected to the PayPal Payment page. After the successful payment the plugin is added to the project in the background. It could take a couple of minutes, until October gets a notification from PayPal. October will notify you by email when a paid plugin is added.

After adding a plugin you should update your October installation in order to download the plugin. You can update October from the **System / Updates** page.

<a name="for-authors" class="anchor" href="#for-authors"></a>
## Marketplace for authors

Any October user can become an author. You only need to [sign up](/account/register) for a free account and register on the [Author Registration Page](/account/author/register). The technical aspects of becoming an author are explained on the registration page. Please also read the [Author Terms](/terms/author-terms) for the legal information.

<a name="managing-plugins" class="anchor" href="#managing-plugins"></a>
### Managing plugins

You can manage your plugins on the [Author page](/account/author) in the Account area. When you create a new plugin you should upload the plugin ZIP archive, specify the archive file URL or specify the Git address and branch. New plugins have the **Draft** status. Draft plugins are not displayed on the Marketplace, but you can edit the plugin description, upload the icon, add the documentation and assign categories.

When you are ready to publish a plugin, click the **Submit for approval** menu item in the sidebar. We review all plugins before they can be published. On the Submit for approval page provide the plugin archive, its URL or Git URL. You will get a notification when the plugin is published or rejected.

It is possible to hide published plugins. Click the **Hide** menu item on the sidebar of the Plugin Details page to hide a published plugin. This item is available only for published plugins. To show the plugin again click the **Unhide** menu item. Unhiding a plugin doesn't require the approval.

The **Manage updates** menu item allows to update a plugin on the Marketplace. Note that if you're updating a plugin you should increase its version number in the [Plugin version file](/docs/plugin/registration#migrations-version-history), otherwise existing plugin installations won't know that it was updated.


<a name="for-plugin-authors" class="anchor" href="#for-plugin-authors"></a>
##Suggestions for Marketplace plugin authors

The Marketplace grows quickly and you want your plugins to be noticeable and people to use them. There are a few simple ways that could help you to achieve this goal.

<a name="plugin-icons" class="anchor" href="#plugin-icons"></a>
### Use quality icons

Good plugins require good icons. The plugin icon is the first thing the Marketplace users notice when they browse the plugin list. Quality, bright and recognizable icons draw attention. If you develop an plugin that integrates a known service, like Twitter, FaceBook, LinkedIn, don't hesitate to use the brand icons. For non-integration plugins find free or buy a quality icon that expresses the plugin purpose. There are many service where you can buy nice icons, for example the [Noun Project](http://thenounproject.com/). 

<a name="plugin-descriptions" class="anchor" href="#plugin-descriptions"></a>
### Write good descriptions 

The Create/Edit Plugin form has three text fields: Description, Content and Documentation. The Description text is displayed in the plugin list and it is very important. The description should briefly but precisely express the plugin functionality. 

The Content field is displayed on the Plugin Details page. Users make the decision to use a plugin after reading the Content. The contents of this field should tell the users what exactly the plugin does, what functions it includes, how to use it for end users and how to configure the plugin. The Content shouldn't describe much about the programming part of the plugin. It's a rule of thumb: the Content field is for end users, the Documentation is for developers.

In the Documentation field describe as much as you can about using the plugin as a developer. Explain what components the plugin includes, which properties the components have, what variables plugins inject to pages and so on. Remember - the more details you provide in the Documentation, the fewer questions will have you users. Also, quality documentation is always a sign of a good product!

<a name="plugin-screenshots" class="anchor" href="#plugin-screenshots"></a>
### Provide quality screenshots

Screenshots are very important. Sometimes a single glance is enough to understand what a software product does and what the final result looks like. Take screenshots of your plugins and their components in the back-end user interface. Style front-end pages before taking screenshots. Use known CSS frameworks for the demo front-end pages - they are recognizable and this could save you time.