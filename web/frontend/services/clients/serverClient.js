import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";

// This client is used to make authenticated requests from the app frontend, to the server.

const createServerClient = (app, options) => {
  const defaultOptions = {
    useLoading: false,
    axios: {
      baseURL: "/api",
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
        // TODO: set app loading state true

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    serverClient.interceptors.response.use(
      function (response) {
        // TODO set app loading state false

        return response;
      },
      function (error) {
        // TODO set app loading state false

        return Promise.reject(error);
      }
    );
  }

  return serverClient;
};

export default createServerClient;