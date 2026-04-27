---
subtitle: Связующее звено между разработчиками и издателями.
---
# Сниппеты

Сниппеты — это блоки, вставляемые в [визуальный редактор](../../element/form/widget-richeditor.md) или [редактор Markdown](../../element/form/widget-markdown.md), которые настраиваются с помощью [инспектора](../../element/inspector-types.md). Когда функция доступна, на панели инструментов отображается кнопка вставки сниппетов, и при выборе сниппет вставляется в редактор.

Сниппеты могут быть определены как [фрагменты](./partials.md) или [компоненты](./components.md), что позволяет разработчикам создавать переиспользуемые и настраиваемые блоки контента. Существует множество возможных применений и примеров использования сниппетов:

- Встраивание видео — вывод настроенного видео YouTube или трансляций Twitch.
- Сниппет Google Maps — отображает карту с центром в заданных координатах и предопределённым масштабом. Такой сниппет отлично подходит для страниц с описанием маршрутов.
- Универсальная система комментариев — позволяет посетителям оставлять комментарии на любой странице.
- Интеграции со сторонними сервисами — например, с Yelp или TripAdvisor для отображения дополнительной информации на странице.

При включении сниппетов в содержимое страницы необходимо использовать [Twig-фильтр `|content`](../../markup/tag/content.md) для обработки и отображения сниппетов в составе вывода.

```twig
{{ blog_html|content }}
```

## Создание сниппетов из фрагментов

Сниппеты на основе фрагментов предоставляют упрощённую функциональность и обычно являются контейнерами для HTML-разметки или разметки, сгенерированной с помощью Twig.

Чтобы создать сниппет из фрагмента, откройте фрагмент в редакторе и нажмите кнопку **Snippet**. Здесь вы можете ввести код сниппета, имя и описание в форме фрагмента.

Свойства сниппета являются необязательными и могут быть определены с помощью элемента управления «сетка» в форме настроек фрагмента. Таблица содержит следующие столбцы.

Столбец        | Описание
-------------- | -----------
Property Title | задаёт заголовок свойства, видимый конечному пользователю во всплывающем окне инспектора сниппета.
Code           | задаёт код свойства, используемый для доступа к значениям свойства в разметке фрагмента.
Type           | тип свойства, доступные типы: `string`, `dropdown` и `checkbox`.
Default        | значение свойства по умолчанию, для свойств checkbox используйте значения `0` и `1`.
Options        | список вариантов для свойств типа dropdown (см. ниже).

Любое свойство, определённое в списке свойств, доступно внутри разметки фрагмента как обычная переменная, например:

```twig
The country name is {{ country }}
```

Кроме того, свойства могут быть переданы компонентам фрагмента с помощью [внешних значений свойств](../themes/components.md).

### Определение вариантов

При определении **вариантов** список должен иметь следующий формат: `key:Value | key2:Value`. Ключи представляют внутреннее значение варианта, а значения — строку, которую пользователи видят в выпадающем списке. Символ вертикальной черты разделяет отдельные варианты, например: `us:US | ca:Canada`.

Ключ является необязательным: если он опущен (`US | Canada`), внутреннее значение варианта будет целым числом, начиная с нуля (`0`, `1`, ...). Рекомендуется всегда использовать явные ключи вариантов. Ключи могут содержать только латинские буквы, цифры и символы `-` и `_`.

Также свойство **options** может быть определено как ссылка на статический метод PHP-класса (`Class::method`).

## Создание сниппетов из компонентов

Любой [CMS-компонент](./components.md) может быть зарегистрирован как сниппет с помощью метода `registerPageSnippets` в классе плагина в [файле регистрации](../../extend/system/plugins.md). API для регистрации сниппета аналогичен API [регистрации компонентов](../../extend/cms-components.md). Метод должен возвращать массив с именами классов в ключах и псевдонимами в значениях.

```php
public function registerPageSnippets()
{
    return [
        \RainLab\Weather\Components\Weather::class => 'weather'
    ];
}
```

::: tip
Один и тот же компонент может быть зарегистрирован с помощью `registerPageSnippets` и `registerComponents` для использования на CMS-страницах и в редакторах контента.
:::

Для включения поддержки AJAX-обработчиков сниппеты могут отображаться с использованием [AJAX-фрагмента](../../markup/tag/ajax-partial.md). Для этого установите `snippetAjax` в `true` в [определении класса компонента](../../extend/cms-components.md).

```php
public function componentDetails()
{
    return [
        // ...
        'snippetAjax' => true
    ];
}
```

## Примеры использования

Ниже приведены практические примеры использования сниппетов.

### Просмотр записи Tailor

Следующий сниппет отображает краткое описание записи блога из записи Tailor. Он включает [компонент section](../components/section.md) и устанавливает значение `value` для поиска из свойства сниппета `post_id` с помощью внешних значений свойств.

Издатель задаёт **Blog Post ID** для записи блога, и сниппет выводит ссылку на запись блога в виде элемента-карточки.


::: cmstemplate
```ini
## partials/snippets/blog-post-reference.htm

[viewBag]
snippetCode = "blogPostReference"
snippetName = "Blog Post Reference"
snippetDescription = "Display a reference to a blog post"
snippetProperties[post_id][title] = "Blog Post ID"
snippetProperties[post_id][type] = "string"

[section post]
handle = "Blog\Post"
identifier = "id"
value = "{{ post_id }}"
```
```twig
{% if post is not empty %}
    <div class="card shadow-sm">
        <div class="card-body">
            <h4>{{ post.title }}</h4>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-between align-items-center">
                <a href="{{ 'blog/post'|page({ slug: post.slug }) }}" class="stretched-link">
                    {{ post.categories.first.title|default('') }}
                </a>
                <small class="text-muted">{{ post.published_at_date|date('j M Y') }}</small>
            </div>
        </div>
    </div>
{% else %}
    <!-- Post Missing: Unable to Find an Entry -->
{% endif %}
```
:::

### Встраивание видео YouTube

Следующий сниппет реализует встраивание видео YouTube в виде [CMS-фрагмента](./partials.md). Он включает метод для извлечения кода YouTube из URL-адреса браузера и преобразования строки времени в секунды.

Издатель задаёт значения сниппета **Video URL** и **Start At**, а на выходе формируется стандартный код встраивания YouTube с использованием элемента iframe.

::: cmstemplate
```ini
## partials/snippets/youtube-video.htm

[viewBag]
snippetCode = "youtubeVideo"
snippetName = "YouTube Video"
snippetDescription = "Embed a Youtube Video on the page"
snippetProperties[url][title] = "Video URL"
snippetProperties[url][type] = "string"
snippetProperties[start_at][title] = "Start At"
snippetProperties[start_at][type] = "string"
```
```php
// Converts https://www.youtube.com/watch?v=k_H2zJ7UZfs to k_H2zJ7UZfs
function urlToCode($link = '')
{
    $parts = parse_url($link);
    if (isset($parts['query'])) {
        parse_str($parts['query'], $qs);
        if (isset($qs['v'])){
            return $qs['v'];
        }
        elseif (isset($qs['vi'])){
            return $qs['vi'];
        }
    }
    if (isset($parts['path'])){
        $path = explode('/', trim($parts['path'], '/'));
        return $path[count($path)-1];
    }
    return null;
}

// Converts 15:00 to 900
function timeToSeconds($time = '')
{
    $parts = explode(':', $time);
    if (count($parts) === 3) {
        return $parts[0] * 3600 + $parts[1] * 60 + $parts[2];
    }
    elseif (count($parts) === 2) {
        return $parts[0] * 60 + $parts[1];
    }
    return $time ?: 0;
}
```
```twig
{% if url %}
    <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/{{ this.urlToCode(url) }}?start={{ this.timeToSeconds(start_at) }}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
{% else %}
    <!-- Video URL Missing -->
{% endif %}
```
:::

### Простая контактная форма

Следующий сниппет отображает простую контактную форму и предоставляет возможность обработки логики отправки. Он не включает код для [валидации формы](../features/validation.md) и [отправки электронной почты](../../extend/system/sending-mail.md).

У сниппета нет свойств — издателю достаточно включить виджет на странице, и он выведет контактную форму с сообщением об успешной отправке. Атрибут `snippetAjax` установлен в `1` для включения поддержки AJAX-обработчиков.

::: cmstemplate
```ini
## partials/snippets/contact-form.htm

[viewBag]
snippetCode = "contactForm"
snippetName = "Contact Form"
snippetDescription = "Display a contact form"
snippetAjax = 1
```
```php
function onSubmitContact()
{
    $this['submitted'] = true;
}
```
```twig
{% if not submitted %}
    <h3>Tell us what you think!</h3>
    <form data-request="onSubmitContact" data-request-update="{ _self: true }">
        <div class="row">
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input name="name" type="text" class="form-control">
                    <label>Name</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input name="email" type="email" class="form-control">
                    <label>Email Address</label>
                </div>
            </div>
        </div>
        <div class="mb-3 form-floating">
            <textarea class="form-control h-100"></textarea>
            <label>Message</label>
        </div>
        <div class="form-buttons d-flex pt-2">
            <div>
                <button type="submit" class="btn btn-primary btn-pill">Submit</button>
            </div>
        </div>
    </form>
{% else %}
    <div class="alert alert-success">
        Thanks for contacting us!
    </div>
{% endif %}
```
:::

#### Смотрите также

::: also
* [CMS-фрагменты](./partials.md)
* [Разработка компонентов](../../extend/cms-components.md)
:::
