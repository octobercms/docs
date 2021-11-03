# {% scripts %}

Тег `{% scripts %}` добавляет скрипты приложения на страницу и обычно находится перед закрывающимся тегом BODY:

```twig
<body>
    ...
    {% scripts %}
</body>
```

> **Примечание**: Этот тег должен быть определен только один раз.

## Подключение скриптов

Вы можете добавить произвольные скрипты на страницу в [PHP секции](../cms/pages.md#injecting-assets) или в [компоненте](../plugin/components.md#component-assets).

    function onStart()
    {
        $this->addJs('assets/js/app.js');
    }

Также Вы можете использовать [заполнители](../cms/layouts.md#placeholders).

```twig
<body>
    {% put scripts %}
        <script type="text/javascript" src="/themes/demo/assets/js/menu.js"></script>
    {% endput %}
    ...
    {% scripts %}
</body>
```
