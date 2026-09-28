import{_ as r,r as l,o as a,c as u,e as o,a as e,s as p,d as t}from"./chunks/framework.CXcwiNg-.js";const q=JSON.parse('{"title":"Юнит тесты - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Тестирование плагинов","slug":"тестирование-плагинов","link":"#тестирование-плагинов","children":[{"level":3,"title":"Создание тестов","slug":"создание-тестов","link":"#создание-тестов","children":[]}]},{"level":2,"title":"Тестирование системы","slug":"тестирование-системы","link":"#тестирование-системы","children":[{"level":3,"title":"Юнит тесты","slug":"юнит-тесты","link":"#юнит-тесты","children":[]},{"level":3,"title":"Функциональные тесты","slug":"функциональные-тесты","link":"#функциональные-тесты","children":[{"level":4,"title":"Установка Selenium","slug":"установка-selenium","link":"#установка-selenium","children":[]},{"level":4,"title":"Настройка Selenium","slug":"настроика-selenium","link":"#настроика-selenium","children":[]}]}]}],"relativePath":"1.x/ru/help/unit-testing.md","filePath":"1.x/ru/help/unit-testing.md"}'),c={name:"1.x/ru/help/unit-testing.md"};function d(h,n,g,m,f,v){const s=l("pre-heading"),i=l("post-heading");return a(),u("div",null,[o(s),n[0]||(n[0]=e("h1",null,"Юнит тесты",-1)),o(i),n[1]||(n[1]=p(`<p><a href="#testing-plugins" name="testing-plugins" class="anchor"></a></p><h2 id="тестирование-плагинов"><a href="#тестирование-плагинов" class="header-anchor">#</a> Тестирование плагинов</h2><p>Вы можете выполнить юнит тесты, запустив <code>phpunit</code> из каталога с плагином.</p><h3 id="создание-тестов"><a href="#создание-тестов" class="header-anchor">#</a> Создание тестов</h3><p>Вы можете протестировать плагины, создав файл <code>phpunit.xml</code> в папке с плагином. Пример содержимого файла <strong>/plugins/acme/blog/phpunit.xml</strong>:</p><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;phpunit backupGlobals=&quot;false&quot;
         backupStaticAttributes=&quot;false&quot;
         bootstrap=&quot;../../../tests/bootstrap.php&quot;
         colors=&quot;true&quot;
         convertErrorsToExceptions=&quot;true&quot;
         convertNoticesToExceptions=&quot;true&quot;
         convertWarningsToExceptions=&quot;true&quot;
         processIsolation=&quot;false&quot;
         stopOnFailure=&quot;false&quot;
         syntaxCheck=&quot;false&quot;
&gt;
    &lt;testsuites&gt;
        &lt;testsuite name=&quot;Plugin Unit Test Suite&quot;&gt;
            &lt;directory&gt;./tests&lt;/directory&gt;
        &lt;/testsuite&gt;
    &lt;/testsuites&gt;
    &lt;php&gt;
        &lt;env name=&quot;APP_ENV&quot; value=&quot;testing&quot;/&gt;
        &lt;env name=&quot;CACHE_DRIVER&quot; value=&quot;array&quot;/&gt;
        &lt;env name=&quot;SESSION_DRIVER&quot; value=&quot;array&quot;/&gt;
    &lt;/php&gt;
&lt;/phpunit&gt;
</code></pre><p>Вы можете создать папку <strong>tests/</strong> с тестовыми классами. Пример:</p><pre><code>&lt;?php namespace Acme\\Blog\\Tests\\Models;

use Acme\\Blog\\Models\\Post;
use PluginTestCase;

class PostTest extends PluginTestCase
{
    public function testCreateFirstPost()
    {
        $post = Post::create([&#39;title&#39; =&gt; &#39;Hi!&#39;]);
        $this-&gt;assertEquals(1, $post-&gt;id);
    }
}
</code></pre><p>Тестовые классы должны расширять класс <code>PluginTestCase</code>, который обновляет БД OctoberCMS, тестируемый плагин и его зависимости при запуске теста. Это эквивалентно выполнению следующих действий перед каждым тестом:</p><pre><code>php artisan october:up
php artisan plugin:refresh Acme.Blog
[php artisan plugin:refresh &lt;dependency&gt;, ...]
</code></pre><p><a href="#testing-system" name="testing-system" class="anchor"></a></p><h2 id="тестирование-системы"><a href="#тестирование-системы" class="header-anchor">#</a> Тестирование системы</h2><p>Вы должны загрузить копию для разработки, используя composer, или клонировать git-репозиторий, чтобы иметь возможность протестировать ядро OctoberCMS. Это обеспечит наличие каталога <code>tests/</code>.</p><h3 id="юнит-тесты"><a href="#юнит-тесты" class="header-anchor">#</a> Юнит тесты</h3><p>Юнит тесты могут быть выполнены путем запуска <code>phpunit</code> в корневом каталоге или внутри <code>/tests/unit</code>.</p><h3 id="функциональные-тесты"><a href="#функциональные-тесты" class="header-anchor">#</a> Функциональные тесты</h3><p>Функциональные тесты могут быть выполнены путем запуска <code>phpunit</code> в каталоге <code>/tests/functional</code>. Убедитесь, что выполнены следующие настройки:</p><ul><li><code>demo</code> - активная тема</li><li><code>en</code> - активный язык</li></ul><h4 id="установка-selenium"><a href="#установка-selenium" class="header-anchor">#</a> Установка Selenium</h4>`,19)),n[2]||(n[2]=e("ol",null,[e("li",null,[e("a",{href:"http://java.sun.com/",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("Скачайте"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(" последнюю версию Java SE и установите ее.")]),e("li",null,[t("Скачайте архив с дистрибутивом "),e("a",{href:"http://seleniumhq.org/download/",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[t("Selenium Server"),e("span",null,[e("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[e("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),t(),e("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),t(),e("span",{class:"sr-only"},"(opens new window)")])]),t(".")]),e("li",null,"Разархивируйте файл и скопируйте selenium-server-standalone-2.42.2.jar (укажите нужную версию) в /usr/local/bin."),e("li",null,[t("Запустите Selenium Server при помощи следующей команды: "),e("code",null,"java -jar /usr/local/bin/selenium-server-standalone-2.42.2.jar"),t(".")])],-1)),n[3]||(n[3]=e("h4",{id:"настроика-selenium"},[e("a",{href:"#настроика-selenium",class:"header-anchor"},"#"),t(" Настройка Selenium")],-1)),n[4]||(n[4]=e("p",null,[t("Создайте файл "),e("code",null,"selenium.php"),t(" в корне проекта и добавьте в него следующее содержимое:")],-1)),n[5]||(n[5]=e("pre",null,[e("code",null,`<?php

// Selenium server details
define('TEST_SELENIUM_HOST', '127.0.0.1');
define('TEST_SELENIUM_PORT', 4444);
define('TEST_SELENIUM_BROWSER', '*firefox');

// Back-end URL
define('TEST_SELENIUM_URL', 'http://localhost/backend/');

// Active Theme
define('TEST_SELENIUM_THEME', 'demo');

// Back-end credentials
define('TEST_SELENIUM_USER', 'admin');
define('TEST_SELENIUM_PASS', 'admin');
`)],-1))])}const E=r(c,[["render",d]]);export{q as __pageData,E as default};
