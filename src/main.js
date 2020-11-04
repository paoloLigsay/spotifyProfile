import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// components
import Discover from './components/discover'
import Profile from './components/profile'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { 
    path: '/discover/:display_name',
    component: Discover,
    props: route => ({ query: route.query.q })
  },
  { 
    path: '/',
    component: Profile
  },
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
