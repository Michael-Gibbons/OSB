import { Route, Routes as ReactRouterRoutes } from "react-router-dom";

import { useAppBridgeRouting } from "../../hooks";

import { NAVIGATION_ROUTES, OTHER_ROUTES } from "./RouteDefinitions";

export function AppRoutes() {
  const sections = [...NAVIGATION_ROUTES.sections];
  const mainRoutes = [...sections.map((section) => section.routes).flat()];
  const childrenRoutes = [
    ...sections
      .map((section) =>
        section.routes.map((route) =>
          route.children ? [...route.children] : []
        )
      )
      .flat(),
  ].flat();
  const ALL_ROUTES = [...mainRoutes, ...childrenRoutes, ...OTHER_ROUTES];

  // mainRoutes - top level items on nav
  // childrenRoutes - routes related to a top level nav item
  // OTHER_ROUTES - routes which are required in the app but are not in the main app nav

  useAppBridgeRouting(ALL_ROUTES);

  return (
    <ReactRouterRoutes>
      {ALL_ROUTES.map((route) => {
        return (
          <Route
            key={route.destination}
            path={route.destination}
            element={route.element}
          />
        );
      })}
    </ReactRouterRoutes>
  );
}
