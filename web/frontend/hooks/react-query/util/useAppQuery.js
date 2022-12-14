import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import useLoading from "../../app/useLoading";
import useToast from "../../app/useToast";
import { useLogger } from "../../util/useLogger";

export default function useAppQuery(queryKey, queryFn, queryOptions = {}){
  const [setLoading] = useLoading()
  const [setToast] = useToast()
  const logger = useLogger()

  const fetch = useMemo(() => {
    return async () => await queryFn()
  }, [queryKey, JSON.stringify(queryFn)]);

  const { isLoading, isError, isSuccess, isIdle, data, error, isFetching } = useQuery(queryKey, fetch, {...queryOptions, refetchOnWindowFocus: false})

  useEffect(() => {
    if(isSuccess){
      setLoading(false)
    }
  }, [isSuccess])

  useEffect(() => {
    if(isLoading){
      setLoading(true)
    }
  },[isLoading])

  useEffect(() => {
    if(isError){
      setLoading(false)
      setToast({active: true, content: "Server error", error: true})
      logger.error("Frontend: Failed Query", error)
    }
  },[isError])

  return { isLoading, isError, isSuccess, isIdle, data, error, isFetching }
}