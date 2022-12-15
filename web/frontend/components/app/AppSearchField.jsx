import { TopBar } from "@shopify/polaris";
import { useCallback } from "react";

export default function AppSearchField({ searchValue, setSearchValue, setIsSearchActive }){
  const handleSearchChange = useCallback((value) => {
    setSearchValue(value);
    setIsSearchActive(value.length > 0);
  }, []);

  return (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
      showFocusBorder
    />
  )
}