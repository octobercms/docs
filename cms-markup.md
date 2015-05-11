# Markup Guide

- [Default variables](#default-variables)
- [Linking to pages and assets](#linking-to-pages-assets)
- [Combining CSS and JavaScript](#combine-css-javascript)
- [Flash messages](#flash-messages)
- [Forms](#forms)
- [Injecting CSS links](#styles-tag)
- [Injecting JavaScript scripts](#scripts-tag)


<a name="default-variables" class="anchor" href="#default-variables"></a>
## Default variables

The `this` variable is always presented in October Twig environment. This variable contains an object with three fields:

Variable  | Description
------------- | -------------
**page** | the current page object.
**layout** | the current layout object.
**theme** | a reference to the [theme customization object](../themes/development#customization).
**param** | an array of URL parameters.
**controller** | the CMS controller.
**environment** | the application environment.



<a name="flash-messages" class="anchor" href="#flash-messages"></a>
## Flash messages



<a name="forms" class="anchor" href="#forms"></a>
## Forms

October provides the `form_open()`, `form_ajax()` and `form_close()` functions that simplify creating the FORM tags. Using the functions is not necessary, but you may find that in many cases using the functions is simpler than listing all required attributes in the standard FORM tag.

<a name="standard-form" class="anchor" href="#standard-form"></a>
### Opening the standard form



<a name="ajax-form" class="anchor" href="#ajax-form"></a>
### Opening the AJAX form


<a name="styles-tag" class="anchor" href="#styles-tag"></a>
## Injecting CSS links



<a name="scripts-tag" class="anchor" href="#scripts-tag"></a>
## Injecting JavaScript scripts

