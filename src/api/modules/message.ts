import api from '..'

export const sendPublicMessage = (params: any) => api.post('/message/public', params)
export const sendPrivateMessage = (params: any) => api.post('/message/private', params)

export default {
  sendPublicMessage,
  sendPrivateMessage
}
