import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

export default function useLoading(){
  const { loading } = useContext(AppContext)
  const { setLoading } = loading

  return [ setLoading ]
}