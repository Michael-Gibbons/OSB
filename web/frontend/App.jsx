import { BrowserRouter } from "react-router-dom";
import AppFrame from "./components/app/AppFrame";
import { registerFrontendAddons } from "./addons";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";

export default function App() {

  registerFrontendAddons({
    host: process.env.HOST
  })

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <AppFrame/>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
