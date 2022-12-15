import { useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { useLoading } from "../../index";
import { useToast } from "../../index";
import { useLogger } from "../../index";

export function useAppQuery(queryKey, queryFn, queryOptions = {}) {
  const [setLoading] = useLoading()
  const [setToast] = useToast()
  const logger = useLogger()

  const fetch = useMemo(() => {
    return async () => await queryFn()
  }, [queryKey, JSON.stringify(queryFn)]);

  const { isLoading, isError, isSuccess, isIdle, data, error, isFetching, refetch } = useQuery(queryKey, fetch, { ...queryOptions, refetchOnWindowFocus: false })

  useEffect(() => {
    if (isSuccess) {
      setLoading(false)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isLoading) {
      setLoading(true)
    }
  }, [isLoading])

  useEffect(() => {
    if (isError) {
      setLoading(false)
      setToast({ active: true, content: "Server error", error: true })
      logger.error("Frontend: Failed Query", error)
    }
  }, [isError])

  return { isLoading, isError, isSuccess, isIdle, data, error, isFetching, refetch }
}