import axios from 'axios'
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken, authenticatedFetch } from "@shopify/app-bridge-utils";
import { Redirect } from "@shopify/app-bridge/actions";
import { useQuery } from 'react-query';

export function useServerClient(axiosOptions = {}){
  const app = useAppBridge();
  const fetchFunction = authenticatedFetch(app);

  const { refetch: authCheck } = useQuery('authCheck', () => {
    return fetchFunction('/api/authCheck').then((response) => { // Axios does not update response headers for some reason, so on 403 we're using a regular fetch to verify the headers we need to redirect to auth
      checkHeadersForReauthorization(response.headers, app);
    });
  }, {enabled: false, retry: false})

  function checkHeadersForReauthorization(headers, app) {
    if (headers.get("X-Shopify-API-Request-Failure-Reauthorize") === "1") {
      const authUrlHeader =
        headers.get("X-Shopify-API-Request-Failure-Reauthorize-Url") ||
        `/api/auth`;

      const redirect = Redirect.create(app);
      redirect.dispatch(
        Redirect.Action.REMOTE,
        authUrlHeader.startsWith("/")
          ? `https://${window.location.host}${authUrlHeader}`
          : authUrlHeader
      );
    }
  }

  const defaultOptions = {
    baseURL: "/api/v1",
    timeout: 100000,
  };

  const options = {
    ...defaultOptions,
    ...axiosOptions
  }

  const serverClient = axios.create(options);

  serverClient.interceptors.request.use(function (config) {
  return getSessionToken(app) // requires a Shopify App Bridge instance
    .then((token) => {
      // Append your request headers with an authenticated token
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    });
  });

  serverClient.interceptors.request.use(function (config) {
    return getSessionToken(app) // requires a Shopify App Bridge instance
      .then((token) => {
        // Append your request headers with an authenticated token
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
    });

  serverClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.status === 403) {
      authCheck()
    }
  });

  return serverClient
}