// 封装的是具体的接口请求方法
// 注意：每个方法只负责请求一个url地址
import { myAxios, myAxiosNew, myAxiosNewFromYiYan } from '@/utils/request'
// import {  } from '@/utils/request'
// 引入store
import store from '../store/index'
// 旧注册
export const getListAPI = ({ username, password, repassword }) => {
  // 原地是一个Promise对象（内部包含原生ajax请求）
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return myAxios({
    url: '/api/reg',
    method: 'POST',
    // axios传参params，data
    // params的对象参数名和值，axios源码会把参数和值，拼接在url?后面给后台（query查询字符串）
    // data的对象参数名和值，axios源码会把参数和值，拼接在请求体里（body参数）
    data: {
      username,
      password,
      repassword
    }
  })
}
// 新注册
export const getListAPINew = ({ username, password, repassword }) => {
  // 原地是一个Promise对象（内部包含原生ajax请求）
  // return这个Promise对象到逻辑页面，去那边对Promise对象提取结果
  return myAxiosNew({
    url: '/register',
    method: 'POST',
    // axios传参params，data
    // params的对象参数名和值，axios源码会把参数和值，拼接在url?后面给后台（query查询字符串）
    // data的对象参数名和值，axios源码会把参数和值，拼接在请求体里（body参数）
    data: {
      username,
      password,
      repassword
    }
  })
}

/**
 *
 * @param {*} param0 {username:用户名，password:密码}
 * @returns Promise对象
 */
// 旧登录
export const loginAPI = ({ username, password }) => {
  return myAxios({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
// 新登录
export const loginAPINew = ({ username, password }) => {
  return myAxiosNew({
    url: '/auth',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

// 更新token
export const UpdateTokenAPI = (refresh) => {
  return myAxiosNew({
    url: '/auth/refresh',
    method: 'POST',
    data: {
      refresh: refresh
    }
  })
}
// 获得用户信息--旧
export const getUserInfoAPI = () => {
  return myAxios({
    url: '/my/userinfo',
    // method不屑默认就是‘get’方式请求
    method: 'GET',
    // 传参给后台：params（查询字符串query）、data（请求体body）、headers（请求头）
    // 由于this此处指向无法指向vm，所以要引入store
    headers: { Authorization: store.state.token }
  })
}
// 获得用户信息--新
export const getUserInfoAPINew = () => {
  return myAxiosNew({
    url: '/info',
    // method不屑默认就是‘get’方式请求
    method: 'GET',
    // 传参给后台：params（查询字符串query）、data（请求体body）、headers（请求头）
    // 由于this此处指向无法指向vm，所以要引入store

    headers: { Authorization: store.state.token }
  })
}

// 更新头像信息
export const updateAvatarAPI = (form) => {
  return myAxiosNew({
    url: '/info',
    method: 'PATCH',
    data: form,
    headers: { Authorization: store.state.token }
  })
}

/**
 * 等待接口 用户个人信息
 */
// export const saveUserInfoAPI = ({ name, age, birthday, briefInfo, contact, area }) => {
//   return myAxiosNew(
//     {
//       url: '/info/',
//       method: 'PUT',
//       data: {
//         name, age, birthday, briefInfo, contact, area
//       },
//       headers: { Authorization: store.state.token }
//     }
//   )
// }

/**
 * 等待接口 可以写死
 */
// export const getBookSourseAPI = () => {
//   return myAxios(
//     {
//       url: '',
//       method: '',
//       data: {},
//       headers: {}
//     }
//   )
// }

/**
 * 获取题目资源
 */
export const getTestSourseAPI = () => {
  return myAxiosNew(
    {
      url: '/question',
      method: 'GET',
      // data: { },
      headers: { Authorization: store.state.token, advance: '' }
    }
  )
}

/**
 * 发送分数记录给后台
 */
export const sendScoreToBackEnd = (score) => {
  return myAxiosNew(
    {
      url: '/score',
      method: 'POST',
      data: { score },
      headers: { Authorization: store.state.token }

    }
  )
}

/**
 * 获取用户的答题信息
 */
export const getScoreAndCount = () => {
  return myAxiosNew(
    {
      url: '/score',
      method: 'GET',
      // data: { score },
      headers: { Authorization: store.state.token }

    }
  )
}
/**
 * 获得一言文字
 */
export const getTestFromYiYan = () => {
  return myAxiosNewFromYiYan(
    {
      url: '',
      params: { c: 'f', encode: 'text' }
    }
  )
}
