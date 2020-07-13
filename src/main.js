/*
 * @Author: chenhaiwang
 * @Date: 2020-07-11 11:43:21
 * @LastEditors: chenhaiwang
 * @LastEditTime: 2020-07-13 21:53:52
 * @FilePath: \vue_management\src\main.js
 * @Description: 头部注释
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局样式表
import './assets/css/global.css'

// 引入axios 
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
