import {
  ApolloClient,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  Provider as AppBridgeProvider,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import { Provider as StoreProvider } from "react-redux";
import translations from "@shopify/polaris/locales/en.json";
import { BrowserRouter } from "react-router-dom";
import "@shopify/polaris/build/esm/styles.css";
import "../utils/css/polaris-overrides.css";

import store from "../redux/configureStore";
import AppFrame from "./components/AppFrame";
import rateLimit from "./helpers/rate-limit";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();

export default function App() {
  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider
        config={{
          apiKey: process.env.SHOPIFY_API_KEY,
          host: new URL(location).searchParams.get("host"),
          forceRedirect: true,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <StoreProvider store={store}>
            <MyProvider>
              <BrowserRouter>
                <AppFrame />
              </BrowserRouter>
            </MyProvider>
          </StoreProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

function MyProvider({ children }) {
  const app = useAppBridge();

  if (app) {
    window.OSBShopifyApplication = app;
  }

  const http = new HttpLink({
    credentials: "include",
    fetch: userLoggedInFetch(app),
  });

  const link = new ApolloLink.from([rateLimit, http]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export function userLoggedInFetch(app) {
  const fetchFunction = authenticatedFetch(app);

  return async (uri, options) => {
    const response = await fetchFunction(uri, options);

    if (
      response.headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1"
    ) {
      const authUrlHeader = response.headers.get(
        "X-Shopify-API-Request-Failure-Reauthorize-Url"
      );

      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, authUrlHeader || `/auth`);
      return null;
    }

    return response;
  };
}
