import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

export default function useToast(){
  const { toast } = useContext(AppContext)
  const { setToast } = toast

  return [ setToast ]
}