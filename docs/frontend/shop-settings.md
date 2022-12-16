# Shop Settings

The only database table that comes out of the box with this template is the `settings` table. Which stores a shop name and a json object containing the shop level settings.

This is for values that should be persisted throughout the life of the application, an example being the account email associated with the shop owner.

When these settings are changed we save them to our database.

I have provided example settings for Boolean values, Enums, Text, and have provided a Custom setting example for settings that cannot be defined in a single primitive value.

Please see the `settings.jsx` file for a comprehensive implementation.