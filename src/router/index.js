import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/auth/Register';
import Login from '@/components/auth/Login';
import MainPage from '@/components/videochat/MainPage';
import UserList from '@/components/users/UserList';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UserList',
    component: UserList,
  },
  {
    path: '/chat',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
