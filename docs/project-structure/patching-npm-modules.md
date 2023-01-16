# Patching npm modules

npm modules are made by people and people are stupid, present company excluded of course.

Imagine one of your dependencies has a bug. You need this bug fixed or people will be mad, big mad. One approach to solve this issue is to fork the package in question, fix the bug, replace the dependency in the project with your forked copy. This approach has some downsides:
- It's overkill for simple changes
- It's annoying/unfeasible to maintain your own forked copy
- It's splitting your project into multiple codebases.

My opinion is to avoid this if at all possible. It is the "correct" thing to do if you are planning on forking a project and developing a new project from that base. But for the most common scenario of simple bug fixes in slow to update packages *cough cough Shopify* , then the better approach is to use the [patch-package](https://www.npmjs.com/package/patch-package) package.

Directly modify your node_module dependency in question, run the command, it will generate a patch file, then on `postinstall` it will apply your patches, which should be committed to version control.