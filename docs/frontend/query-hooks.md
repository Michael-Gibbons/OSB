# Query Hooks

This template uses [react-query](https://react-query-v3.tanstack.com/overview), an amazing package for handling server-side data.

The core functionality of this package is in the `useQuery` and `useMutation` hooks.

I've created a wrapper around these hooks which toggles the app loading state, queries the defined data, and informs the user of the error if one occurred, as well as logging the error to the logging service. See the "Logging" section for more info.

!> The following hooks are meant to be used to create resource specific hooks. You can use them on their own, which I've done in the `ProductsCard.jsx` component. However this is an anti-pattern and will become cumbersome as your application grows. Extract logic to a reusable hook for use throughout your application whenever you can.

For example you may use `useAppQuery` to create a `useProducts` query which you can use with any application that needs access to products.

?> For the `queryFunction` and `mutateFunction` shown in this example, you should be using the `serverClient` created by the `useServerClient` hook, explained in [Utility Hooks](./frontend/utility-hooks.md)

## useAppQuery

```js
import { useAppQuery } from '/path/to/hooks/index.js'

  const {
    isLoading: myAliasExample, // alias example, useful if you have multiple queries.
    isError,
    isSuccess,
    isIdle,
    data,
    error,
    isFetching,
    refetch } = useAppQuery('UNIQUE_QUERY_KEY', queryFunction, queryOptions)

```

## useAppMutation

```js
import { useAppMutation } from '/path/to/hooks/index.js'

const {
  isIdle,
  isLoading,
  isError,
  isSuccess,
  error,
  data,
  mutate } = useAppMutation(mutateFunction, reactQueryMutationOptions)

```

?> Tip: If you're using multiple queries or mutations you should alias the returned properties.

## useExtractDataFromAppQuery

[React Query](https://react-query-v3.tanstack.com/) extracts the request data into a `data` property.

[Axios](https://www.npmjs.com/package/axios) extracts the request data into a `data` property.

[JSON:API](https://jsonapi.org/) specification expects data to be returned in a `data` property.

This leads to situations where the data you want is in `data.data.data.attributes`

You may need the response object for the business logic of your application so by default I do not modify the returned data.

To make `useAppQuery` and `useAppMutation` more developer friendly I created the following hook which extracts the data from `data.data.data.attributes`

```js
import { useExtractDataFromQuery, useAppQuery } from '/path/to/hooks/index.js'

const { data } = useAppQuery('UNIQUE_QUERY_KEY', queryFunction, queryOptions)
// data.data.data.attributes.iAmCool: true

const [actualDataYouWant] = useExtractDataFromAppQuery(data)
// actualDataYouWant.iAmCool: true

```

## Custom Queries

As stated above, whenever possible you should extract your queries into reusable, resource specific hooks.
You may place those hooks in the `/web/frontend/hooks/react-query/queries OR /mutations` folder.

Here is an example

```js

import { useAppQuery, useServerClient, useExtractDataFromQuery } from '/path/to/hooks/index.js'

export default function useProducts(){

  const serverClient = useServerClient()

  const {
    isLoading
    isError,
    isSuccess,
    isIdle,
    data,
    error,
    isFetching,
    refetch } = useAppQuery('PRODUCTS', () => serverClient.get('/products'))

  const [productData] = useExtractDataFromAppQuery(data)

  return { isLoading, IsError, isSuccess, isIdle, productData, error, isFetching, refetch }
}
```

Using this dependency injection design pattern allows you to reuse this logic around your application, and if you have to change it in the future you don't have to track down every place in the app you made a request to `/products`.