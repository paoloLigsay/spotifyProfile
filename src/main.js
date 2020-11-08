import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// components
import discover from './components/discover'
import profile from './components/profile'
import login from './components/login'
import playlist from './components/playlist'
import tracks from './components/tracks'
import artists from './components/artists'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { 
    path: '/discover/',
    name: discover,
    component: discover,
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
  },
  { 
    path: '/profile',
    name: profile,
    component: profile,
    props: true
  },
  { 
    path: '/playlist',
    name: playlist,
    component: playlist,
    props: true
  },
  { 
    path: '/tracks',
    name: tracks,
    component: tracks,
    props: true
  },
  { 
    path: '/artists',
    name: artists,
    component: artists,
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
