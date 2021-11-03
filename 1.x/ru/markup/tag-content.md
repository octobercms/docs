# {% content %}

Тег `{% content %}` отображает [блок с содержимым](./cms/content.md) на странице. Для этого Вы должны указать название файла в качестве параметра:

    {% content "contacts.htm" %}

Вы также можете указать название папки, в котором лежит файл:

    {% content "sidebar/content.htm" %}

> **Примечание**: В разделе [Темы ( Themes )](./cms/themes.md#subdirectories) Вы сможете найти больше информации о работе с подпапками.

Вы можете отобразить содержимое как простой текст:

    {% content "readme.txt" %}

или как Markdown:

    {% content "changelog.md" %}

Также блоки с содержимым могут быть использованы вместе с [плейсхолдерами шаблонов](./cms/layouts.md#placeholders):

    {% put sidebar %}
        {% content 'sidebar-content.htm' %}
    {% endput %}

<a name="variables"></a>
## Переменные

Вы можете передавать параметры в блоки с содержимым, указав их после названия файла:

    {% content "welcome.htm" name=user.name %}

Вы также можете указать произвольные переменные:

    {% content "location.htm" city="Vancouver" country="Canada" %}

Пример:

    <p>Country: {country}, city: {city}.</p>

Кроме того, Вы можете передавать коллекцию переменных:

    {% content "welcome.htm" likes=[
        {name:'Dogs'},
        {name:'Fishing'},
        {name:'Golf'}
    ] %}

Пример:

    <ul>
        {likes}
            <li>{name}</li>
        {/likes}
    </ul>

> **Примечание**: Twig синтаксис не поддерживается в блоках с содержимым.
