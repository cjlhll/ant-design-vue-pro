import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import qs from 'qs'
import url from '../../url'
import defaultConfig from '../config/defaultSettings'
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  // baseURL: url + '/admin/',
  baseURL: process.env.NODE_ENV === 'production' ? url + '/Admin' : '/api',
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = storage.get(ACCESS_TOKEN)
  if (config.method === 'post' && config.data instanceof FormData === false) {
    // console.log(config.data);
    config.data = qs.stringify(config.data)
  }
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers[defaultConfig.tokenKey] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  const resData = response.data
  if (resData.info || resData.msg) {
    if (resData.status === 1) {
      notification.success({
        message: '提示',
        description: resData.msg || resData.info
      })
    } else {
      notification.error({
        message: '错误',
        description: resData.msg || resData.info
      })
    }
  }
  if (resData.status === 1) {
    return resData
  } else {
    return Promise.reject(resData)
  }
  // return response.data
}, errorHandler)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export {
  installer as VueAxios,
  request as axios
}
