import { Navigation } from '@shopify/polaris';
import {
  HomeMajor,
  SettingsMajor,
  HintMajor,
  ListMajor,
  CircleDisabledMajor,
  StarFilledMinor
} from '@shopify/polaris-icons';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AppNavigation(){
  const location = useLocation()
  const [navigationSections, setNavigationSections] = useState([])

  const NAVIGATION = {
    sections: [
      {
        title: "OSB Example App",
        routes: [
          {
            label: "Dashboard",
            url: "/",
            icon: HomeMajor,
          }
        ]
      },
      {
        title: "Development",
        routes: [
          {
            label: "Cheat Sheet",
            url: '/cheat-sheet',
            icon: HintMajor
          },
          {
            label: "Resource List Example",
            url: '/resource-list-example',
            icon: ListMajor
          },
          {
            label: "Disabled Nav Item",
            url: "/disabled-nav-item", // Will return 404, this is just an example, add jsx file located at /pages/disabled-nav-item.jsx to actually render a template
            icon: CircleDisabledMajor,
            disabled: true,
          },
          {
            label: "Nested Nav Items",
            url: "/nested",
            icon: StarFilledMinor,
            subNavigationItems: [
              {
                label: "Child Nav Item 1",
                url: "/nested/myResource1", // Will return 404, this is just an example, add jsx file located at /pages/nested/myResource1.jsx to actually render a template
              },
              {
                label: "Child Nav Item 2",
                url: "/nested/myResource2", // Will return 404, this is just an example, add jsx file located at /pages/nested/myResource1.jsx to actually render a template
              },
            ],
          }
        ]
      },
      {
        title: '',
        routes: [
          {
            label: "Settings",
            url: '/settings',
            icon: SettingsMajor
          }
        ]
      }
    ]
  }

  const isSelected = (destination) => {
    if (location.pathname === destination) {
      return true;
    }

    if (location.pathname.startsWith(destination + "/")) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    setNavigationSections(NAVIGATION)
  }, [])

  return (
    <Navigation location="/">
      { navigationSections?.sections?.map((section, index) => {
        return (
          <Navigation.Section
            key={index}
            separator
            title={section.title}
            items={section.routes.map((route) => {
              const result = {
                url: route.url,
                label: route.label,
                icon: route.icon,
                disabled: route.disabled,
                selected: isSelected(route.url),
                subNavigationItems: route.subNavigationItems,
              };


              if (route.subNavigationItems) {
                result.matches = true;
                result.subNavigationItems = route.subNavigationItems.map((childRoute) => {
                  return {
                    url: childRoute.url,
                    disabled: childRoute.disabled,
                    label: childRoute.label,
                    selected: isSelected(childRoute.url),
                  };
                });
              }

              return result;
            })}
          />
        );
      })}
  </Navigation>
  )
}