import axios from 'axios'
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";

export function useServerClient(axiosOptions = {}){
  const app = useAppBridge();

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

  return serverClient
}