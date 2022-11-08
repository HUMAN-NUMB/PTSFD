import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  // 路由重定向
  // {
  //   path: '/',
  //   redirect: 'login'
  // },
  {
    name: '/reg',
    path: '/reg',
    // webpack提供的import函数来路由懒加载导入组件
    // 路由懒加载，就是页面路由路径切换到/reg时才去加载对应组件代码
    // 好处：让首页加载文件体积更新，打开更快
    component: () => import('@/views/register')
  },
  {
    name: '/login',
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout/index'),
    children: [{
      name: 'exit',
      path: 'exit',
      component: () => import('@/views/routes/my-exit.vue')
    },
    {
      name: 'main',
      path: 'main',
      component: () => import('@/views/routes/my-main.vue')
    },
    {
      name: 'user',
      path: 'user',
      component: () => import('@/views/routes/my-user.vue')
    },
    {
      name: 'laugh',
      path: 'laugh',
      component: () => import('@/views/routes/my-laugh.vue')
    }
    ]

  }
]
const router = new VueRouter({ routes })
// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  // token是资源请求的条件，防止401
  // 当有token 或 为了避免进入主页后，切换别的路由时重复请求执行时才进行用户信息获取
  if (store.state.token && !store.state.userInfo.username) { store.dispatch('initUserInfo') }

  next()
})
export default router
