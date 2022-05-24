import Vue from 'vue'
import App from 'spa@comp_index/app'
import router from './router'
import 'lib-flexible/flexible'
import { Toast } from 'vant';

Vue.use(Toast)
import store from './store'

import websocket from  'vue-native-websocket'
Vue.use(websocket,'wss://testapi.okoption.top/ws/',{
    connectManually: true, // (Boolean)是否自动重连，默认false
    reconnectionAttempts: 5, // 重连次数
    reconnectionDelay: 3000, // 再次重连等待时间
})


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
    store,
    render: h => h(App)
});
