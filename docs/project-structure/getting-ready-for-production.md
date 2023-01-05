# Getting ready for production!

TBD! Incomplete

## Baselining your database

If you're getting ready for production or just trying to set up mock production/staging environments, you don't want to migrate the database every time you add a feature. So you should add it to your CI pipeline. Which I've already done for you using the `npm run migrate` command. All this does is run `npx prisma migrate deploy` in the backend folder.

I've added it to the build command which is only run in production.

!> In order to use this, you must baseline your database. Read [prisma's documentation about baselining](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/baselining). If you *only* have the initial migration, you can run the following on your hosted instance, otherwise you will have to add your custom migrations to this command so prisma knows not to reapply them on build.

```
cd web/backend && npx prisma migrate resolve --applied 000000000000_squashed_migrations
```