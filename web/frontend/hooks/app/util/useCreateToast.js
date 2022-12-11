import { useState } from "react";

export default function useCreateToast(){
  const [toastData, setToastData] = useState({content: ''})

  const setToast = (data) => {
    setToastData(data)
  }

  return [toastData, setToast]
}