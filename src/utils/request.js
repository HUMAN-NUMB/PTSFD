// 基于axios封装，网络请求的函数
import axios from 'axios'
import { Message } from 'element-ui'
// axios.create()创建一个带配置项的自定义axios函数
// myAxios请求的时候，地址baseURL+url，然后去请求服务器
export const myAxios = axios.create({
  baseURL: 'http://big-event-vue-api-t.itheima.net'
})
export const myAxiosNew = axios.create({
  baseURL: 'https://b2de4f056142.akimitsu.top/'
})

// 定义响应拦截器--针对登录失败和注册失败
myAxiosNew.interceptors.response.use(function (response) {
  // 响应http状态码为2xx或3xx时触发成功的回调，形参中的“response”是“成功的结果”
  // return到axios原地Promise对象，作为成功的结果
  return response
}, function (err) {
  console.dir(err)
  // 登录失败的情况，提示
  if (err.response.status === 401) {
    Message.error('登录失败')
  } else if (err.response.status === 400) {
    Message.error('表单提交有误!')
  }
  // 响应状态码为4xx，5xx时触发失败的回调，形参中的error是“失败的结果”
  // return到axios原地Promise对象，作为失败拒绝的状态（如果那边用try+catch或者catch捕获，
  // 可以捕获到我们传递过去的这个err变量的值）
  return Promise.reject(err)
}
)
// 导出axios自定义函数
// export default myAxios
// export default myAxiosNew
