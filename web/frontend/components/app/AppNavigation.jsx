import { Navigation } from '@shopify/polaris';
import {
  HomeMajor,
  OrdersMajor,
  SettingsMajor,
} from '@shopify/polaris-icons';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

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
          },
          {
            label: "About",
            url: "/about",
            icon: OrdersMajor,
            disabled: true,
          },
          {
            label: "Resources",
            url: "/resources",
            icon: OrdersMajor,
            subNavigationItems: [
              {
                label: "Collections",
                url: "/resources/collections",
              },
              {
                label: "Inventory",
                url: "/resources/inventory",
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