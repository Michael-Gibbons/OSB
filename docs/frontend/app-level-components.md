# App Level Components

In a Shopify application there are certain UI components you only want to have 1 of.

To minimize dom-clutter and to minimize rewriting the same markup over and over again for slightly different components I've created App Level components which are triggered by react custom hooks, covered in [App Level Hooks](./frontend/app-level-hooks.md).

The following is a list of all app level components, the hook that controls them (if any), and their purpose in the application.


| Component   | Hook        | Purpose    |
| ----------- | ----------- | ---------- |
| `AppBanner` | `useBanner` | The top-most banner in the template, it will show on every page above the page markup. Use it to convey information to users. Like future updates, actions that need to be performed, etc. |
| `AppContextualSaveBar` | `useContextualSaveBar` | Used to perform save/discard actions. Whenever a user needs to fill out a form, and those updates conveyed to a database, use the contextual save bar. |
| `AppError` | none | The template to show when your application has an unrecoverable error. Ideally this template should contain an error id and a method of contacting support. |
| `AppErrorBoundary` | none | The error boundary of your application, you shouldn't need to edit this but if you do, see [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) |
| `AppFrame` | none | The main frame of your application, you should not use this component in other places. Every application only has 1 frame. Many of the components below are sub-components of the App Frame. |
| `AppLoading` | `useLoading` | The loading process indicator for your application. Toggle it when you are fetching data and want to inform the user of it. `useAppQuery` and `useAppMutation` do this for you by default. |
| `AppModal` | `useModal` | The modal for the application. Only 1 modal is ever open at any given time, so instead of having multiple modals cluttering the dom and duplicating markup, we simply replace the contents of the `AppModal` to convey the relevant information/actions.
| `AppNavigation` | none | The sidebar navigation for your application. This component should be updated to reflect the navigation related to your business logic. |
| `AppPageLoading` | none | The loading skeleton for any singular page. Render this component when you are fetching data so critical to the function of the page that it doesn't make sense to render anything until you have that data. |
| `AppSearchField` | none | The main search bar for your application. Depending on the function of your application the application of this search bar can vary wildly. Used in the `AppFrame` component. |
| `AppSearchResults` | none | The search results for `AppSearchField`. Depending on the function of your application the application of this search bar can vary wildly. Used in the `AppFrame` component |
| `AppSecondaryMenu` | none | The menu that displays under an icon next to the search field. Used in the `AppFrame` component. |
| `AppToast` | `useToast` | The main toast for your application. Use it to convey server-side success/failure. `useAppQuery` and `useAppMutation` do this for you by default.
| `AppTopBar` | none | The main top bar of your application. Used in the `AppFrame` component.
| `AppUserMenu` | none | The menu to display under the user icon in the `AppTopBar`. Use for user-specific actions |