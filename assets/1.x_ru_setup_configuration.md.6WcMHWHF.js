import{_ as r,r as o,o as c,c as s,e as t,a as i,s as p}from"./chunks/framework.CXcwiNg-.js";const v=JSON.parse('{"title":"Конфигурация приложения - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Конфигурация веб-сервера","slug":"конфигурация-веб-сервера","link":"#конфигурация-веб-сервера","children":[{"level":3,"title":"Apache configuration","slug":"apache-configuration","link":"#apache-configuration","children":[]},{"level":3,"title":"Конфигурация Nginx","slug":"конфигурация-nginx","link":"#конфигурация-nginx","children":[]},{"level":3,"title":"Конфигурация Lighttpd","slug":"конфигурация-lighttpd","link":"#конфигурация-lighttpd","children":[]},{"level":3,"title":"Конфигурация IIS","slug":"конфигурация-iis","link":"#конфигурация-iis","children":[]}]},{"level":2,"title":"Конфигурация приложения","slug":"конфигурация-приложения","link":"#конфигурация-приложения","children":[{"level":3,"title":"Режим отладки","slug":"режим-отладки","link":"#режим-отладки","children":[]},{"level":3,"title":"Безопасный режим","slug":"безопасныи-режим","link":"#безопасныи-режим","children":[]},{"level":3,"title":"Защита от CSRF","slug":"защита-от-csrf","link":"#защита-от-csrf","children":[]},{"level":3,"title":"Последние обновления","slug":"последние-обновления","link":"#последние-обновления","children":[]},{"level":3,"title":"Конфигурация среды выполнения","slug":"конфигурация-среды-выполнения","link":"#конфигурация-среды-выполнения","children":[]}]},{"level":2,"title":"Расширенная конфигурация","slug":"расширенная-конфигурация","link":"#расширенная-конфигурация","children":[{"level":3,"title":"Использование обшей папки","slug":"использование-обшеи-папки","link":"#использование-обшеи-папки","children":[]},{"level":3,"title":"Расширенная конфигурация среды выполнения","slug":"расширенная-конфигурация-среды-выполнения","link":"#расширенная-конфигурация-среды-выполнения","children":[]}]}],"relativePath":"1.x/ru/setup/configuration.md","filePath":"1.x/ru/setup/configuration.md"}'),l={name:"1.x/ru/setup/configuration.md"};function d(h,e,g,u,f,m){const n=o("pre-heading"),a=o("post-heading");return c(),s("div",null,[t(n),e[0]||(e[0]=i("h1",null,"Конфигурация приложения",-1)),t(a),e[1]||(e[1]=p(`<p>Все файлы настроек Октября хранятся в папке <strong>config/</strong>. Опции хорошо описаны в комментариях, так что рекомендуем внимательно изучить эти файлы.</p><p><a name="webserver-configuration" class="anchor"></a></p><h2 id="конфигурация-веб-сервера"><a href="#конфигурация-веб-сервера" class="header-anchor">#</a> Конфигурация веб-сервера</h2><p><a name="apache-configuration" class="anchor"></a></p><h3 id="apache-configuration"><a href="#apache-configuration" class="header-anchor">#</a> Apache configuration</h3><p>Если на вашем веб-сервере установлен Apache, то перед началом работы убедитесь, что модуль mod_rewrite и параметр AllowOverride включены. Это необходимо для корректной обработки файла <code>.htaccess</code>.</p><p>В некоторых случаях, возможно, потребуется раскомментировать эту строку в файле <code>.htaccess</code>:</p><pre><code>##
## You may need to uncomment the following line for some hosting environments,
## if you have installed to a subdirectory, enter the name here also.
##
# RewriteBase /
</code></pre><p>Если Вы установили приложение в подпапку, то должны указать ее название:</p><pre><code>RewriteBase /mysubdirectory/
</code></pre><p><a name="nginx-configuration" class="anchor"></a></p><h3 id="конфигурация-nginx"><a href="#конфигурация-nginx" class="header-anchor">#</a> Конфигурация Nginx</h3><p>Если на вашем веб-сервере установлен Nginx, то перед началом работы требуются внести небольшие изменения.</p><p><code>nano /etc/nginx/sites-available/default</code></p><p>Используйте следующий код в разделе <strong>server</strong>. Если вы установили Октябрь в подпапке, замените <code>/</code> на название папки, в которую было установлено приложение:</p><pre><code>location / {
    try_files $uri $uri/ /index.php$is_args$args;
}

rewrite ^themes/.*/(layouts|pages|partials)/.*.htm /index.php break;
rewrite ^bootstrap/.* /index.php break;
rewrite ^config/.* /index.php break;
rewrite ^vendor/.* /index.php break;
rewrite ^storage/cms/.* /index.php break;
rewrite ^storage/logs/.* /index.php break;
rewrite ^storage/framework/.* /index.php break;
rewrite ^storage/temp/protected/.* /index.php break;
rewrite ^storage/app/uploads/protected/.* /index.php break;
</code></pre><p><a name="lighttpd-configuration" class="anchor"></a></p><h3 id="конфигурация-lighttpd"><a href="#конфигурация-lighttpd" class="header-anchor">#</a> Конфигурация Lighttpd</h3><p>Если на Вашем веб-сервере установлен Lighttpd, то Вы можете использовать следующую конфигурацию для запуска OctoberCMS. Откройте файл с настройками вашего сайта:</p><p><code>nano /etc/lighttpd/conf-enabled/sites.conf</code></p><p>Вставьте следующий код в редактор и измените <strong>host address</strong> и <strong>server.document-root</strong> в соответствии с Вашим проектом.</p><pre><code>$HTTP[&quot;host&quot;] =~ &quot;example.domain.com&quot; {
    server.document-root = &quot;/var/www/example/&quot;

    url.rewrite-once = (
        &quot;^/(plugins|modules/(system|backend|cms))/(([\\w-]+/)+|/|)assets/([\\w-]+/)+[-\\w^&amp;&#39;@{}[\\],$=!#().%+~/ ]+\\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\\?.*|)$&quot; =&gt; &quot;$0&quot;,
        &quot;^/(system|themes/[\\w-]+)/assets/([\\w-]+/)+[-\\w^&amp;&#39;@{}[\\],$=!#().%+~/ ]+\\.(jpg|jpeg|gif|png|svg|swf|avi|mpg|mpeg|mp3|flv|ico|css|js|woff|ttf)(\\?.*|)$&quot; =&gt; &quot;$0&quot;,
        &quot;^/storage/app/uploads/public/[\\w-]+/.*$&quot; =&gt; &quot;$0&quot;,
        &quot;^/storage/temp/public/[\\w-]+/.*$&quot; =&gt; &quot;$0&quot;,
        &quot;^/(favicon\\.ico|robots\\.txt|sitemap\\.xml)$&quot; =&gt; &quot;$0&quot;,
        &quot;(.*)&quot; =&gt; &quot;/index.php$1&quot;
    )
}
</code></pre><p><a name="iis-configuration" class="anchor"></a></p><h3 id="конфигурация-iis"><a href="#конфигурация-iis" class="header-anchor">#</a> Конфигурация IIS</h3><p>Если на Вашем веб-сервере установлен Internet Information Services (IIS), используйте следующие настройки в файле <strong>web.config</strong>:</p><pre><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;configuration&gt;
    &lt;system.webServer&gt;
        &lt;rewrite&gt;
            &lt;rules&gt;
                &lt;rule name=&quot;redirect all requests&quot; stopProcessing=&quot;true&quot;&gt;
                    &lt;match url=&quot;^(.*)$&quot; ignoreCase=&quot;false&quot; /&gt;
                    &lt;conditions logicalGrouping=&quot;MatchAll&quot;&gt;
                        &lt;add input=&quot;{REQUEST_FILENAME}&quot; matchType=&quot;IsFile&quot; negate=&quot;true&quot; pattern=&quot;&quot; ignoreCase=&quot;false&quot; /&gt;
                    &lt;/conditions&gt;
                    &lt;action type=&quot;Rewrite&quot; url=&quot;index.php&quot; appendQueryString=&quot;true&quot; /&gt;
                &lt;/rule&gt;
            &lt;/rules&gt;
        &lt;/rewrite&gt;
    &lt;/system.webServer&gt;
&lt;/configuration&gt;
</code></pre><p><a name="app-configuration" class="anchor"></a></p><h2 id="конфигурация-приложения"><a href="#конфигурация-приложения" class="header-anchor">#</a> Конфигурация приложения</h2><p><a name="debug-mode" class="anchor"></a></p><h3 id="режим-отладки"><a href="#режим-отладки" class="header-anchor">#</a> Режим отладки</h3><p>Параметр <code>debug</code> находится в файле с настройками <code>config/app.php</code> и включен по умолчанию.</p><p>Когда этот параметр включен, то сообщения об ошибках отображаются с подробностями. После завершения работы над приложением обязательно отключите режим отладки. Это поможет предотвратить отображение потенциально конфиденциальной информации конечному пользователю.</p><p>В режиме отладки используются следующие функции:</p><ol><li>Отображается <a href="./../cms/pages.html#error-page">подробное описание ошибки</a>.</li><li>Указывается конкретная причина при неудачной аутентификация пользователя.</li><li><a href="./../markup/filter-theme.html">Скрипты и стили</a> не минифицируются.</li><li><a href="#safe-mode">Безопасный режим</a> по умолчанию отключен.</li></ol><blockquote><p><strong>Важно</strong>: Всегда указывайте значение <code>false</code> для параметра <code>app.debug</code> в рабочих проектах.</p></blockquote><p><a name="safe-mode" class="anchor"></a></p><h3 id="безопасныи-режим"><a href="#безопасныи-режим" class="header-anchor">#</a> Безопасный режим</h3><p>Вы можете включить Безопасный режим при помощи параметра <code>enableSafeMode</code> в файле с настройками <code>config/cms.php</code>. По умолчанию значение параметра - <code>null</code>.</p><p>Если безопасный режим включен, то секция PHP кода будет отключена в CMS шаблонах по соображениям безопасности. Если установлено значение <code>null</code>, то безопасный режим включен, когда [режим отладки](# debug-mode) отключен.</p><p><a name="csrf-protection" class="anchor"></a></p><h3 id="защита-от-csrf"><a href="#защита-от-csrf" class="header-anchor">#</a> Защита от CSRF</h3><p>October provides an easy method of protecting your application from cross-site request forgeries. First a random token is placed in your user&#39;s session. Then when a <a href="./../services/html.html#form-tokens">opening form tag is used</a> the token is added to the page and submitted back with each request.</p><p>While CSRF protection is disabled by default, you can enable it with the <code>enableCsrfProtection</code> parameter in the <code>config/cms.php</code> configuration file.</p><p><a name="edge-updates" class="anchor"></a></p><h3 id="последние-обновления"><a href="#последние-обновления" class="header-anchor">#</a> Последние обновления</h3><p>Ядро и некоторые плагины имеют <em>тестовую версию</em> в дополнение к <em>стабильной</em>, чтобы разработчики могли проверить работоспособность своего кода.</p><p>Вы можете получать самые последние обновления, изменив параметр <code>edgeUpdates</code> в файле с настройками <code>config/cms.php</code> на <code>true</code>.</p><pre><code>/*
|--------------------------------------------------------------------------
| Bleeding edge updates
|--------------------------------------------------------------------------
|
| If you are developing with October, it is important to have the latest
| code base, set this value to &#39;true&#39; to tell the platform to download
| and use the development copies of core files and plugins.
|
*/

&#39;edgeUpdates&#39; =&gt; false,
</code></pre><blockquote><p><strong>Примечание:</strong> Мы рекомендуем включить <code>edgeUpdates</code> для разработчиков плагинов.</p></blockquote><p><a name="environment-config" class="anchor"></a></p><h3 id="конфигурация-среды-выполнения"><a href="#конфигурация-среды-выполнения" class="header-anchor">#</a> Конфигурация среды выполнения</h3><p>Часто бывает полезно иметь разные значения конфигурации на основе среды, в которой работает приложение. Это можно сделать, задав переменную <code>APP_ENV</code> (по умолчанию - <strong>production</strong>). Существует два способа изменить это значение:</p><ol><li><p>Установить значение <code>APP_ENV</code> напрямую при помощи сервера.</p><p>Например, если Вы используете Apache, то можете просто добавить следующую строку в <code>.htaccess</code> или <code>httpd.config</code>:</p><pre><code> SetEnv APP_ENV &quot;dev&quot;
</code></pre></li><li><p>Создать файл <strong>.env</strong> в корне приложения со следующим содержимым:</p><pre><code> APP_ENV=dev
</code></pre></li></ol><p>Теперь файлы с настройками можно добавить в папку <strong>config/dev</strong>, тем самым переопределив базовую конфигурацию приложения.</p><p>Например, чтобы использовать другую базу данных MySQL только для <code>dev</code>, создайте файл с именем <strong>config/dev/database.php</strong> и добавьте в него следующие содержимое:</p><pre><code>&lt;?php

return [
    &#39;connections&#39; =&gt; [
        &#39;mysql&#39; =&gt; [
            &#39;host&#39;     =&gt; &#39;localhost&#39;,
            &#39;port&#39;     =&gt; &#39;&#39;,
            &#39;database&#39; =&gt; &#39;database&#39;,
            &#39;username&#39; =&gt; &#39;root&#39;,
            &#39;password&#39; =&gt; &#39;&#39;
        ]
    ]
];
</code></pre><p><a name="advanced-configuration" class="anchor"></a></p><h2 id="расширенная-конфигурация"><a href="#расширенная-конфигурация" class="header-anchor">#</a> Расширенная конфигурация</h2><p><a name="public-folder" class="anchor"></a></p><h3 id="использование-обшеи-папки"><a href="#использование-обшеи-папки" class="header-anchor">#</a> Использование обшей папки</h3><p>Вы можете использовать папку <strong>public/</strong>, чтобы обеспечить дополнительную безопасность своему приложению:</p><pre><code>php artisan october:mirror public/
</code></pre><p>Эта консольная команда создаст новый каталог с именем <strong>public/</strong> в корне Вашего проекта. Вы также должны указать новый путь до сайта в настройках веб-сервера.</p><blockquote><p><strong>Примечание</strong>: Выполняйте эту команду после каждого обновления системы или при установке нового плагина. Возможно для этого Вам потребуются права администратора сервера.</p></blockquote><p><a name="environment-config-extended" class="anchor"></a></p><h3 id="расширенная-конфигурация-среды-выполнения"><a href="#расширенная-конфигурация-среды-выполнения" class="header-anchor">#</a> Расширенная конфигурация среды выполнения</h3><p>Вы можете использовать хелпер <code>env</code> для получения значений переменных из Ваших конфигурационных файлов. Выполните команду <code>october:env</code>, чтобы переместить значение в среду выполнения:</p><pre><code>php artisan october:env
</code></pre><p>Первый параметр - название ключа. Второй параметр, принимаемый функцией <code>env</code>, является значением по умолчанию. Если Вы ознакомитесь с конфигурационными файлами, то увидите несколько параметров, которые уже используют этот хелпер:</p><pre><code>&#39;debug&#39; =&gt; env(&#39;APP_DEBUG&#39;, true),
</code></pre><p>Файл <code>.env</code> не должен попадать в Вашу систему контроля версий, так как каждый из разработчиков и серверов, использующих ваше приложение, может иметь свои собственные настройки окружения.</p><p>Если вы занимаетесь разработкой в команде, то вы можете включить файл <code>.env.example</code> в Ваше приложение. Замените в нём значения «секретных» параметров (пароли, ключи доступа) на пустые строки или поясняющие комментарии — так другие разработчики в вашей команде смогут увидеть переменные окружения, необходимые для запуска вашего приложения.</p>`,72))])}const b=r(l,[["render",d]]);export{v as __pageData,b as default};
