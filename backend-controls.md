# Backend Controls

- [Hints](#hints)
- [Scoreboards](#scoreboards)
- [Indicators](#indicators)
- [Pie chart](#pie-chart)
- [Bar chart](#bar-chart)

The back-end user interface includes a number of HTML controls that you can use on your pages.

<a name="hints" class="anchor" href="#hints"></a>
## Hints

You can render informative panels in the backend, called hints, that the user can hide. The first parameter should be a unique key for the purposes of remembering if the hint has been hidden or not. The second parameter is a reference to a partial view. The third parameter can be some extra view variables to pass to the partial, in addition to some hint properties.

    <?= $this->makeHintPartial('my_hint_key', 'my_hint_partial', ['foo' => 'bar']) ?>

You can also disable the ability to hide a hint by setting the key value to a null value. This hint will always be displayed:

    <?= $this->makeHintPartial(null, 'my_hint_partial') ?>

The following properties are available:

Property | Description
------------- | -------------
**type** | Sets the color of the hint, supported types: danger, info, success, warning. Default: info.
**title** | Adds a title section to the hint.
**subtitle** | In addition to the title, adds a second line to the title secion.
**icon** | In addition to the title, adds an icon to the title section.

### Checking if Hints are Hidden

If you're using hints, you may find it useful to check if the user has hidden them. This is easily done using the `isBackendHintHidden` method. It takes a single parameter, and that's the unique key you specified in the original call to `makeHintPartial`. The method will return true if the hint was hidden, false otherwise:

    <?php if ($this->isBackendHintHidden('my_hint_key')): ?>
    <!-- Do something when the hint is hidden -->
    <?php endif ?>

<a name="scoreboards" class="anchor" href="#scoreboards"></a>
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

<a name="indicators" class="anchor" href="#indicators"></a>
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

<a name="pie-chart" class="anchor" href="#pie-chart"></a>
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

<a name="bar-chart" class="anchor" href="#bar-chart"></a>
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
