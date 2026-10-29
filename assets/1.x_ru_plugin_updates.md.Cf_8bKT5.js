import{_ as p,r as t,o as i,c,e as s,a as e,s as l,d as n}from"./chunks/framework.CXcwiNg-.js";const b=JSON.parse('{"title":"Версионирование - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Введение","slug":"введение","link":"#введение","children":[]},{"level":2,"title":"Процесс обновления","slug":"процесс-обновления","link":"#процесс-обновления","children":[{"level":3,"title":"Зависимости плагинов","slug":"зависимости-плагинов","link":"#зависимости-плагинов","children":[]}]},{"level":2,"title":"Файл с версиями плагина","slug":"фаил-с-версиями-плагина","link":"#фаил-с-версиями-плагина","children":[{"level":3,"title":"Важные обновления","slug":"важные-обновления","link":"#важные-обновления","children":[]},{"level":3,"title":"Миграции и начальные данные","slug":"миграции-и-начальные-данные","link":"#миграции-и-начальные-данные","children":[]}]}],"relativePath":"1.x/ru/plugin/updates.md","filePath":"1.x/ru/plugin/updates.md"}'),d={name:"1.x/ru/plugin/updates.md"};function h(m,a,u,_,g,f){const r=t("pre-heading"),o=t("post-heading");return i(),c("div",null,[s(r),a[0]||(a[0]=e("h1",null,"Версионирование",-1)),s(o),a[1]||(a[1]=l(`<p><a name="introduction" class="anchor"></a></p><h2 id="введение"><a href="#введение" class="header-anchor">#</a> Введение</h2><p>Одним из важных процессов при разработке плагина является журналирование изменений или улучшений кода.</p><p>Список изменений содержится в YAML файле, который называется <code>version.yaml</code>, и находится в плагине в папке <strong>/updates</strong>. Там же располагаются файлы с миграциями и начальными данными. Пример структуры плагина:</p><pre><code>plugins/
  author/
    myplugin/
      updates/                      &lt;=== Папка с обновлениями
        version.yaml                &lt;=== Файл с версиями
        create_tables.php           &lt;=== Скрипт БД
        seed_the_database.php       &lt;=== Файл миграции
        create_another_table.php    &lt;=== Файл миграции
</code></pre><p><a name="update-process" class="anchor"></a></p><h2 id="процесс-обновления"><a href="#процесс-обновления" class="header-anchor">#</a> Процесс обновления</h2><p>Во время обновления система уведомит пользователя о последних изменениях плагинов, а также сообщит им о <a href="#important-updates">важных или нарушающих изменениях</a>. Любой заданный файл с начальными данными или миграции будет вызываться только один раз после успешного обновления. Октябрь автоматически выполняет процесс обновления при возникновении любого из следующих событий:</p><ol><li>Когда администратор авторизовался.</li><li>Когда администратор нажал на кнопку &quot;Обновить&quot;.</li><li>Когда была вызвана <a href="./../console/commands.html#console-up-command">консольная команда</a> <code>php artisan october:up</code>.</li></ol><p><a name="plugin-depedencies" class="anchor"></a></p><h3 id="зависимости-плагинов"><a href="#зависимости-плагинов" class="header-anchor">#</a> Зависимости плагинов</h3><p>Обновления применяются в определенном порядке на основе <a href="./../files/registration.html#dependency-definition">определенных зависимостей в файле регистрации плагина</a>. Подключаемые модули не будут обновляться до тех пор, пока не будут обновлены все их зависимости.</p><pre><code>&lt;?php namespace Acme\\Blog;

class Plugin extends \\System\\Classes\\PluginBase
{
    public $require = [&#39;Acme.User&#39;];
}
</code></pre><p>В приведенном выше примере плагин <strong>Acme.Blog</strong> не будет обновляться до тех пор, пока плагин <strong>Acme.User</strong> не будет полностью обновлен.</p><p><a name="version-file" class="anchor"></a></p><h2 id="фаил-с-версиями-плагина"><a href="#фаил-с-версиями-плагина" class="header-anchor">#</a> Файл с версиями плагина</h2>`,16)),a[2]||(a[2]=e("p",null,[n("Файл "),e("strong",null,"version.yaml"),n(" содержит версии плагина и комментарии к ним, а также ссылки на скрипты базы данных в определенном порядке. Прочтите статью "),e("a",{href:"./../database/structure.html"},"Структура базы данных"),n(" для получения информации о файлах миграции. Этот файл нужен для публикации плагина в "),e("a",{href:"http://octobercms.com/help/site/marketplace",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[n("Marketplace"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),n(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),n(),e("span",{class:"sr-only"},"(opens new window)")])]),n(". Пример:")],-1)),a[3]||(a[3]=l(`<pre><code>1.0.1: First version
1.0.2: Second version
1.0.3: Third version
1.1.0: !!! Important update
1.1.1:
    - Update with a migration and seed
    - create_tables.php
    - seed_the_database.php
</code></pre><p>Как вы можете видеть выше, сначала указывается ключ, который определяет номер версии, далее следует сообщение об обновлении, которое представляет собой либо строку, либо массив, содержащий сообщение об обновлении. В обновлениях, которые содержат файлы с начальными данными или миграции, первая строка всегда представляет собой комментарий, затем последующие строки являются именами файлов сценариев.</p><p><a name="important-updates" class="anchor"></a></p><h3 id="важные-обновления"><a href="#важные-обновления" class="header-anchor">#</a> Важные обновления</h3><p>Иногда изменения в плагине могут нарушить работу сайта, на котором он был установлен. Если комментарий в файле <strong>version.yaml</strong> начинается с трех восклицательных знаков (<code>!!!</code>), тогда он будет считаться <em>Важным</em> и потребует от пользователя подтверждения перед обновлением. Пример важного комментария к обновлению:</p><pre><code>1.1.0: !!! This is an important update that contains breaking changes.
</code></pre><p>Когда система обнаружит важное обновление, она предложит три варианта:</p><ol><li>Подтвердить обновление</li><li>Пропустить обновление (только один раз)</li><li>Пропустить обновление (всегда)</li></ol><p><a name="migration-seed-files" class="anchor"></a></p><h3 id="миграции-и-начальные-данные"><a href="#миграции-и-начальные-данные" class="header-anchor">#</a> Миграции и начальные данные</h3><p>Как описано выше, обновления могут содержать информацию о том, когда и в каком порядке должны применяться <a href="./../database/structure.html">файлы с начальными данными и миграции</a>. Пример:</p><pre><code>1.1.1:
    - This update will execute the two scripts below.
    - some_upgrade_file.php
    - some_seeding_file.php
</code></pre><p>Используйте <em>snake_case</em> для названия файлов и <em>CamelCase</em> для названия классов. Пример:</p><pre><code>&lt;?php namespace Acme\\Blog\\Updates;

use Schema;
use October\\Rain\\Database\\Updates\\Migration;

/**
 * some_upgrade_file.php
 */
class SomeUpgradeFile extends Migration
{
    ///
}
</code></pre>`,14))])}const x=p(d,[["render",h]]);export{b as __pageData,x as default};
