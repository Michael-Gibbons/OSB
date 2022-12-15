import { useEffect, useState } from "react";
import { useToggle } from "../../index";

export function useCreateModal(){
  const [open, toggleOpen] = useToggle(false)

  const DEFAULT_MODAL = {
    open: false,
    onClose: () => toggleOpen(false)
  }

  const [modalData, setModalData] = useState(DEFAULT_MODAL)

  const setModal = (data) => {
    const newModal = {...DEFAULT_MODAL, ...data}
    setModalData(newModal)
  }

  useEffect(() => {
    setModalData({...modalData, open})
  },[open])

  useEffect(() => {
    if(modalData.open !== open){
      toggleOpen()
    }
  }, [modalData])

  return [modalData, setModal, toggleOpen]
}