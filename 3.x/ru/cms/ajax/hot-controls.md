---
subtitle: Создавайте наблюдаемые HTML-элементы управления, привязанные к JavaScript.
---
# Горячие элементы управления

October CMS включает простую реализацию [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), где вы можете определять HTML-элементы управления, обнаруживающие добавление или удаление со страницы. Теперь можно инициализировать или деинициализировать элементы управления, добавляемые или удаляемые через [AJAX](./update-partials.md) или [turbo-маршрутизатор](./turbo-router.md).

## Регистрация наблюдаемого элемента управления

::: aside
Эту функцию можно вызывать многократно, и она примет **последнее определение**.
:::

В базовой форме JavaScript-функция `oc.registerControl` используется для определения уникального имени элемента управления (первый аргумент) и определения класса (второй аргумент), который расширяет базовый класс `oc.ControlBase`.

```js
oc.registerControl('hello', class extends oc.ControlBase {
    // ...
});
```

Имя элемента управления используется для привязки к DOM-элементу, представляющему элемент управления, с помощью атрибута `data-control`. Например, элемент управления, зарегистрированный с именем **hello**, отслеживает страницу на предмет любого элемента с атрибутом `data-control="hello"`.

```html
<div data-control="hello"></div>
```

Методы `connect` и `disconnect` внутри определения класса срабатывают при добавлении или удалении элемента управления со страницы. Это может произойти в любой момент, так как наблюдатель непрерывно отслеживает изменения DOM.

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

## Инициализация элемента управления

Метод `init` позволяет загрузить конфигурацию элемента управления по умолчанию и настроить дочерние элементы.

```js
class extends oc.ControlBase {
    init() {
        // Establish the control before running logic
    }
}
```

::: tip
Метод `init` вызывается один раз для элемента управления, а `connect` вызывается каждый раз при добавлении или удалении элемента управления из DOM, например, при перемещении элемента в новое место.
:::

### Конфигурация

Все атрибуты `data-` на элементе управления составляют его доступную конфигурацию.

```html
<div data-control="hello" data-favorite-color="red"></div>
```

Значения конфигурации доступны через свойство `this.config`. Атрибуты data преобразуются в camelCase без префикса `data-`, например, атрибут `data-favorite-color` доступен как `this.config.favoriteColor`.

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

### Дочерние элементы

Любой селектор, будь то CSS или атрибуты данных, может использоваться для выбора дочерних элементов внутри родительского класса элемента управления.

```html
<div data-control="hello">
    <input class="name" disabled />
</div>
```

Родительский элемент управления доступен через `this.element`. Любой дочерний элемент можно выбрать с помощью `querySelector` для одного элемента или `querySelectorAll` для нескольких.

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

## Обращение к другим элементам управления

Функция `oc.fetchControl` возвращает экземпляр элемента управления из существующего элемента. Она принимает строку селектора или непосредственно элемент. Результат поддерживает вызов методов или доступ к свойствам, определённым в классе элемента управления.

```js
const searchControl = oc.fetchControl(element);
```

Вы также можете передать строку селектора вместе с именем элемента управления в качестве второго аргумента (необязательно). Это полезно, когда к одному элементу привязано несколько элементов управления и вам нужно уточнить идентификатор.

```js
const searchControl = oc.fetchControl('[data-control=search]', 'search');
```

Функция `oc.importControl` возвращает зарегистрированный класс элемента управления, что может быть полезно для вызова статических методов класса. Функция принимает идентификатор элемента управления в виде строки.

```js
const searchControlClass = oc.importControl('search');
```

Функция `oc.observeControl` используется для немедленного получения экземпляра элемента управления и привязки его к элементу. Это полезно, когда элемент не имеет атрибута `data-control` и вы хотите привязать элемент управления без ожидания событий наблюдателя.

```js
const searchControl = oc.observeControl(element, 'search');
```

## Работа с событиями

Наблюдаемые элементы управления могут привязывать события локально или глобально. Локальные события отвязываются автоматически, а глобальные необходимо отвязывать вручную с помощью метода `disconnect`.

### Локальные события

Вы можете привязать локальный обработчик событий с помощью функции `listen`, и эти обработчики будут автоматически отвязаны. Для привязки слушателя к самому элементу управления передайте имя события и функцию-обработчик в функцию `listen`.

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

Для привязки локального обработчика к дочернему элементу передайте имя события, CSS-селектор и функцию-обработчик. Свойство `event.delegateTarget` всегда будет содержать элемент, соответствующий CSS-селектору.

```js
class extends oc.ControlBase {
    connect() {
        this.listen('click', '.toolbar-find-button', this.onClickFindButton);
    }

    onClickFindButton(event) {
        console.log('You clicked the find button inside the control: ' + event.delegateTarget.innerText);
    }
}
```

Вы также можете привязаться к DOM-объекту, передав имя события, HTML-элемент и функцию-обработчик.

```js
class extends oc.ControlBase {
    init() {
        this.$name = this.element.querySelector('input.name');
    }

    connect() {
        this.listen('click', this.$name, this.onClickNameInput);
    }

    onClickNameInput() {
        console.log('You clicked the name input inside the control!');
    }
}
```

### Глобальные события

Глобальные события могут быть привязаны и удалены с помощью нативных JavaScript-функций `addEventListener` и `removeEventListener`. Обработчик события (второй аргумент) ссылается на метод класса того же экземпляра элемента управления. Метод `proxy` вызывается для привязки текущего контекста к вызову функции.

```js
class extends oc.ControlBase {
    connect() {
        addEventListener('keydown', this.proxy(this.onKeyDown));
    }

    disconnect() {
        removeEventListener('keydown', this.proxy(this.onKeyDown));
    }

    onKeyDown(event) => {
        if (event.key === 'Escape') {
            // Escape button was pressed
        }
    }
}
```

::: tip
Для предотвращения утечек памяти важно отвязывать глобальные события, чтобы они были собраны сборщиком мусора.
:::

### Отправка событий

Элементы управления могут отправлять события, передавая имя события в функцию `dispatch`. Событие генерируется на DOM-элементе, а имя события получает префикс с именем элемента управления. В следующем примере, если элемент управления зарегистрирован с именем **hello**, событие будет называться **hello:ready**.

```js
oc.registerControl('hello', class extends oc.ControlBase {
    connect() {
        this.dispatch('ready');
    }
});
```

Теперь вы можете слушать подключение элемента управления и получить объект с помощью `oc.fetchControl` на цели события.

```js
addEventListener('hello:ready', function(ev) {
    const helloControl = oc.fetchControl(ev.target);
});
```

Второй аргумент содержит параметры, где можно передать `detail` в событие. Следующие данные доступны через **ev.detail.foo** в слушателе.

```js
this.dispatch('ready', { detail: {
    foo: 'bar'
}});
```

Вы также можете указать другую `target`, где по умолчанию используется привязанный элемент.

```js
this.dispatch('ready', { target: window });
```

Установка `prefix` в false сделает имя события глобальным. Следующий пример генерирует событие с именем **hello-ready** вместо **hello:hello-ready**.

```js
this.dispatch('hello-ready', { prefix: false });
```

## Примеры использования

### Пример на Vanilla JS

Следующий пример демонстрирует базовую HTML-форму с полем ввода имени и кнопкой приветствия. Класс элемента управления инициализирует элементы ввода и вывода, затем слушает событие клика на кнопке Greet. При нажатии кнопки элемент вывода отображает приветствие с введённым именем.

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

### Пример с Google Maps

Следующий пример показывает простую реализацию сторонней JavaScript-библиотеки, такой как Google Maps API. Библиотечный `Map` инициализируется на элементе `div` элемента управления при его появлении на странице. При удалении элемента управления со страницы вызывается `destroy` для экземпляра карты и свойство устанавливается в `null` для предотвращения утечек памяти.

```html
<div data-control="google-map"></div>

<script>
oc.registerControl('google-map', class extends oc.ControlBase {
    connect() {
        this.map = new Map(this.element, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
    }

    disconnect() {
        this.map.destroy();
        this.map = null;
    }
});
</script>
```

### Пример с Vue.js

Следующий пример показывает, как использовать собственную технологию для создания динамических пользовательских интерфейсов, в данном случае [Vue.js](https://vuejs.org/guide/essentials/event-handling.html). Экземпляр Vue, или ViewModel (vm), создаётся и удаляется по необходимости.

```html
<div data-control="my-vue-control">
    <div data-vue-template>
        <button @click="greet">Greet</button>
    </div>
</div>

<script>
oc.registerControl('my-vue-control', class extends oc.ControlBase {
    connect() {
        this.vm = new Vue({
            el: this.element.querySelector('[data-vue-template]'),
            data: {
                name: 'October CMS'
            },
            methods: {
                greet: this.greet
            }
        });
    }

    disconnect() {
        this.vm.$destroy();
    }

    greet(event) {
        alert('Hello ' + this.name + '!')
    }
});
</script>
```

Вы также можете использовать горячие элементы управления для инициализации компонентов Vue с помощью метода `Vue.component`, делая их доступными для ваших элементов управления. Следующий код становится доступным как `<my-vue-component></my-vue-component>` внутри Vue, однако важно, чтобы эти шаблоны были зарегистрированы до того, как будут использованы другими элементами управления.

```html
<div data-control="my-vue-component">
    <button @click="greet">Greet</button>
</div>

<script>
oc.registerControl('my-vue-component', class extends oc.ControlBase {
    init() {
        Vue.component('my-vue-component', {
            template: this.element,
            methods: {
                greet: this.greet
            }
        });
    }

    connect() {
        this.element.style.display = 'none';
    }

    greet(event) {
        alert('Hello!');
    }
});
</script>
```
