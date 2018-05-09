import Vue from 'vue'
import Router from 'vue-router'
import newsCenter from '@/components/newsCenter'
import dateDirectory from '@/components/dateDirectory'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { requiresAuth: true }
    },
    {
      path: '/newsCenter',
      name: 'newsCenter',
      component: newsCenter
    },
    {
      path: '/dateDirectory',
      name: 'dateDirectory',
      component: dateDirectory
    },{
      path:'*',
      redirect:'/login'
    }
  ]
})
