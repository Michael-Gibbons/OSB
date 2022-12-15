import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

export function useLoading(){
  const { loading } = useContext(AppContext)
  const { setLoading } = loading

  return [ setLoading ]
}