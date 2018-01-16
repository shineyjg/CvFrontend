import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Layout from '@/components/Layout'
// import Comparator from '@/components/Comparator'
// import Detector from '@/components/Detector'
// import Collapse from '@/components/Collapse'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/index',
      component: Layout,
      children: [{
        path: '/index',
        component: Index
      }]
    },
    {
      path: '/face',
      name: 'face',
      component: Layout,
      children: [{
          path: 'compare',
          component: resolve => require(['@/components/Comparator'], resolve)
        },
        {
          path: 'detect',
          component: resolve => require(['@/components/Detector'], resolve)
        }
      ]
    }, 
    {
      path: '/plate',
      name: 'plate',
      component: Layout,
      children: [
        {
          path: 'recog',
          component: resolve => require(['@/components/Plate'], resolve)
        }
      ]
    }
  ]
})