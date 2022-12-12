import { useEffect } from "react"
import useContextualSaveBar from "../useContextualSaveBar"
import useSettings from "../useSettings"
import useToast from "../useToast"

export default function useCreateSettings(settings){
  const [shopSettings, saveSettings] = useSettings()
  const [setContextualSaveBar, setIsDirty] = useContextualSaveBar()
  const [setToast] = useToast()

  const validateNewSettings = () => {
    const isValid = settings.every(setting => setting.isValid)
    return isValid
  }

  const handleSave = () => {
    const isValid = validateNewSettings()

    if(!isValid){
      setToast({content: 'Invalid Settings', error: true})

      return
    }

    const newSettings = {}
    settings.forEach(setting => {
      newSettings[setting.name] = setting.value
    })

    saveSettings(newSettings)
    setIsDirty(false)
  }

  const handleDiscard = () => {
    resetSettings()
    setIsDirty(false)
  }

  const handleDependencyChange = (isDirty) => {
    if(isDirty){
      setContextualSaveBar({
        isDirty: true,
        saveAction: {
          onAction: handleSave
        },
        discardAction: {
          onAction: handleDiscard
        }
      })
    }else{
      setContextualSaveBar({ isDirty: false })
    }
  }

  const resetSettings = () => {
    settings.forEach(setting => setting.setter(setting.default))
  }

  useEffect(() => {
    const isDirty = !settings.every(setting => JSON.stringify(setting.value) === JSON.stringify(setting.default))
    handleDependencyChange(isDirty)
  }, settings.map(setting => setting.value))
}