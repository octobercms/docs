---
subtitle: "Create an administrator, assign a role, and check the event log"
---
# Managing Administrators

Every person who logs in to the backend is an administrator. Right now you are the only one. Let's create a second account, assign it a role, and verify that the system sent an invitation email.

## Create a New Administrator

1. Open the **Settings** area from the main menu.
2. Click **Administrators** in the left-hand sidebar.
3. Click the **New Administrator** button.
4. Fill in the details, using any name and email you like. For example:
   - **First Name**: `Test`
   - **Last Name**: `Editor`
   - **Email**: `editor@example.com`
   - **Username**: `editor`
   - **Password**: pick something simple for now (this is just a local test).
5. Leave the **Send invitation by email** checkbox ticked so the new administrator receives their login details.
6. Click **Create**.

Your new administrator now appears in the list.

## Assign a Role

By default the new account has no restrictions. Let's give it a specific role so it only has access to certain areas.

1. Click on **Test Editor** in the administrator list to open their profile.
2. Find the **Role** options and select **Publisher** (or whichever role fits; you can browse the available roles to see what permissions each one includes).
3. Click **Save**.

That administrator is now limited to the permissions defined by their role. They won't see settings or areas they don't have access to.

::: tip
You can manage roles under **Settings → Role Permissions**. Roles are just named groups of permissions, so create as many as your team needs.
:::

## Check the Event Log

When you created that administrator, the system sent the invitation email. Since your site is probably using the **Log** mail driver (the default for local development), the email was written to the log file instead of actually being sent. Let's check.

1. Go to **Settings → Logs → Event Log**.
2. Look for a recent entry related to the invitation email. Click it to see the full details.

This is where you will check for errors, debug issues, and verify that things like email delivery are working. Get in the habit of checking the event log when something doesn't seem right.

## View the Mail Configuration

Now let's see where you would configure a real mail provider for production.

1. Navigate to **Settings → Mail → Mail Configuration**.
2. You will see the current **Send Method**. It is most likely set to **Log**, which writes emails to the log file instead of sending them.
3. In production, you would change this to **SMTP**, **Mailgun**, **Postmark**, or another provider and fill in your credentials.
4. The **Send Test Message** button lets you verify your settings before going live.

You don't need to change anything right now. Just know where this setting lives for when you are ready to deploy.

## Next Steps

You have created an administrator, assigned a role, and found the event log and mail settings. Continue to [System Updates](./system-updates.md) to learn how to manage plugins and keep your site up to date.
