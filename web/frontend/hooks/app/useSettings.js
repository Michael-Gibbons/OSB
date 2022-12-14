import useAppMutation from "../react-query/util/useAppMutation"
import useAppQuery from "../react-query/util/useAppQuery"
import { useServerClient } from "../util/useServerClient"

export default function useSettings(reactQueryOptions = {}, reactQueryMutationOptions = {}){
  const serverClient = useServerClient()
  
  const { data: settings } = useAppQuery('settings', () => serverClient.get('/settings').then(res => res.data.data[0].attributes.settings), reactQueryOptions)

  const { mutate: saveSettings } = useAppMutation((data) => serverClient.post('/settings', data).then(res => res.data.data[0].attributes.settings), reactQueryMutationOptions)

  return [settings, saveSettings]
}