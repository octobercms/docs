Charts and indicators are used in the back-end report widgets (including the [dashboard][extensibility-dashboard-widgets.md]) and scoreboard areas.

#### Pie chart

The pie chart outputs information as a circle diagram, with optional label in the center. Example markup:

```php
<div 
    class="control-chart centered wrap-legend"
    data-control="chart-pie"
    data-size="200"
    data-center-text="100"
>
    <ul>
        <li>Label 1 <span>100</span></li>
        <li>Label 2 <span>100</span></li>
        <li>Label 3 <span>100</span></li>
    </ul>
</div>
```

![image](https://github.com/octobercms/docs/blob/master/images/traffic-sources.png?raw=true)

The **centered** and **wrap-legend** classes are optional. They manage the chart and legend layout.

#### Bar chart

Example bar chart markup:

```php
    <div 
        class="control-chart wrap-legend" 
        data-control="chart-bar" 
        data-height="100"
        data-full-width="1"
    >
        <ul>
            <li>Label 1 <span>100</span></li>
            <li>Label 2 <span>100</span></li>
            <li>Label 3 <span>100</span></li>
        </ul>
    </div>
```

The **wrap-legend** class is optional, it manages the legend layout. The **data-height** and **data-full-width** attributes are optional as well.

![image](https://github.com/octobercms/docs/blob/master/images/bar-chart.png?raw=true)

#### Indicators with titles and values

Example title-value indicator markup:

```php
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
```

![image](https://github.com/octobercms/docs/blob/master/images/name-title-indicators.png?raw=true)

Note that the example is given in the context of a scoreboard area. If you use the indicators in a [report widget](extensibility-dashboard-widgets.md) partial, the class **scoreboard-item** shouldn't be used.

