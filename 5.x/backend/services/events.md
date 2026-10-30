---
previousPath: extend/services/event.md
subtitle: Fire and listen to events.
---
# Events

::: tip
This page is a stub. Its content comes from the 4.x [Event](/4.x/extend/services/event.html) article.
:::

## Commonly Used Events

The following events are the ones most often used to extend October CMS.

Event | Description
------------- | -------------
`backend.form.extendFields` | called after the form fields are defined.
`backend.list.extendColumns` | modify the columns of a list.
`backend.list.extendQuery` | modify the query after the list has applied its scopes, before the records are fetched.
`backend.filter.extendScopes` | interact with the filter and its scopes after they have been initialized.
`backend.menu.extendItems` | manipulate the backend navigation.
`backend.page.beforeDisplay` | override the content of a backend page.
`cms.page.init` | return a custom response before the AJAX handlers of a page run.
`cms.page.beforeDisplay` | swap the page that gets displayed for the URL.
`cms.page.display` | modify the response after the page for the URL has been processed.
`cms.router.beforeRoute` | fires before the CMS router handles a route.
`model.beforeSave` | called before the model is created or updated.
`model.afterSave` | called after the model is created or updated.
`model.beforeDelete` | called before the model is deleted.
`model.beforeValidate` | called before the model is validated.
`mailer.beforeSend` | fires before the mailer sends a message.
`system.extendConfigFile` | modify the contents of a configuration file.
`site.changed` | fires when the active site has changed.
