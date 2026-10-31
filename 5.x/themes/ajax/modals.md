---
previousPath: cms/features/modals.md
subtitle: Load partial content into a modal window with an AJAX request.
---
# Modals

To show AJAX content in a modal window, perform a partial update that targets the modal's content element. While the update is pending, the framework adds the `data-ajax-updating` attribute to the element, which you can use to show a loading state.

::: tip
The following examples use the [Modal component](https://getbootstrap.com/docs/5.2/components/modal/) provided by [Bootstrap 5](https://getbootstrap.com).
:::

## Opening a Modal with AJAX Content

The button that opens the modal also sends an AJAX request. It asks for the **my-modal-content** partial and loads it into the element with the ID `siteModalContent`.

```html
<button
    type="button"
    class="btn btn-primary"
    data-request="onAjax"
    data-request-update="{ 'my-modal-content': '#siteModalContent' }"
    data-bs-toggle="modal"
    data-bs-target="#siteModal">
    Launch demo modal
</button>
```

## Writing the Modal Content

Place the modal content inside the **my-modal-content.htm** partial.

```html
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title">
            Modal Title
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <div class="modal-body">
        <p>Modal body text goes here.</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
        </button>
        <button type="button" class="btn btn-primary">
            Save changes
        </button>
    </div>
</div>
```

## Adding the Modal Container

The following modal definition is generic, so you can add it to any page or layout. It contains two `modal-dialog` elements. The first is the target container for the partial contents. The second shows a loading state while the request runs.

```html
<div class="modal" id="siteModal">
    <div class="modal-dialog modal-dialog-centered" id="siteModalContent">
        <!-- Partial Contents Will Go Here -->
    </div>

    <div class="modal-dialog modal-dialog-centered modal-loading">
        <div class="spinner-border text-light mx-auto"></div>
    </div>
</div>
```

## Showing a Loading State

A stylesheet shows the loading dialog during the AJAX request, based on the `data-ajax-updating` attribute. The framework adds this attribute to an element while a request that will update it is pending.

```css
.modal-dialog[data-ajax-updating],
.modal-dialog:not([data-ajax-updating]) + .modal-loading {
    display: none;
}
```

#### See Also

::: also
* [Bootstrap 5 Modals](https://getbootstrap.com/docs/5.2/components/modal/)
* [Updating Partials](./update-partials.md)
* [Loading Indicators](./loaders.md)
:::
