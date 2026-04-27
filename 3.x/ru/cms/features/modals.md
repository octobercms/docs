---
subtitle: Динамическая загрузка содержимого в модальное окно.
---
# Модальные окна

Модальные окна могут быть отображены с помощью AJAX-фреймворка путём обновления фрагмента, нацеленного на элемент содержимого модального окна. Когда у элемента есть ожидающее обновление, к нему добавляется атрибут `data-ajax-updating`, который используется для отображения состояния загрузки при загрузке содержимого.

::: tip
В следующих примерах мы будем использовать [компонент Modal](https://getbootstrap.com/docs/5.2/components/modal/) из [Bootstrap 5](https://getbootstrap.com).
:::

## Содержимое модального окна

Содержимое модального окна указывается внутри фрагмента **my-modal-content.htm**.

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

## Кнопка вызова модального окна

Кнопка для вызова модального окна связана с AJAX-запросом для получения фрагмента и загрузки содержимого в элемент с ID `siteModalContent`.

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

## Контейнер модального окна

Следующее определение модального окна является универсальным и может быть добавлено на любую страницу или макет. Оно содержит два элемента `modal-dialog`. Первый используется как целевой контейнер для содержимого фрагмента, а второй — для отображения состояния загрузки во время загрузки запроса.

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

Для отображения состояния загрузки используется таблица стилей, которая показывает диалог загрузки во время AJAX-запроса на основе атрибута `data-ajax-updating`. Этот атрибут добавляется к элементу, когда он является кандидатом на обновление фрагмента и запрос ожидает выполнения.

```css
.modal-dialog[data-ajax-updating],
.modal-dialog:not([data-ajax-updating]) + .modal-loading {
    display: none;
}
```

#### См. также

::: also
* [Модальные окна Bootstrap 5](https://getbootstrap.com/docs/5.2/components/modal/)
:::
