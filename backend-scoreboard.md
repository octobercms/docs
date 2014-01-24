The scoreboard control is usually displayed above back-end lists and displays some summary or the most important data. The control could contain any [charts and indicators](backend-charts-and-indicators). Example of a scoreboard control markup displayed above a list widget:

```php
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
```

![image](list-scoreboard.png)

Note that you should use the **scoreboard-item** class for your scoreboard elements.