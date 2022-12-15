import { useEffect } from "react"
import {useContextualSaveBar} from "../../index"
import {useLoading} from "../../index"
import {useSettings} from "../../index"
import {useToast} from "../../index"
import { useQueryClient } from "react-query"

export function useCreateSettings(settings, loading = true){
  const queryClient = useQueryClient()
  const [shopSettings, saveSettings] = useSettings({}, {onSuccess: () => queryClient.invalidateQueries('settings')})
  const [setContextualSaveBar, setIsDirty] = useContextualSaveBar()
  const [setToast] = useToast()
  const [setLoading] = useLoading()

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
    if(isDirty && !loading){
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

  useEffect(() => {
    setLoading(loading)
  },[loading])
}