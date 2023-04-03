---
subtitle: Robust, observable and disposable controls defined anywhere using JavaScript.
---
# Building Controls

October CMS includes a simple implementation of [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) that lets you define elements that magically detect when they are added or removed from the page, called observable controls.

## Registering an Observable Control


::: aside
This function is idempotent, so calling it multiple times will take the first seen definition.
:::

In its basic form, the `oc.registerControl` JavaScript function is used to define a unique control name (first argument) and class definition (second argument) that extends the `oc.ControlBase` base class.

```js
oc.registerControl('hello', class extends oc.ControlBase {
    // ...
});
```

The control name is used to link the control on the page using the `data-control` attribute. For example, a control registered with the name **hello** monitors the page for any element with the `data-control="hello"` attribute attached to it.

```html
<div data-control="hello"></div>
```

Inside the class definition, the `connect` and `disconnect` methods are called when the control has been included or removed from the page. This can happen at any time since the observer is always watching for changes.

```js
class extends oc.ControlBase {
    connect() {
        // Element has appeared in DOM
    }

    disconnect() {
        // Element was removed from DOM
    }
}
```

## Initializing a Control

The `init` method establishes the control, including its default configuration and any child elements.

```js
class extends oc.ControlBase {
    init() {
        // Establish the control before running logic
    }
}
```

### Configuration

All data attributes on the element make up its configuration. The data attributes are converted from to camelCase, without the `data-` prefix.

```html
<div data-control="hello" data-favorite-color="red"></div>
```

Configuration values can be accessed via `this.config`. For exmaple, the `data-favorite-color` attribute will be available as `this.config.favoriteColor`.

```js
class extends oc.ControlBase {
    init() {
        this.favoriteColor = this.config.favoriteColor || 'green';
    }

    connect() {
        console.log('Your favorite color is: ' + this.favoriteColor);
    }
}
```

### Child Elements

Child elements can be assigned using any selector, either with CSS or data attributes.

```html
<div data-control="hello">
    <input data-name-input disabled />
</div>
```

The parent control element is available via `this.element` and child elements selected with `querySelector` for a single element, or `querySelectorAll` for multiple elements.

```js
class extends oc.ControlBase {
    init() {
        this.$name = this.element.querySelector('[data-name-input]');
    }

    connect() {
        this.$name.value = 'Jeff';
        this.$name.disabled = false;
    }
}
```

## Working with Events

Observable controls support binding events either globally or locally.

::: tip
To prevent memory leaks, it is important to unbind events so they are captured by garbage collection.
:::

### Global Events

Global events can be attached and removed using the `addEventListener` and `removeEventListener` native JavaScript functions. The event handler (second argument) can refer to a class method to make removal easy.

```js
class extends oc.ControlBase {
    connect() {
        addEventListener('keydown', this.onKeyDown);
    }

    disconnect() {
        removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(event) {
        if (event.key === 'Escape') {
            // Escape button was pressed
        }
    }
}
```

### Local Events

Local events can bind to elements within the control using the `listen` and `forget` functions. When the function takes the event name (first argument) and event handler function (second argument), it will bind the listener to the control element itself.

```js
class extends oc.ControlBase {
    connect() {
        this.listen('dblclick', this.onDoubleClick);
    }

    disconnect() {
        this.forget('dblclick', this.onDoubleClick);
    }

    onDoubleClick() {
        console.log('You double clicked my control!');
    }
}
```

When the function takes a selector (second argument) and an event handler (third argument), it will bind to anything that matches the selector at any time.

```js
class extends oc.ControlBase {
    connect() {
        this.listen('click', '.toolbar-find-button', this.onClickFindButton);
    }

    disconnect() {
        this.forget('click', '.toolbar-find-button', this.onClickFindButton);
    }

    onClickFindButton() {
        console.log('You clicked the find button inside the control!');
    }
}
```
