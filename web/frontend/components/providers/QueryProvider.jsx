import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "react-query";

import { ReactQueryDevtools } from 'react-query/devtools'

/**
 * Sets up the QueryClientProvider from react-query.
 * @desc See: https://react-query.tanstack.com/reference/QueryClientProvider#_top
 */
export function QueryProvider({ children }) {
  const client = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });

  const isDev = import.meta.env.DEV

  return (
  <QueryClientProvider client={client}>
    {children}
    {isDev ? <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> : null}
  </QueryClientProvider>);
}
