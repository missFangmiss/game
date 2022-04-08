import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './config'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	mode: 'hash'
})

// 路由开始钩子
router.beforeEach((route, from, next) => {
	let { meta } = route
	meta.title && (window.document.title = meta.title)
	// 检查跳转是否需要登陆
	if(meta.requireAuth){
		if(!sessionStorage.getItem('token')){
			// next(`/login?redirect=${to.path}`)
			// next(`/login`);
		}else{
			store.dispatch('actionsSetTitle', meta.title);
			next();
		}
	}else{
		next()
		store.dispatch('actionsSetTitle', meta.title);
	}
})

// 路由跳转结束钩子
router.afterEach(route => {
	if (route.name === 'error') {
		return
	}
	window.scrollTo(0, 0)
})

export default router