---
subtitle: "Create, edit, and manage the people who have access to your backend."
---
# Managing Administrators

Every person who logs in to the October CMS backend is an administrator. Whether you are running the site alone or working with a team, managing administrator accounts lets you control who can access the backend and what they are allowed to do. Keeping this list accurate and up to date is one of the most important things you can do for your website's security.

## Accessing the Administrator List

To view all current administrators:

1. Open the **Settings** area from the main menu.
2. Click **Administrators** in the left-hand sidebar.

You will see a list of every administrator account on your site, including their name, email address, and assigned role.

## Creating a New Administrator

When someone new needs access to the backend, you can create an account for them in just a few steps.

1. Go to **Settings > Administrators**.
2. Click the **Add** button.
3. Fill in the required fields:
   - **First Name** and **Last Name** -- the person's name as it will appear in the backend.
   - **Email** -- used for notifications and password recovery.
   - **Login** -- the username they will use to sign in.
   - **Password** and **Confirm Password** -- set a strong initial password.
4. Assign a **Role** to determine what the new administrator is allowed to access (see below).
5. Click **Save** to create the account.

The new administrator can now log in using the login name and password you provided.

::: warning
Always use strong, unique passwords for administrator accounts. A compromised backend account could allow an attacker to modify your site content, install malicious code, or access sensitive data. Consider using a password manager to generate and store credentials securely.
:::

## Roles and Permissions

Not every administrator needs access to everything. October CMS uses a role-based permission system to keep things organized and secure.

### How It Works

- **Permissions** are individual capabilities, such as "manage pages" or "access the media library."
- **Roles** are named groups of permissions. Instead of assigning dozens of individual permissions to each person, you assign a single role.

For example, you might have:

- A **Publisher** role that allows creating and editing content, but not changing site settings.
- An **Editor** role with access to the blog but nothing else.
- A **Developer** role with full access to every area of the backend.

### Assigning a Role

When creating or editing an administrator, you will see a **Role** dropdown. Select the appropriate role, and that administrator will immediately receive all of the permissions associated with it.

::: aside
Roles are managed under **Settings > Administrators > Manage Roles**. If the existing roles do not match your team's needs, you can create new ones or adjust the permissions on existing roles.
:::

### The Super User

There is a special permission called **Super User** that bypasses all permission checks. An administrator with this flag can access everything in the backend regardless of their assigned role. Only grant super user status to people who genuinely need unrestricted access.

::: warning
Limit the number of super user accounts to the absolute minimum. In most cases, one or two super users is sufficient. Every additional account with unrestricted access increases your security exposure.
:::

## Editing Your Own Profile

You do not need special privileges to update your own account details. Click your name or avatar in the top-right corner of the backend and select **My Account** (or **Backend Preferences**). From there, you can change:

- **Avatar** -- upload a profile picture that will appear next to your name in the backend.
- **First Name** and **Last Name**.
- **Password** -- you will need to enter your current password to confirm the change.
- **Locale** -- choose the language for the backend interface if multiple languages are available.
- **Editor Preferences** -- adjust code editor settings like font size and color scheme, if applicable.

Click **Save** when you are finished.

## Resetting a Password

If an administrator has forgotten their password, there are two ways to help.

### From the Login Screen

On the backend login page, click the **Forgot your password?** link. Enter the email address associated with the account, and a password reset link will be sent. This requires that your site's [mail configuration](./settings-overview.md) is set up correctly.

### From the Administrator List

If you are a super user or have permission to manage administrators:

1. Go to **Settings > Administrators**.
2. Click on the administrator's name to open their profile.
3. Enter a new password in the **Password** field and confirm it.
4. Click **Save**.

Let the person know their new credentials through a secure channel -- never send passwords over unencrypted email or messaging if you can avoid it.

## Best Practices

- **Review accounts regularly.** Remove or deactivate administrators who no longer need access, such as former team members or contractors whose projects have ended.
- **Use roles effectively.** Give each person only the permissions they need to do their job. This limits the damage if an account is ever compromised.
- **Enable strong passwords.** Encourage everyone to use passwords that are at least 12 characters long and include a mix of letters, numbers, and symbols.
- **Keep contact details current.** Accurate email addresses ensure that password reset links and important notifications reach the right people.
