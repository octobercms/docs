# {% flash %}

Flash messages can be set by [Components](components) or inside the page or layout [PHP section](themes#php-section) with the Flash class. Examples:

    Flash::success('Settings successfully saved!');
    ...
    Flash::error('Error saving settings');

October provides the `{% flash %}` tag for displaying Flash messages on the website pages. The tag has a closing tag - `{% endflash %}`. Everything between the opening and closing tags is displayed if the flash message is set. When the flash message is displayed it deletes from the session. Inside the `{% flash %}` you can use the `type` variable that represents the flash message type - **success**, **error**, **info** or **warning**. The `message` variable represents the flash message text.

    {% flash %}
        <div class="alert alert-{{ type }}">{{ message }}</div>
    {% endflash %}

The `{% flash %}` tag has an optional parameter that allows to filter flash messages of a given type. The next example will show only success messages. If there is an error message it won't be displayed.

    {% flash success %}
        <div class="alert alert-success">{{ message }}</div>
    {% endflash %}