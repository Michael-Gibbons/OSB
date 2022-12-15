import {useLocalStorage} from "./index";

export function usePreferences(){
  const [storedPreferences, setStoredPreferences] = useLocalStorage('OSB_APP_PREFERENCES', {})

  const get = (key, initialValue = undefined) => {
    if(!key){
      return storedPreferences
    }

    const preferenceByKey = storedPreferences[key]

    if(preferenceByKey !== undefined){
      return preferenceByKey
    }

    if(initialValue === undefined){
      throw new Error(`Error in usePreferences hook, no initial value set for the name of ${preferenceByKey}.`);
    }

    setStoredPreferences({...storedPreferences, [key]: initialValue})

    return initialValue
  }

  const set = (key, value) => {
    const preferenceByKey = storedPreferences[key]

    if(!preferenceByKey){
      throw new Error(`Error in usePreferences hook, no key by the name of ${preferenceByKey}.`);
    }

    if(value !== preferenceByKey){
      setStoredPreferences({...storedPreferences, [key]: value})
    }

    return value
  }

  const deleteItem = (key) => {// delete is protected key word
    const preferenceByKey = storedPreferences[key]

    if(!preferenceByKey){
      return
    }

    const preferencesCopy = structuredClone(storedPreferences)
    delete preferencesCopy[key]

    if(JSON.stringify(preferencesCopy) !== JSON.stringify(storedPreferences)){
      setStoredPreferences(preferencesCopy)
    }
  }

  const preferences = {
    get,
    set,
    delete: deleteItem
  }

  return preferences
}