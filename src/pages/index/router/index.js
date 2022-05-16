import Vue from 'vue'
import Router from 'vue-router'


const home = () =>import('spa@comp_index/home/index.vue'),
    game = () =>import('spa@comp_index/game/index.vue'),
    result = () =>import('spa@comp_index/result/index.vue'),
    history = () =>import('spa@comp_index/history/index.vue'),
    login = () =>import('spa@comp_index/login/index.vue'),
    example = () =>import('spa@comp_index/example/index.vue')


      


     ;


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:home,
      meta:{
        title:'GUESS NUMBER'
      }
    },
    {
        path: '/game',
        name: 'game',
        component:game,
        meta:{
          title:'JOIN A GAME'
        }
    },
    {
        path: '/result',
        name: 'result',
        component:result,
        meta:{
          title:'GUESS NUMBER'
        }
    },
    {
        path: '/history',
        name: 'history',
        component:history,
        meta:{
          title:'GAME HISTORY'
        }
    },
    {
      path: '/login',
      name: 'login',
      component:login,
      meta:{
        title:'Login'
      }
    },
    {
      path: '/example',
      name: 'example',
      component:example,
      meta:{
        title:'GUESS NUMBER'
      }
    },
    
  ]
})