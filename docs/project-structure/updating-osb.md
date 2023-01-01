# Updating OSB

I'll probably keep working on this template for a while. Its possible I make something you want to add to your app built in an old version of OSB or fix a bug in a current version.

Doing so is pretty simple, you just have to merge my main branch into yours. If it merges cleanly, congrats. If it does not, since it relates to the business logic of your application, you're on your own.

You can do so using the following commands.

```
git remote add OSB https://github.com/Michael-Gibbons/OSB.git
```

```
git remote update
```

```
git switch -c update-OSB
```

```
git merge --allow-unrelated-histories --squash OSB/main
```

Here you should either receive a successful merge or merge conflicts.

If the merge is successful, test it, commit it, submit a PR for main, merge at your discretion.

If the merge is unsuccessful, some changes you did related to the business logic of your application was incompatible with my changes. Fix the conflicts in a way that does not break your application, good luck!