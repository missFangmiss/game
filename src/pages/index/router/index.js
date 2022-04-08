import Vue from 'vue'
import Router from 'vue-router'


const home = () =>import('spa@comp_index/home/index.vue')
      


     ;


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:home,
      meta:{
        title:'首页'
      }
    },
    
  ]
})