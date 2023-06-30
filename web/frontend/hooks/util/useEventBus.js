import { BroadcastChannel } from 'broadcast-channel';

export function useEventBus(channelName = 'OSB_DEFAULT_CHANNEL'){

  const bus = new BroadcastChannel(channelName);

  bus.on = (type, cb) => {
    bus.onmessage = (event) => {
      if(event.type === type){
        cb(event)
      }
    }
  }

  return [bus]
}