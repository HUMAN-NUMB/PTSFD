const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
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
  //   }
  // }
})
