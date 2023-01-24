import { useEffect, useState } from "react";

export function useExtractDataFromAppQuery(data){
  const [extractedData, setExtractedData] = useState({})

  useEffect(() => {
    if(data && JSON.stringify(data) !== JSON.stringify(extractedData)){
      setExtractedData(data.data.data.attributes)
    }
  }, [data])

  return [extractedData]
}