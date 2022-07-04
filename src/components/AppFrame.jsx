import React, { useCallback, useEffect, useRef, useState } from "react";
import translations from "@shopify/polaris/locales/en.json";
import { AppProvider, ActionList, Frame, TopBar } from "@shopify/polaris";
import { AppRoutes } from "./navigation/AppRoutes";
import { AppNavigation } from "./navigation/AppNavigation";
import { useNavigate } from "react-router-dom";
import { AppToast } from "./AppToast";
import { AppLoading } from "./AppLoading";
import { AppModal } from "./AppModal";
import { useSelector, useDispatch } from "react-redux";
import { AppContextualSaveBar } from "./AppContextualSaveBar";
import { setNavigation } from "../../redux/ducks/app";
import { ErrorBoundary } from "react-error-boundary";
import { AppError } from "./AppError";
import logger from "../../services/clientLogger";
import { v4 as uuidv4 } from "uuid";
import { AppBanner } from "./AppBanner";
import { AppNavigationLoading } from "./AppNavigationLoading";
import { createServerClient } from "../../services/clients";
import { useQuery } from "react-query";
import { setAppSettings } from "../../redux/ducks/settings";

export default function AppFrame() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const navigation = useSelector((state) => state.app.navigation);
  const mobileNavigationActive = navigation.mobileNavigationActive;
  const [errorId, setErrorId] = useState("");

  const serverClientOptions = {
    useLoading: true,
    axios: {
      baseURL: "",
    },
  };
  const serverClient = createServerClient(serverClientOptions);

  useQuery(
    "appSettings",
    () =>
      serverClient
        .get("/settings")
        .then(({ data }) => dispatch(setAppSettings(data))),
    { refetchOnWindowFocus: false }
  );

  const toggleMobileNavigationActive = useCallback(() => {
    dispatch(
      setNavigation({
        mobileNavigationActive: !mobileNavigationActive,
      })
    );
  }, [mobileNavigationActive]);

  const skipToContentRef = useRef(null);

  // SEARCH
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue("");
  }, []);

  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  // USER MENU
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );

  const userMenuActions = [
    {
      items: [
        {
          content: "Other page example",
          onAction: () => navigate("/other-route-test"),
        },
      ],
    },
  ];

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Michael Gibbons"
      detail="OSB Inc"
      initials="MG"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  // Polaris unfortunately does not allow us to have on `onClick` or `onAction` for the logo
  // The only way around this is a window wide click event
  const handleClick = (e) => {
    const clickedLogo = e.target.classList.contains("Polaris-TopBar__Logo");
    if (clickedLogo) {
      navigate("/");
    }
  };

  const handleError = useCallback((error, info) => {
    const newErrorId = uuidv4();
    setErrorId(newErrorId);
    logger.error("Frontend App Crash", {
      id: newErrorId,
      error: error.message,
      info,
    });
  }, []);

  // init listener on mount
  useEffect(() => {
    window.addEventListener("click", (e) => handleClick(e));
  }, []);

  // destroy listener on unmount
  useEffect(() => {
    return () => {
      window.removeEventListener("click", (e) => handleClick(e));
    };
  }, []);

  return (
    <div style={{ height: "500px" }}>
      <AppProvider i18n={translations}>
        <ErrorBoundary
          onError={(error, info) => handleError(error, info)}
          fallbackRender={({ error, resetErrorBoundary }) => {
            return <AppError errorId={errorId} />;
          }}
        >
          <Frame
            topBar={topBarMarkup}
            navigation={loading ? <AppNavigationLoading /> : <AppNavigation />}
            showMobileNavigation={mobileNavigationActive}
            onNavigationDismiss={toggleMobileNavigationActive}
            skipToContentTarget={skipToContentRef.current}
          >
            <AppBanner />
            <AppModal />
            <AppToast />
            <AppContextualSaveBar />
            {loading ? <AppLoading /> : <AppRoutes />}
          </Frame>
        </ErrorBoundary>
      </AppProvider>
    </div>
  );
}
