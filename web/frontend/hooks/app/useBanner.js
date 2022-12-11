import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

export default function useBanner(){
  const { banner } = useContext(AppContext)
  const { setBanner, toggleBanner } = banner

  return [ setBanner, toggleBanner ]
}