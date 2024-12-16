import api from '..'

export const login = (data: FormData): ResponseEntity<string> => api.post('/login', data)
export const register = (data: { username: string; password: string }) => api.post('/register', data)
export const logout = (): ResponseEntity<null> => api.post('/logout')
export const getUserList = (params: GetListParamsType): ResponsePage<UserVOEntity> => api.get('/user', { params })
export const getAllLoginUser = () => api.get('/user/allLoginUser')
export const getUserInfo = (): ResponseEntity<UserVOEntity> => api.get('/user/information')
export const getUser = (id: number): ResponseEntity<UserVOEntity> => api.get(`/user/${id}`)
export const insertUser = (params: UserEntity): ResponseEntity<null> => api.post('/user', params)
export const updateUser = (params: UserEntity): ResponseEntity<null> => api.put('/user', params)
export const deleteUser = (userId: number): ResponseEntity<null> => api.delete(`/user/${userId}`)
export const modifyUser = (id: number, data: Partial<UserEntity>): ResponseEntity<null> => api.patch(`/user/${id}`, data)

export const getLoginQRCode = () => api.get('/qrcode')
export const getQRCodInformation = (qrcode: string) => api.get(`/qrcode/${qrcode}/information`)
export const checkQRCodeStatus = (qrcode: string) => api.get(`/qrcode/${qrcode}/status`)

export default {
  login,
  register,
  logout,
  getUserList,
  getAllLoginUser,
  getUserInfo,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
  modifyUser,
  getLoginQRCode,
  checkQRCodeStatus,
  getQRCodInformation,
}
