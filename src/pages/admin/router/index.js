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
router.beforeEach(async(route, from, next) => {
	let { meta } = route
	meta.title && (window.document.title = meta.title)
	// 检查跳转是否需要登陆
	if(meta.requireAuth){
		if(!sessionStorage.getItem('token')){
			// next(`/login?redirect=${to.path}`)
			next(`/login`);
		}else{
			console.log(store.getters.userInfo)
			if(JSON.stringify(store.getters.userInfo)=='{}'){//没有路由和用信息
				try {
					await store.dispatch('User/setUserInfo');
					next()//{...to, replace:true}
				} catch (error) {
					console.log(error)
					next(`/login`)
				}
			}else{
				store.dispatch('Route/actionsSetTitle', meta.title);
				next();
			}
			
		}
	}else{
		next()
		store.dispatch('Route/actionsSetTitle', meta.title);
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