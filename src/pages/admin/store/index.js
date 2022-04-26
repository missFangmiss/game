import Vue from 'vue'
// import VuexPersistence from 'vuex-persist'

import Vuex from 'vuex'

import User from './user'
import Route from './route'
import getters from './getters.js'

// const vuexLocal = new VuexPersistence({
// 	storage: window.sessionStorage,
//     render(state) {
//         return { ...state }
//       }
// })

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules:{
		User,
		Route
	},
	// plugins:[vuexLocal.plugin],
	getters

})