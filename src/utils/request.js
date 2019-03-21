import axios from 'axios'
import router from '@/router'
const http = axios.create({
  timeout: 1000 * 120,
  withCredentials: true
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data.code === 401 || response.data.code === 10001) {
    // router.replace({ name: 'login' })
    return Promise.reject(response.data.msg)
  }
  return response
}, error => {
  return Promise.reject(error)
})

export default http
