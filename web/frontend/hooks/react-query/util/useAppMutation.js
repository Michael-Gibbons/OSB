import { useEffect } from "react";
import { useMutation } from "react-query";
import { useLoading } from "../../index";
import {useToast} from "../../index";
import {useLogger} from "../../index";

export function useAppMutation(mutateFn, reactQueryMutationOptions){
  const { isIdle, isLoading, isError, isSuccess, error, data, mutate } = useMutation(mutateFn, reactQueryMutationOptions)

  const [setLoading] = useLoading()
  const [setToast] = useToast()
  const logger = useLogger()

  useEffect(() => {
    if(isSuccess){
      setLoading(false)
      setToast({ active: true, content: "Success" })
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
      logger.error("Frontend: Failed Mutation", error)
    }
  },[isError])

  return { isIdle, isLoading, isError, isSuccess, error, data, mutate }
}