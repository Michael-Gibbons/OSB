import { useState } from "react";

export default function useCreateLoading(){
  const [loading, setLoading] = useState(false)

  return [loading, setLoading]
}