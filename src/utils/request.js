import axios from 'axios'
// 引入store
import store from '@/store'
import router from '@/router'
const request = axios.create({
  baseURL: 'https://shop.fed.lagounews.com/api'
})

// 在请求拦截器中进行token设置
request.interceptors.request.use(config => {
  // 获取token
  const { token } = store.state.user
  // 设置请求头
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

// 在响应拦截器中进行失败处理
request.interceptors.response.use(config => {
  // 响应状态为41000时，说明未登录访问了相关接口
  // 跳转登录页
  // console.log(config.data)
  if (config.data.status === 410000) {
    router.push({
      name: 'login',
      query: {
        redirect: router.currentRoute.fullPath
      }
    })
  }
  return config
})

export default request
