import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// api获取用户信息
import { getUserInfoAPI } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用来存储登录成功之后，得到的token
    token: '',
    // 用来存储登录成功并跳转到主页面时，得到的用户信息
    userInfo: {}
  },
  getters: {
    username: (state) => state.userInfo.username,
    nickname: (state) => state.userInfo.nickname,
    user_pic: (state) => state.userInfo.user_pic
  },
  mutations: {
    // 更新token的函数
    updataToken (state, newToken) {
      state.token = newToken
    },
    // 将获取到的用户信息存入vuex
    updateUserInfo (state, newUI) {
      state.userInfo = newUI
    }
  },
  actions: {
    // 异步获得用户信息
    async initUserInfo (context) {
      const { data: res } = await getUserInfoAPI()
      if (res.code === 0) { context.commit('updateUserInfo', res.data) }
    }
  },
  modules: {
  },
  // 配置为vuex的插件
  plugins: [createPersistedState()]
})
// vuex默认保存再内存中，刷新会清空
