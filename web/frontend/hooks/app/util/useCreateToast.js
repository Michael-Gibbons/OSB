import { useState } from "react";

export function useCreateToast(){
  const [toastData, setToastData] = useState({content: ''})

  const setToast = (data) => {
    setToastData(data)
  }

  return [toastData, setToast]
}