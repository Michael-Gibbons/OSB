import { useEffect, useState } from "react";
import { useToggle } from "../../index";

export function useCreateBanner(){
  const [active, toggleActive] = useToggle(false)

  const DEFAULT_BANNER = {
    active: false,
    title: "",
    status: "info",
    onDismiss: () => toggleActive(false)
  }

  const [bannerData, setBannerData] = useState(DEFAULT_BANNER)

  const setBanner = (data) => {
    const newBanner = {...DEFAULT_BANNER, ...data}
    setBannerData(newBanner)
  }

  useEffect(() => {
    setBannerData({...bannerData, active})
  }, [active])

  useEffect(() => {
    if(bannerData.active !== active){
      toggleActive()
    }
  }, [bannerData])

  return [bannerData, setBanner, toggleActive]
}