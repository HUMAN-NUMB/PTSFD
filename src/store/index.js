import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// api获取用户信息
import { getUserInfoAPINew } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用来存储登录成功之后，得到的token
    token: '',
    // 刷新令牌
    refresh: '',
    // 用来存储登录成功并跳转到主页面时，得到的用户信息
    userInfo: {}
  },
  getters: {
    // username: (state) => state.userInfo.username,
    nickname: (state) => state.userInfo.nickname,
    sex: (state) => state.userInfo.sex,
    area: (state) => state.userInfo.area,
    contact: (state) => state.userInfo.contact,
    image: (state) => state.userInfo.image,
    introduction: (state) => state.userInfo.introduction,
    birthday: (state) => state.userInfo.birthday
  },
  mutations: {
    // 更新token的函数
    updataToken (state, newToken) {
      state.token = newToken
    },
    // 获取refresh的函数
    updateRefresh (state, newValue) {
      state.refresh = newValue
    },
    // 将获取到的用户信息存入vuex
    updateUserInfo (state, newUI) {
      state.userInfo = newUI
    }
  },
  actions: {
    // 异步获得用户信息
    async initUserInfo (context) {
      const { data: res } = await getUserInfoAPINew()
      console.log(res)
      context.commit('updateUserInfo', res)
    }
  },
  modules: {
  },
  // 配置为vuex的插件
  plugins: [createPersistedState()]
})
// vuex默认保存再内存中，刷新会清空
