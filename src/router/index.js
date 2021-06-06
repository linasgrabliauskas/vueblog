import Vue from 'vue'
import VueRouter from 'vue-router'

// Pages
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PostDetails from '../views/PostDetails.vue'
import UserDetails from '../views/UserDetails.vue'
import Registration from '../views/Registration.vue'
import PostCreate from '../views/PostCreate.vue'
import PostUpdate from '../views/PostUpdate.vue'
import NotFound404 from '../views/NotFound404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/posts/:username/:id',
    name: 'PostDetails',
    component: PostDetails
  },
  {
    path: '/user/:username',
    name: 'UserDetails',
    component: UserDetails
  },
  {
    path: '/register',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/new',
    name: 'PostCreate',
    component: PostCreate
  },
  {
    path: '/update/:username/:id',
    name: 'PostUpdate',
    component: PostUpdate
  },
  {
    path: '*',
    name: 'NotFound404',
    component: NotFound404
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
