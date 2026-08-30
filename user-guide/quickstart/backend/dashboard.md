---
subtitle: "Customize your dashboard and generate some statistics"
---
# Dashboard & Statistics

The dashboard is the first thing you see after logging in. Right now it shows a couple of default widgets. Let's make it your own and give it some real data to display.

## Edit the Dashboard

The dashboard ships with a **Welcome** widget and a **System status** widget. To make changes, you first switch the dashboard into edit mode:

1. Click the pencil icon next to the dashboard name and select **Edit Dashboard** from the menu.
2. The dashboard enters edit mode, where you can add, configure, move, and remove widgets.

Try rearranging the widgets by dragging one to a new position. You can also click **Add Widget** in a row to add a new widget, or **Add Row** to start a new row.

## Remove a Widget

Let's clean up by removing the Welcome widget. You won't need it once you know your way around.

1. While in edit mode, click the menu icon on the **Welcome** widget.
2. Select **Delete** from the menu.

The widget disappears. Don't worry, removing a widget doesn't delete any data, it just hides the panel.

## Reset the Layout

Changed your mind? You can always start over.

1. Click the pencil icon next to the dashboard name.
2. Select **Reset Layout** from the menu.
3. Confirm. Your dashboard returns to the default layout with all the original widgets restored.

::: aside
Each administrator has their own independent dashboard layout. Resetting yours won't affect what other admins see.
:::

## Add Traffic Statistics

October CMS includes a built-in statistics plugin that tracks page views. Let's turn it on and generate some sample data.

1. Navigate to **Settings → Internal Traffic Statistics** in the main menu.
2. Click the **Generate Data** button to create some sample traffic data. This fills the statistics widget with fake page views so you can see how it looks.
3. Go back to the **Dashboard** by clicking the Dashboard link in the top menu.

You should now see a traffic chart on your dashboard. If it doesn't appear automatically, enter edit mode, click **Add Widget**, and choose the **Traffic Information** data source.

::: tip
In production, this plugin tracks real visitor traffic automatically, no fake data needed. The statistics you generated here are just for exploring the dashboard during this tutorial.
:::

## Next Steps

Your dashboard is set up. Next, let's create another administrator account and explore roles. Continue to [Managing Administrators](./managing-admins.md).
