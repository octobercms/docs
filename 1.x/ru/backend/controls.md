# Элементы управления

Административный интерфейс включает в себя несколько элементов управления, которые Вы можете использовать на своих страницах.

<a name="scoreboards" class="anchor" ></a>
## Табло

Панель управления обычно находится в начале списков и показывает некоторую общую или важную информацию. Она может включать в себя любые графики или счетчики. Пример:

    <div class="scoreboard">
        <div data-control="toolbar">
            <div class="scoreboard-item control-chart" data-control="chart-pie">
                <ul>
                    <li data-color="#95b753">Published <span>84</span></li>
                    <li data-color="#e5a91a">Drafts <span>12</span></li>
                    <li data-color="#cc3300">Deleted <span>18</span></li>
                </ul>
            </div>

            <div class="scoreboard-item control-chart" data-control="chart-bar">
                <ul>
                    <li data-color="#95b753">Published <span>84</span></li>
                    <li data-color="#e5a91a">Drafts <span>12</span></li>
                    <li data-color="#cc3300">Deleted <span>18</span></li>
                </ul>
            </div>

            <div class="scoreboard-item title-value">
                <h4>Weight</h4>
                <p>100</p>
                <p class="description">unit: kg</p>
            </div>
        </div>
    </div>

    <?= $this->listRender() ?>

![image](https://github.com/octobercms/docs/blob/master/images/list-scoreboard.png?raw=true) {.img-responsive .frame}

Обратите внимание на то, что надо использовать точно такие же классы, как в примере!

<a name="indicators" class="anchor" ></a>
## Индикаторы

Индикаторы - простые элементы, которые имеют заголовок, значение и описание. Вы можете использовать `positive` и `negative` классы, чтобы показать увеличение значения или наоборот. Вы можете использовать [Font Autumn](http://daftspunk.github.io/Font-Autumn/), чтобы добавлять иконку перед значением.

    <div class="scoreboard-item title-value">
        <h4>Weight</h4>
        <p>100</p>
        <p class="description">unit: kg</p>
    </div>

    <div class="scoreboard-item title-value">
        <h4>Comments</h4>
        <p class="positive">44</p>
        <p class="description">previous month: 32</p>
    </div>

    <div class="scoreboard-item title-value">
        <h4>Length</h4>
        <p class="negative">31</p>
        <p class="description">previous: 42</p>
    </div>

    <div class="scoreboard-item title-value">
        <h4>Latest commenter</h4>
        <p class="oc-icon-star">John Smith</p>
        <p class="description">registered: yes</p>
    </div>

    <div class="scoreboard-item title-value" data-control="goal-meter" data-value="88">
        <h4>goal meter</h4>
        <p>88%</p>
        <p class="description">37 posts remain</p>
    </div>

![image](https://github.com/octobercms/docs/blob/master/images/name-title-indicators.png?raw=true) {.img-responsive .frame}

> **Примечание:** Если Вы используете счетчики в [виджетах](../backend/widgets#report-widgets), то нельзя использовать класс **scoreboard-item**.

<a name="pie-chart" class="anchor" ></a>
## Круговая диаграмма

Пример круговой диаграммы:

    <div
        class="control-chart centered wrap-legend"
        data-control="chart-pie"
        data-size="200"
        data-center-text="100">
        <ul>
            <li>Label 1 <span>100</span></li>
            <li>Label 2 <span>100</span></li>
            <li>Label 3 <span>100</span></li>
        </ul>
    </div>

![image](https://github.com/octobercms/docs/blob/master/images/traffic-sources.png?raw=true) {.img-responsive .frame}

<a name="bar-chart" class="anchor" ></a>
## Столбиковая диаграмма (Гистограмма)

Приме гистограммы (атрибуты **wrap-legend**, **data-height** и **data-full-width** - необязательны):

    <div
        class="control-chart wrap-legend"
        data-control="chart-bar"
        data-height="100"
        data-full-width="1">
        <ul>
            <li>Label 1 <span>100</span></li>
            <li>Label 2 <span>100</span></li>
            <li>Label 3 <span>100</span></li>
        </ul>
    </div>

![image](https://github.com/octobercms/docs/blob/master/images/bar-chart.png?raw=true) {.img-responsive .frame}
