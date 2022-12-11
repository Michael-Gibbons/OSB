import { Loading } from "@shopify/polaris";

export default function AppLoading({ loading }){
  const loadingBar = document.querySelector('.Polaris-Frame-Loading__Level')

  if(loadingBar){
    loadingBar.parentNode.removeChild(loadingBar);// Fixes polaris bug, polaris not cleaning up old loading html on unmount
  }

  return loading ? <Loading/> : null
}