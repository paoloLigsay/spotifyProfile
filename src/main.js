import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// components
import discover from './components/discover'
import profile from './components/profile'
import login from './components/login'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { 
    path: '/discover/:access_token',
    name: discover,
    component: discover,
    props: true
  },
  {
    path: '/login',
    name: login,
    component: login,
    props: true
  },
  { 
    path: '/',
    name: profile,
    component: profile,
    props: true
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
