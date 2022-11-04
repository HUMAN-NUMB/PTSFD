// 封装的是具体的接口请求方法
// 注意：每个方法只负责请求一个url地址
import myAxios from '@/utils/request'
// 引入store
import store from '../store/index'
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
/**
 *
 * @param {*} param0 {username:用户名，password:密码}
 * @returns Promise对象
 */
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
// 获得用户信息
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
