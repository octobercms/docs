# {% styles %}


Тег `{% styles %}` добавляет стили приложения на страницу и обычно находится перед закрывающимся тегом HEAD на странице или в шаблоне:

    <head>
        ...
        {% styles %}
    </head>

> **Примечание**: Этот тег должен быть определен только один раз.

## Подключение стилей

Вы можете добавить произвольные стили на страницу в [PHP секции](./cms-pages#injecting-assets) или в [компоненте](./plugin-components#component-assets).

    function onStart()
    {
        $this->addCss('assets/css/hello.css');
    }

Также Вы можете использовать [заполнители](./cms-layouts#placeholders).

    <head>
        ...
        {% styles %}
    </head>
    {% put styles %}
        <link href="/themes/demo/assets/css/page.css" rel="stylesheet" />
    {% endput %}
