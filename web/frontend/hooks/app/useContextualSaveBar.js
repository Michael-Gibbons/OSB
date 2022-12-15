import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

export function useContextualSaveBar(){
  const { contextualSaveBar } = useContext(AppContext)
  const { setContextualSaveBar, setIsDirty } = contextualSaveBar

  return [ setContextualSaveBar, setIsDirty ]
}