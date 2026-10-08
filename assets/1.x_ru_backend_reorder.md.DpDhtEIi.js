import{_ as n,r,o as d,c as l,e as t,a as s,s as c}from"./chunks/framework.CXcwiNg-.js";const u=JSON.parse('{"title":"Сортировка - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Настройка сортировки","slug":"настроика-сортировки","link":"#настроика-сортировки","children":[]},{"level":2,"title":"Отображение страницы с сортировкой","slug":"отображение-страницы-с-сортировкои","link":"#отображение-страницы-с-сортировкои","children":[]}],"relativePath":"1.x/ru/backend/reorder.md","filePath":"1.x/ru/backend/reorder.md"}'),i={name:"1.x/ru/backend/reorder.md"};function p(h,e,m,g,b,_){const o=r("pre-heading"),a=r("post-heading");return d(),l("div",null,[t(o),e[0]||(e[0]=s("h1",null,"Сортировка",-1)),t(a),e[1]||(e[1]=c(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p><strong>Сортировка</strong> - модификатор контроллера, используемый для сортировки и переупорядочивания записей. Действие контроллера <code>reorder()</code> отображает список с записями, которые можно перетаскивать.</p><p>Вид списка зависит от <a href="./../database/model.html">класса модели</a>, который должен имплементировать один из следующих <a href="./../database/traits.html">трейтов</a>:</p><ol><li><code>October\\Rain\\Database\\Traits\\Sortable</code></li><li><code>October\\Rain\\Database\\Traits\\NestedTree</code></li></ol><p>Вы должны добавить один из трейтов в свойство <code>$implement</code> класса контроллера для того, чтобы использовать сортировку. Также свойство <code>$reorderConfig</code> должно содержать ссылку на YAML файл с настройками.</p><pre><code>namespace Acme\\Shop\\Controllers;

class Categories extends Controller
{
    public $implement = [
        &#39;Backend.Behaviors.ReorderController&#39;,
    ];

    public $reorderConfig = &#39;config_reorder.yaml&#39;;

    // [...]
}
</code></pre><p><a name="configuring-reorder" class="anchor"></a></p><h2 id="настроика-сортировки"><a href="#настроика-сортировки" class="header-anchor">#</a> Настройка сортировки</h2><p>Файл с настройками сортировки, указанный в свойстве <code>$reorderConfig</code>, должен быть в формате YAML и находиться в папке с <a href="./../backend/controllers-views-ajax/.html#introduction">представлениями контроллера</a>. Пример:</p><pre><code># ===================================
#  Reorder Behavior Config
# ===================================

# Reorder Title
title: Reorder Categories

# Attribute name
nameFrom: title

# Model Class name
modelClass: Acme\\Shop\\Models\\Category

# Toolbar widget configuration
toolbar:
    # Partial for toolbar buttons
    buttons: reorder_toolbar
</code></pre><p>Вы можете использовать следующие параметры:</p><div class="table"><table tabindex="0"><thead><tr><th>Параметр</th><th>Описание</th></tr></thead><tbody><tr><td><strong>title</strong></td><td>название страницы.</td></tr><tr><td><strong>nameFrom</strong></td><td>определяет какой атрибут должен использоваться в качестве метки для каждой записи.</td></tr><tr><td><strong>modelClass</strong></td><td>имя класса модели откуда будут загружаться записи.</td></tr><tr><td><strong>toolbar</strong></td><td>ссылка на файл с настройками панели инструментов, или массив с настройками.</td></tr></tbody></table></div><p><a name="reorder-display" class="anchor"></a></p><h2 id="отображение-страницы-с-сортировкои"><a href="#отображение-страницы-с-сортировкои" class="header-anchor">#</a> Отображение страницы с сортировкой</h2><p>Вы должны создать <a href="./../backend/controllers-views-ajax/.html#introduction">файл</a> с названием <strong>reorder.htm</strong>. Это представление - страница, где пользователи смогут сортировать записи. Файл должен содержать только вызов метода <code>reorderRender()</code>.</p><pre><code>&lt;?= $this-&gt;reorderRender() ?&gt;
</code></pre>`,17))])}const C=n(i,[["render",p]]);export{u as __pageData,C as default};
