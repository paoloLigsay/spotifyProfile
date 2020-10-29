import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// components
<<<<<<< HEAD
<<<<<<< HEAD
import Discover from './components/discover'
=======
import Users from './components/user'
>>>>>>> 1462769... add login
=======
import Discover from './components/discover'
>>>>>>> ecb8aad... get profile
import Profile from './components/profile'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8900588... commit three message
=======
>>>>>>> 8f705e6... print data sample
  { 
    path: '/discover/:display_name',
    component: Discover,
    props: route => ({ query: route.query.q })
  },
  { 
    path: '/',
    component: Profile
  },
<<<<<<< HEAD
<<<<<<< HEAD
=======
  { path: '/users', component: Users },
=======
  { path: '/discover', component: Discover },
>>>>>>> ecb8aad... get profile
  { path: '/', component: Profile },
>>>>>>> 1462769... add login
=======
>>>>>>> 8900588... commit three message
=======
>>>>>>> 8f705e6... print data sample
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
