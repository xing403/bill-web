import { Client, IFrame } from '@stomp/stompjs';
import { defineStore } from 'pinia'

export default defineStore('socket', () => {
  const client = ref<Client | null>(null)
  const isConnected = computed(() => !!client.value && client.value.connected)
  /**
   * connect websocket
   * @param url
   * @param token
   */
  const connect = (url: string, token: string, onConnect?: (frames: IFrame) => void) => {
    client.value = new Client({
      brokerURL: `${url}?token=${token}`,
      onConnect
    });
    client.value.activate();
    return client
  }
  /**
   * subscribe socket topic
   * @param client
   * @param topic
   * @param callback
   */
  const subscribe = (topic: string, callback: (message: string) => void) => {
    client.value?.subscribe(topic, (message) => {
      try {
        callback(JSON.parse(message.body));
      } catch (e) {
        callback(message.body);
      }
    });
  }
  /**
   * cancel subscribe topic
   * @param client
   * @param topic
   */

  const unsubscribe = (topic: string) => {
    client.value?.unsubscribe(topic);
  }
  /**
   * publish socket message
   * @param client
   * @param topic
   * @param body
   */
  const publish = (topic: string, body: string) => {
    client.value?.publish({ destination: topic, body });
  }

  return {
    client,
    isConnected,
    connect,
    subscribe,
    unsubscribe,
    publish,
  }

})
