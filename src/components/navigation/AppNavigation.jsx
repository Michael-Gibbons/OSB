import { Navigation } from "@shopify/polaris";
import { useLocation, useNavigate } from "react-router-dom";

import { useCallback } from "react";
import { NAVIGATION_ROUTES } from "./RouteDefinitions";
import { useDispatch } from "react-redux";
import { setNavigation } from "../../../redux/ducks/app";

export function AppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleNavigate = useCallback(
    (destination) => {
      const sections = [...NAVIGATION_ROUTES.sections];
      const mainRoutes = [...sections.map((section) => section.routes).flat()];
      const foundRoute = mainRoutes.find(
        (route) => route.destination === destination
      );

      navigate(destination);
      if (!foundRoute || !foundRoute.children || !foundRoute.children.length) {
        dispatch(
          setNavigation({
            mobileNavigationActive: false,
          })
        );
      }
    },
    [location]
  );

  const isSelected = (destination) => {
    if (location.pathname === destination) {
      return true;
    }

    if (location.pathname.startsWith(destination + "/")) {
      return true;
    }

    return false;
  };

  return (
    <Navigation location={location.pathname}>
      {NAVIGATION_ROUTES.sections.map((section, index) => {
        return (
          <Navigation.Section
            key={index}
            separator
            title={section.title}
            action={{
              icon: section?.action?.icon || "",
              accessibilityLabel: section?.action?.accessibilityLabel || "",
              onClick: () => {
                section?.action?.onClick();
              },
            }}
            items={section.routes.map((route) => {
              const result = {
                disabled: route.disabled,
                label: route.label,
                icon: route.icon,
                onClick: () => handleNavigate(route.destination),
                selected: isSelected(route.destination),
              };

              if (route.children) {
                result.url = false; // This causes a warning but due to limitations with polaris it is unavoidable if you're using a client side routing package
                result.matches = true;
                result.subNavigationItems = route.children.map((childRoute) => {
                  return {
                    disabled: childRoute.disabled,
                    label: childRoute.label,
                    onClick: () => handleNavigate(childRoute.destination),
                    selected: isSelected(childRoute.destination),
                  };
                });
              }

              return result;
            })}
          />
        );
      })}
    </Navigation>
  );
}
