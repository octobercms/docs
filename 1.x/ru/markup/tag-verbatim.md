# {% verbatim %}

Тег `{% verbatim %}` позволяет отобразить содержимое блока "как есть". Пример:

    <p>Hello {{ name }}, this is parsed by Twig</p>

    {% verbatim %}
        <p>Hello {{ name }}, this is parsed by AngularJS</p>
    {% endverbatim %}

Результат:

    Hello Alex, this is parsed by Twig

    <p>Hello, {{ name }}</p>

> **Примечание**: Этот тег полезно использовать, например, при работе с AngularJS (т.к. он использует схожий синтаксис).
