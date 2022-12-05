import { ActionList } from "@shopify/polaris"

export default function AppSearchResults({ searchValue }){
  // Do whatever you need to do in here, filter results by search etc
  const items = [{content: 'Shopify help center'}, {content: 'Community forums'}]
  
  return (
    <ActionList
      items={items}
    />
  )
}