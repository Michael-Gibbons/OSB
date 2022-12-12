export default function useSettings(){
  // TODO: implement get settings and save settings
  const TEMP_SETTINGS = {
    email: 'exampleEmail@gmail.com',
    coolBooleanSetting: false,
    coolEnumSetting: "1"
  }

  const saveSettings = (newSettings) => {
    console.log('save new settings', newSettings)
  }

  return [TEMP_SETTINGS, saveSettings]
}