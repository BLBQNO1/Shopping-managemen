/*
 * @Author: chenhaiwang
 * @Date: 2020-07-11 11:44:47
 * @LastEditors: chenhaiwang
 * @LastEditTime: 2020-07-13 23:32:38
 * @FilePath: \vue_management\src\plugins\element.js
 * @Description: 头部注释
 */
import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message
} from 'element-ui'


Vue.prototype.$message = Message
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
