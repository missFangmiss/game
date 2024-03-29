import Vue from 'vue'
import App from 'spa@comp_index/app'
import router from './router'
import 'lib-flexible/flexible'
import { Toast } from 'vant';
// Toast.setDefaultOptions({ duration: 3000 });
Vue.use(Toast)


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
Vue.config.productionTip = false


new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    router,
    render: h => h(App)
});
