import React from "react";
import { HomePage } from "../pages/HomePage";
import { ResourcesPage } from "../pages/ResourcesPage";
import { AboutPage } from "../pages/AboutPage";
import { SettingsPage } from "../pages/SettingsPage";
import {
  ConversationMinor,
  HomeMajor,
  OrdersMajor,
  SettingsMajor,
} from "@shopify/polaris-icons";

import { ReduxTest } from "../tests/ReduxTest";
import { ServerRequestsTest } from "../tests/ServerRequestsTest";
import { LoadingTest } from "../tests/LoadingTest";
import { ModalTest } from "../tests/ModalTest";
import { ToastTest } from "../tests/ToastTest";
import { ContextualSaveBarTest } from "../tests/ContextualSaveBarTest";
import { RateLimitTest } from "../tests/RateLimitTest";
import { ErrorTest } from "../tests/ErrorTest";
import { BannerTest } from "../tests/BannerTest";

// Routes that go in the shopify admin app nav menu
export const NAVIGATION_ROUTES = {
  sections: [
    {
      title: "OSB Example App",
      action: {
        icon: ConversationMinor,
        accessibilityLabel: "Contact support",
        onClick: () => {
          alert("navigation action");
        },
      },
      routes: [
        {
          label: "Dashboard",
          destination: "/",
          element: <HomePage />,
          icon: HomeMajor,
        },
        {
          label: "About",
          destination: "/about",
          element: <ResourcesPage />,
          icon: OrdersMajor,
          disabled: true,
        },
        {
          label: "Resources",
          destination: "/resources",
          element: <AboutPage />,
          icon: OrdersMajor,
          children: [
            {
              label: "Collections",
              destination: "/resources/collections",
              element: <h1>/resources/collections test</h1>,
            },
            {
              label: "Inventory",
              destination: "/resources/inventory",
              element: <h1>/resources/inventory test</h1>,
            },
          ],
        },
      ],
    },
    {
      title: "Tests",
      routes: [
        {
          label: "Redux",
          destination: "/tests/redux",
          element: <ReduxTest />,
          icon: OrdersMajor,
        },
        {
          label: "Server Requests",
          destination: "/tests/server-request",
          element: <ServerRequestsTest />,
          icon: OrdersMajor,
        },
        {
          label: "Toasts",
          destination: "/tests/toast",
          element: <ToastTest />,
          icon: OrdersMajor,
        },
        {
          label: "Loading",
          destination: "/tests/loading",
          element: <LoadingTest />,
          icon: OrdersMajor,
        },
        {
          label: "Modals",
          destination: "/tests/modal",
          element: <ModalTest />,
          icon: OrdersMajor,
        },
        {
          label: "Save Bar",
          destination: "/tests/save-bar",
          element: <ContextualSaveBarTest />,
          icon: OrdersMajor,
        },
        {
          label: "Rate Limit",
          destination: "/tests/rate-limit",
          element: <RateLimitTest />,
          icon: OrdersMajor,
        },
        {
          label: "Error",
          destination: "/tests/error",
          element: <ErrorTest />,
          icon: OrdersMajor,
        },
        {
          label: "Banner",
          destination: "/tests/banner",
          element: <BannerTest />,
          icon: OrdersMajor,
        },
      ],
    },
    {
      title: null,
      routes: [
        {
          label: "Settings",
          destination: "/settings",
          element: <SettingsPage />,
          icon: SettingsMajor,
        },
      ],
    },
  ],
};

// Routes that need to exist but should not be in the shopify admin app nav menu
// things like a specific resource, ie /my-super-cool-list/:id, anything that's not in the nav
export const OTHER_ROUTES = [
  {
    label: "Other Route Test",
    destination: "/other-route-test",
    element: <h1>/other-route-test test</h1>,
    icon: OrdersMajor,
  },
];
