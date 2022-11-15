const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    externals: {
      //     // 基本格式：
      //     // '包名' : '在项目中引入的名字'
      //     echarts: 'echarts',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex'
      //     axios: 'axios',
      //     'element-ui': 'ELEMENT',
      //     'vuex-persistedstate': 'createPersistedState',
      //     'core-js': 'core-js',
      // 'vue-aplayer': 'APlayer'

      //   }
      // }
      // target: 'web'
      // devServer: {
      //   proxy: {
      //     '/zhx': {
      //       target: 'https://b2de4f056142.akimitsu.top/', // 你需要跨域的url
      //       changeOrigin: true,
      //       ws: true,
      //       pathRewrite: {
      //         '^/zhx': ''
      //       }
      //     }
    }
  }
})
