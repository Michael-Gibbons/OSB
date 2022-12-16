# Pages

Creating new pages is easy. Simply create a new file in the `web/frontend/pages` directory and a new route will be created for that page.

If you need to use a path parameter, use `[PARAM_NAME]` in the filename. Here are some examples

`/pages/index.jsx` matches `/`

`/pages/blog.jsx` matches `/blog`

`/pages/blog/[id].jsx` matches `/blog/123`

This template uses [react-router](https://reactrouter.com/en/main) to handle client side navigation.

See the resource list example, located in the development navigation tab, in the application for a full implementation.