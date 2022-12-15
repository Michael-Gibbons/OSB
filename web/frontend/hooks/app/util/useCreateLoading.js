import { useState } from "react";

export function useCreateLoading(){
  const [loading, setLoading] = useState(false)

  return [loading, setLoading]
}