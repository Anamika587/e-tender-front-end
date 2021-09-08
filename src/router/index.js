import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Upload',
    component: () => import(/* webpackChunkName: "about" */ '../views/Upload.vue')
  },
  {
    path: '/data',
    name: "Data",
    component: () => import(/* webpackChunkName: "about" */ '../components/TreeStructDisp.vue')
  },
  {
    path:'/preview',
    name: "preview",
    component: () => import(/* webpackChunkName: "about" */ '../components/ExcelPreview.vue')
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
