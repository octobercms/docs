---
subtitle: Виджет формы
shortname: Boxes
---
# Поле Boxes

`boxes` — рендерит редактор блоков для создания визуальных страниц, работает как фронтенд-конструктор страниц.

::: tip
Это поле доступно после установки [плагина Boxes](https://octobercms.com/plugin/offline-boxes) из маркетплейса October CMS. После получения лицензии вы можете установить его следующей командой.

```bash
php artisan plugin:install OFFLINE.Boxes
```
:::

Для отображения Boxes Editor в форме Tailor в панели управления определите поле формы следующим образом:

```yaml
fields:
    boxes_content:
        label: Boxes Content
        span: adaptive  # This makes sure the Boxes Editor looks good in Tailor.
        type: boxes     # This loads the Boxes Editor.
```

На фронтенде вы можете использовать метод render для вашего поля, чтобы получить отрендеренный HTML-контент:

::: cmstemplate
```ini
[section yourSectionVar]
handle = "Your\Handle"
```
```twig
{{ yourSectionVar.boxes_content.render|raw }}
```
:::

#### См. также

::: also
* [Страница плагина Boxes](https://octobercms.com/plugin/offline-boxes)
:::
