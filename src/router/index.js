/*
 * @Author: chenhaiwang
 * @Date: 2020-07-11 11:43:21
 * @LastEditors: chenhaiwang
 * @LastEditTime: 2020-07-15 23:10:01
 * @FilePath: \vue_management\src\router\index.js
 * @Description: 头部注释
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Wecome from '../components/Wecome.vue'
import Users from '../components/user/Users.vue'

// 解决ElementUI导航栏中的vue-rotuer在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/wecome',
    children: [
      { path: '/wecome', component: Wecome },
      { path: '/users', component: Users }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数 表示放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})
export default router
