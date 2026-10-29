import{_ as g,r as e,o as i,c,e as a,a as t,s as n,d as o}from"./chunks/framework.CXcwiNg-.js";const _=JSON.parse('{"title":"Элементы управления - October CMS - 1.x","titleTemplate":false,"description":"","frontmatter":{},"headers":[{"level":2,"title":"Табло","slug":"табло","link":"#табло","children":[]},{"level":2,"title":"Индикаторы","slug":"индикаторы","link":"#индикаторы","children":[]},{"level":2,"title":"Круговая диаграмма","slug":"круговая-диаграмма","link":"#круговая-диаграмма","children":[]},{"level":2,"title":"Столбиковая диаграмма (Гистограмма)","slug":"столбиковая-диаграмма-гистограмма","link":"#столбиковая-диаграмма-гистограмма","children":[]}],"relativePath":"1.x/ru/backend/controls.md","filePath":"1.x/ru/backend/controls.md"}'),p={name:"1.x/ru/backend/controls.md"};function d(u,l,h,q,m,v){const s=e("pre-heading"),r=e("post-heading");return i(),c("div",null,[a(s),l[0]||(l[0]=t("h1",null,"Элементы управления",-1)),a(r),l[1]||(l[1]=n(`<p>Административный интерфейс включает в себя несколько элементов управления, которые Вы можете использовать на своих страницах.</p><p><a name="scoreboards" class="anchor"></a></p><h2 id="табло"><a href="#табло" class="header-anchor">#</a> Табло</h2><p>Панель управления обычно находится в начале списков и показывает некоторую общую или важную информацию. Она может включать в себя любые графики или счетчики. Пример:</p><pre><code>&lt;div class=&quot;scoreboard&quot;&gt;
    &lt;div data-control=&quot;toolbar&quot;&gt;
        &lt;div class=&quot;scoreboard-item control-chart&quot; data-control=&quot;chart-pie&quot;&gt;
            &lt;ul&gt;
                &lt;li data-color=&quot;#95b753&quot;&gt;Published &lt;span&gt;84&lt;/span&gt;&lt;/li&gt;
                &lt;li data-color=&quot;#e5a91a&quot;&gt;Drafts &lt;span&gt;12&lt;/span&gt;&lt;/li&gt;
                &lt;li data-color=&quot;#cc3300&quot;&gt;Deleted &lt;span&gt;18&lt;/span&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;

        &lt;div class=&quot;scoreboard-item control-chart&quot; data-control=&quot;chart-bar&quot;&gt;
            &lt;ul&gt;
                &lt;li data-color=&quot;#95b753&quot;&gt;Published &lt;span&gt;84&lt;/span&gt;&lt;/li&gt;
                &lt;li data-color=&quot;#e5a91a&quot;&gt;Drafts &lt;span&gt;12&lt;/span&gt;&lt;/li&gt;
                &lt;li data-color=&quot;#cc3300&quot;&gt;Deleted &lt;span&gt;18&lt;/span&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/div&gt;

        &lt;div class=&quot;scoreboard-item title-value&quot;&gt;
            &lt;h4&gt;Weight&lt;/h4&gt;
            &lt;p&gt;100&lt;/p&gt;
            &lt;p class=&quot;description&quot;&gt;unit: kg&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

&lt;?= $this-&gt;listRender() ?&gt;
</code></pre><p><img src="https://github.com/octobercms/docs/blob/develop/images/list-scoreboard.png?raw=true" alt="image"></p><p>Обратите внимание на то, что надо использовать точно такие же классы, как в примере!</p><p><a name="indicators" class="anchor"></a></p><h2 id="индикаторы"><a href="#индикаторы" class="header-anchor">#</a> Индикаторы</h2>`,9)),l[2]||(l[2]=t("p",null,[o("Индикаторы - простые элементы, которые имеют заголовок, значение и описание. Вы можете использовать "),t("code",null,"positive"),o(" и "),t("code",null,"negative"),o(" классы, чтобы показать увеличение значения или наоборот. Вы можете использовать "),t("a",{href:"http://daftspunk.github.io/Font-Autumn/",target:"_blank",rel:"noopener noreferrer",class:"is-ext"},[o("Font Autumn"),t("span",null,[t("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",focusable:"false",x:"0px",y:"0px",viewBox:"0 0 100 100",width:"15",height:"15",class:"icon outbound"},[t("path",{fill:"currentColor",d:"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"}),o(),t("polygon",{fill:"currentColor",points:"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"})]),o(),t("span",{class:"sr-only"},"(opens new window)")])]),o(", чтобы добавлять иконку перед значением.")],-1)),l[3]||(l[3]=n(`<pre><code>&lt;div class=&quot;scoreboard-item title-value&quot;&gt;
    &lt;h4&gt;Weight&lt;/h4&gt;
    &lt;p&gt;100&lt;/p&gt;
    &lt;p class=&quot;description&quot;&gt;unit: kg&lt;/p&gt;
&lt;/div&gt;

&lt;div class=&quot;scoreboard-item title-value&quot;&gt;
    &lt;h4&gt;Comments&lt;/h4&gt;
    &lt;p class=&quot;positive&quot;&gt;44&lt;/p&gt;
    &lt;p class=&quot;description&quot;&gt;previous month: 32&lt;/p&gt;
&lt;/div&gt;

&lt;div class=&quot;scoreboard-item title-value&quot;&gt;
    &lt;h4&gt;Length&lt;/h4&gt;
    &lt;p class=&quot;negative&quot;&gt;31&lt;/p&gt;
    &lt;p class=&quot;description&quot;&gt;previous: 42&lt;/p&gt;
&lt;/div&gt;

&lt;div class=&quot;scoreboard-item title-value&quot;&gt;
    &lt;h4&gt;Latest commenter&lt;/h4&gt;
    &lt;p class=&quot;oc-icon-star&quot;&gt;John Smith&lt;/p&gt;
    &lt;p class=&quot;description&quot;&gt;registered: yes&lt;/p&gt;
&lt;/div&gt;

&lt;div class=&quot;scoreboard-item title-value&quot; data-control=&quot;goal-meter&quot; data-value=&quot;88&quot;&gt;
    &lt;h4&gt;goal meter&lt;/h4&gt;
    &lt;p&gt;88%&lt;/p&gt;
    &lt;p class=&quot;description&quot;&gt;37 posts remain&lt;/p&gt;
&lt;/div&gt;
</code></pre><p><img src="https://github.com/octobercms/docs/blob/develop/images/name-title-indicators.png?raw=true" alt="image"></p><blockquote><p><strong>Примечание:</strong> Если Вы используете счетчики в <a href="./../backend/widgets.html#report-widgets">виджетах</a>, то нельзя использовать класс <strong>scoreboard-item</strong>.</p></blockquote><p><a name="pie-chart" class="anchor"></a></p><h2 id="круговая-диаграмма"><a href="#круговая-диаграмма" class="header-anchor">#</a> Круговая диаграмма</h2><p>Пример круговой диаграммы:</p><pre><code>&lt;div
    class=&quot;control-chart centered wrap-legend&quot;
    data-control=&quot;chart-pie&quot;
    data-size=&quot;200&quot;
    data-center-text=&quot;100&quot;&gt;
    &lt;ul&gt;
        &lt;li&gt;Label 1 &lt;span&gt;100&lt;/span&gt;&lt;/li&gt;
        &lt;li&gt;Label 2 &lt;span&gt;100&lt;/span&gt;&lt;/li&gt;
        &lt;li&gt;Label 3 &lt;span&gt;100&lt;/span&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
</code></pre><p><img src="https://github.com/octobercms/docs/blob/develop/images/traffic-sources.png?raw=true" alt="image"></p><p><a name="bar-chart" class="anchor"></a></p><h2 id="столбиковая-диаграмма-гистограмма"><a href="#столбиковая-диаграмма-гистограмма" class="header-anchor">#</a> Столбиковая диаграмма (Гистограмма)</h2><p>Приме гистограммы (атрибуты <strong>wrap-legend</strong>, <strong>data-height</strong> и <strong>data-full-width</strong> - необязательны):</p><pre><code>&lt;div
    class=&quot;control-chart wrap-legend&quot;
    data-control=&quot;chart-bar&quot;
    data-height=&quot;100&quot;
    data-full-width=&quot;1&quot;&gt;
    &lt;ul&gt;
        &lt;li&gt;Label 1 &lt;span&gt;100&lt;/span&gt;&lt;/li&gt;
        &lt;li&gt;Label 2 &lt;span&gt;100&lt;/span&gt;&lt;/li&gt;
        &lt;li&gt;Label 3 &lt;span&gt;100&lt;/span&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;
</code></pre><p><img src="https://github.com/octobercms/docs/blob/develop/images/bar-chart.png?raw=true" alt="image"></p>`,13))])}const f=g(p,[["render",d]]);export{_ as __pageData,f as default};
