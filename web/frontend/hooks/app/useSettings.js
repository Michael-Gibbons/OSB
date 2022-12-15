import {useAppMutation} from "../index"
import {useAppQuery} from "../index"
import {useServerClient} from "../index"

export function useSettings(reactQueryOptions = {}, reactQueryMutationOptions = {}){
  const serverClient = useServerClient()

  const { data: settings } = useAppQuery('settings', () => serverClient.get('/settings').then(res => res.data.data[0].attributes.settings), reactQueryOptions)

  const { mutate: saveSettings } = useAppMutation((data) => serverClient.post('/settings', data).then(res => res.data.data[0].attributes.settings), reactQueryMutationOptions)

  return [settings, saveSettings]
}