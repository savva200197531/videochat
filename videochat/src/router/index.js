import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/auth/Register';
import Login from '@/components/auth/Login';
import MainWrapperPage from '@/components/users/MainWrapperPage';
import Chat from '@/components/users/Chat'
import News from '@/components/chat/News';
import VideoChat from '@/components/video/VideoChat';
import DisplayMessages from '@/components/chat/DisplayMessages';
import Error404 from '@/components/general/Error404';
// import CurrentUserVideo from '@/components/videochat/CurrentUserVideo';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainWrapperPage',
    component: MainWrapperPage,
    redirect: '/news',
    children: [
      {
        path: '/news',
        name: 'news',
        component: News,
      },
      {
        path: '/chat',
        name: 'chat',
        component: Chat,
        children: [
          {
            path: ':userId/:otherUserId',
            name: 'displayMessages',
            component: DisplayMessages
          },
          {
            path: 'video/:userId/:otherUserId',
            name: 'video',
            component: VideoChat,
          },
        ]
      },
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
  {
    path: '*',
    name: '404',
    component: Error404,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
