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