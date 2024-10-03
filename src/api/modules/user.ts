import api from "..";

export function login(data: { username: string, password: string }) {
  const form = new FormData()
  form.append('username', data.username)
  form.append('password', data.password)
  return api.post('/login', form)
}


export default {
  login
}
