import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios)
axios.defaults.baseURL = 'http://www.liulongbin.top:3005'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

import moment from 'moment'
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

import { Header,Swipe, SwipeItem,Button } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

import router from './router.js'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import App from './App.vue'


new Vue({
    el: '#app',
    render: c => c(App),
    router
  })