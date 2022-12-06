import { TopBar } from "@shopify/polaris";
import AppUserMenu from "./AppUserMenu";
import { useState } from "react";
import AppSearchField from "./AppSearchField";
import AppSearchResults from "./AppSearchResults";
import AppSecondaryMenu from "./AppSecondaryMenu";

export default function AppTopBar({ toggleMobileNavigationActive }){
  const [searchValue, setSearchValue] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <TopBar
      showNavigationToggle
      userMenu={<AppUserMenu/>}
      searchField={<AppSearchField searchValue={searchValue} setSearchValue={setSearchValue} setIsSearchActive={setIsSearchActive} />}
      searchResultsVisible={isSearchActive}
      searchResults={<AppSearchResults searchValue={searchValue}/>}
      secondaryMenu={<AppSecondaryMenu/>}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  )
}