import { useCallback, useEffect, useState } from "react"

export function useArrayState(initialValue = [], sort = () => {}, identifierKey = 'id'){

  if(!(Array.isArray(initialValue))){
    throw new Error("Error in useArrayState, initial value must be of type Array")
  }

  const [state, setState] = useState(initialValue)

  useEffect(() => {
    if(state.length && !state.every(item => Object.hasOwn(item, identifierKey))){
      throw new Error(`Error in useArrayState, all items do not have the identifier key "${identifierKey}"`)
    }
  }, [state, identifierKey])

  const add = useCallback((item) => {

    const stateCopy = structuredClone(state)
    stateCopy.push(item)
    stateCopy.sort(sort)
    setState(stateCopy)

  }, [state, sort, identifierKey])

  const edit = useCallback((id, payload) => {
    const stateCopy = structuredClone(state)
    let itemToEdit = stateCopy.find(item => item[identifierKey] === id)
    const editedItem = {
      ...itemToEdit,
      ...payload
    }

    Object.assign(itemToEdit, editedItem)

    stateCopy.sort(sort)

    setState(stateCopy)

  }, [state, sort, identifierKey])

  const remove = useCallback((id) => {

    const stateCopy = structuredClone(state)
    const itemToRemove = state.findIndex(item => item[identifierKey] === id)
    stateCopy.splice(itemToRemove, 1)
    stateCopy.sort(sort)
    setState(stateCopy)

  }, [state, sort, identifierKey])

  const setStateWithSort = useCallback((newState) => {
    const newStateCopy = structuredClone(newState)
    newStateCopy.sort(sort)
    setState(newStateCopy)
  }, [state, sort, identifierKey])

  return [state, setStateWithSort, add, edit, remove]
}

