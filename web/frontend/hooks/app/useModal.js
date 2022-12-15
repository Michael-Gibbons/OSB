import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

export function useModal(){
  const { modal } = useContext(AppContext)
  const { setModal, toggleModal } = modal

  return [ setModal, toggleModal ]
}