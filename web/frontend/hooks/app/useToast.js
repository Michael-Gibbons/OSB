import AppContext from "../../contexts/AppContext";
import { useContext } from "react";

export function useToast(){
  const { toast } = useContext(AppContext)
  const { setToast } = toast

  return [ setToast ]
}