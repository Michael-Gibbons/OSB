import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import store from "../../redux/configureStore";
import { setLoading } from "../../redux/ducks/app";

// This client is used to make authenticated requests from the app frontend, to the server.

const createServerClient = (options) => {
  const defaultOptions = {
    useLoading: false,
    axios: {
      baseURL: "/api/v1",
      timeout: 100000,
    },
  };

  const usableOptions = {
    ...defaultOptions,
    ...options,
    axios: {
      ...defaultOptions.axios,
      ...options?.axios,
    },
  };

  const app = window.OSBShopifyApplication;
  const serverClient = axios.create(usableOptions.axios);

  serverClient.interceptors.request.use(function (config) {
    return getSessionToken(app) // requires a Shopify App Bridge instance
      .then((token) => {
        // Append your request headers with an authenticated token
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      });
  });

  if (usableOptions.useLoading) {
    serverClient.interceptors.request.use(
      function (config) {
        store.dispatch(setLoading(true));

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    serverClient.interceptors.response.use(
      function (response) {
        store.dispatch(setLoading(false));

        return response;
      },
      function (error) {
        store.dispatch(setLoading(false));

        return Promise.reject(error);
      }
    );
  }

  return serverClient;
};

export default createServerClient;
