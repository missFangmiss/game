import Vue from 'vue'

import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state:{
        websocketMessage: "",// 端返回的信息
        socketTimestamp: new Date().getTime(),//时间戳去监听数据的改变
    },
    mutations:{
        //websocket
         setSocketMessage(state, data) {//一旦获取到端端返回的信息，就改变时间戳
           state.socketTimestamp = new Date().getTime();
           state.websocketMessage = data;
         },
     }

})