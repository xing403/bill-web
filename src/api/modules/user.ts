import api from "..";

export function login(data: { username: string, password: string }) {
  const form = new FormData()
  form.append('username', data.username)
  form.append('password', data.password)
  return api.post('/login', form)
}

export const register = (data: { username: string, password: string }) => api.post('/register', data);

export const logout = () => api.post('/logout')
export const getUserList = (params: any) => api.get('/user/list', { params });
export const getAllLoginUser = () => api.get('/user/allLoginUser')
export const getUserInfo = () => api.get('/user/information')
export const addUser = (params: any) => api.post('/user', params)
export const deleteUser = (userId: number) => api.delete(`/user/${userId}`)

export default {
  login,
  register,
  logout,
  getUserList,
  getAllLoginUser,
  getUserInfo,
  addUser,
  deleteUser
}
