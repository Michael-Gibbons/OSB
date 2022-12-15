import { useState, useEffect } from "react"

export function useCreateContextualSaveBar(){
  const [isDirty, setIsDirty] = useState(false)

  const DEFAULT_CONTEXTUAL_SAVEBAR = {
    isDirty: false,
    saveAction: {
      onAction: () => {},
    },
    discardAction: {
      onAction: () => {},
    },
  }

  const [contextualSaveBarData, setContextualSaveBarData] = useState(DEFAULT_CONTEXTUAL_SAVEBAR)

  const setContextualSaveBar = (data) => {
    const newContextualSaveBar = {...DEFAULT_CONTEXTUAL_SAVEBAR, ...data}
    setContextualSaveBarData(newContextualSaveBar)
  }

  useEffect(() => {
    setContextualSaveBarData({...contextualSaveBarData, isDirty})
  }, [isDirty])

  useEffect(() => {
    if(contextualSaveBarData.isDirty !== isDirty){
      setIsDirty(!isDirty)
    }
  }, [contextualSaveBarData])

  return [contextualSaveBarData, setContextualSaveBar, setIsDirty]
}