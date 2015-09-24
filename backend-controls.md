# Backend Controls

- [Scoreboards](#scoreboards)
- [Indicators](#indicators)
- [Pie chart](#pie-chart)
- [Bar chart](#bar-chart)

The back-end user interface includes a number of HTML controls that you can use on your pages.

<a name="scoreboards"></a>
## Scoreboards

The scoreboard control is usually displayed above back-end lists and displays some summary or the most important data. The control could contain any charts and indicators (see below). Example of a scoreboard control markup displayed above a list widget:

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

Note that you should use the **scoreboard-item** class for your scoreboard elements.

<a name="indicators"></a>
## Indicators

Indicators are simple reporting element that have a title, a value and a description. You can use the `positive` and `negative` classes on the value element. [Font Autumn](http://daftspunk.github.io/Font-Autumn/) icon classes allow to add an icon before the value.

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

> **Note:** The example is given in the context of a scoreboard area. If you use the indicators in a [report widget](widgets#report-widgets) partial, the class **scoreboard-item** shouldn't be used.

<a name="pie-chart"></a>
## Pie chart

The pie chart outputs information as a circle diagram, with optional label in the center. Example markup:

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

<a name="bar-chart"></a>
## Bar chart

The next example shows a bar chart markup. The **wrap-legend** class is optional, it manages the legend layout. The **data-height** and **data-full-width** attributes are optional as well.

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
