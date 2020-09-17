import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/auth/Register';
import Login from '@/components/auth/Login';
import MainWrapperPage from '@/components/users/MainWrapperPage';
import CurrentUser from '@/components/users/CurrentUser'
import Plug from '@/components/chat/Plug';
// import CurrentUserVideo from '@/components/videochat/CurrentUserVideo';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainWrapperPage',
    component: MainWrapperPage,
    children: [
      {
        path: '/news',
        name: 'news',
        component: Plug,
      },
      {
        path: ':userId/:otherUserId',
        name: 'chat',
        component: CurrentUser,
      },
      // {
      //   path: 'call/:otherUserId',
      //   name: 'call',
      //   component: CurrentUserVideo,
      // },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
