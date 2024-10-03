import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 6000
})

// 请求拦截器
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use((response) => {
  return new Promise((resolve, reject) => {
    const { data } = response
    if (data.code === 200) {
      resolve(data)
    } else {
      reject(data.message ?? data.msg)
    }
  })
}, (error) => {
  return Promise.reject(error)
})

export default api
