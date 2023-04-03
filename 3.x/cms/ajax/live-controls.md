---
subtitle: Build robust HTML controls tethered with JavaScript.
---
# Live Controls

October CMS includes a simple implementation of [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), where you can define HTML controls that detect when they are on the page. Now, elements can be introduced (and dismissed) via [AJAX updates](./update-partials.md) or [turbo router](./turbo-router.md) page updates, without needing to worry about initializing their JavaScript code.

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

All `data-` attributes on the control element make up its available configuration.

```html
<div data-control="hello" data-favorite-color="red"></div>
```

Configuration values can be accessed via the `this.config` property. The data attributes are converted from to camelCase, without the `data-` prefix, for example, the `data-favorite-color` attribute is accessed as `this.config.favoriteColor`.

```js
class extends oc.ControlBase {
    init() {
        this.favoriteColor = this.config.favoriteColor || 'green';
    }

    connect() {
        console.log(`Favorite color? ${this.favoriteColor}!`);
    }
}
```

### Child Elements

Child elements can be assigned using any selector, either with CSS or data attributes.

```html
<div data-control="hello">
    <input class="name" disabled />
</div>
```

The parent control element is available via `this.element`. Any child element can be selected with `querySelector` for a single element, or `querySelectorAll` for multiple elements.

```js
class extends oc.ControlBase {
    init() {
        this.$name = this.element.querySelector('input.name');
    }

    connect() {
        this.$name.value = 'Jeff';
        this.$name.disabled = false;
    }
}
```

## Working with Events

Observable controls support binding events either locally or globally. Local events are unbound automatically, whereas global events need to unbind themselves manually via the `disconnect` method.

### Local Events

Local events can bind to elements within the control using the `listen` function, and these events will unbind automatically. When the function takes the event name (first argument) and event handler function (second argument), it will bind the listener to the control element itself.

```js
class extends oc.ControlBase {
    connect() {
        this.listen('dblclick', this.onDoubleClick);
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

    onClickFindButton() {
        console.log('You clicked the find button inside the control!');
    }
}
```

### Global Events

Global events can be attached and removed using the `addEventListener` and `removeEventListener` native JavaScript functions. The event handler (second argument) refers to the class method of the same instance.

```js
class extends oc.ControlBase {
    connect() {
        addEventListener('keydown', this.onKeyDown);
    }

    disconnect() {
        removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = (event) => {
        if (event.key === 'Escape') {
            // Escape button was pressed
        }
    }
}
```

::: tip
To prevent memory leaks, it is important to unbind global events so they are captured by garbage collection.
:::

## Usage Example

The following example has a basic HTML form with a name input and greeting button. The control class initializes the input and output elements and then watches for the click event on the Greet button. When the Greet button is pressed, the output shows a greeting that displays the entered name.

```html
<div data-control="hello-world">
    <input type="text" class="name" />

    <button class="greet">
        Greet
    </button>

    <span class="output">
    </span>
</div>

<script>
oc.registerControl('hello-world', class extends oc.ControlBase {
    init() {
        this.$name = this.element.querySelector('input.name');
        this.$output = this.element.querySelector('span.output');
    }

    connect() {
        this.listen('click', 'button.greet', this.onGreet);
    }

    onGreet() {
        this.$output.textContent = `Hello, ${this.$name.value}!`;
    }
});
</script>
```
