---
subtitle: Dynamically load content in to a modal window
---
# Modals

Modals can be displayed using the AJAX framework by performing a partial update that targets the modal's content element. When the element has a pending update the `data-ajax-updating` attribute will be attached to it, and this is used to display a loading state while the content loads.

::: tip
In the following examples, we will use the [Modal component](https://getbootstrap.com/docs/5.2/components/modal/) provided by [Bootstrap 5](https://getbootstrap.com).
:::

## Modal Content

The modal content is specified inside the **my-modal-content.htm** partial.

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

## Modal Trigger

The button to trigger the modal is paired with an AJAX request to request the partial and load the contents in to the element with the ID named `siteModalContent`.

```html
<button
    type="button"
    class="btn btn-primary"
    data-request="onAjax"
    data-request-update="my-modal-content: '#siteModalContent'"
    data-bs-toggle="modal"
    data-bs-target="#siteModal">
    Launch demo modal
</button>
```

## Modal Container

The following modal definition is generic and can be added to any page or layout. It contains two `modal-dialog` elements. The first is used as the target for the partial contents, and the second is used to show a loading state while the request loads.

```html
<div class="modal fade" id="siteModal">
    <div class="modal-dialog" id="siteModalContent">
        <!-- Partial Contents Go Here -->
    </div>

    <div class="modal-dialog modal-loading">
        <div class="modal-content">
            <div class="modal-header">
                Loading
            </div>
            <div class="modal-body">
                <p>Please wait...</p>
            </div>
        </div>
    </div>
</div>
```

For the loading status, a stylesheet is used to show the loading dialog during an AJAX request, which is decided by the `data-ajax-updating` attribute. This attribute is added to an element when it is a candidate for a partial update.

```css
.modal-dialog[data-ajax-updating],
.modal-loading {
    display: none;
}

.modal-dialog[data-ajax-updating] + .modal-loading {
    display: block;
}
```

#### See Also

::: also
* [Bootstrap 5 Modals](https://getbootstrap.com/docs/5.2/components/modal/)
:::
