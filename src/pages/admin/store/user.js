import {loginInfo} from 'common@api/user.js'

	const state = {
		userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
		userRoute : [],

	}
	const mutations = {
		setUserSignIn(state, user){
			if(user){
                state.userInfo = user
                sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
            }else{
                state.userInfo = sessionStorage.getItem('userInfo') != null ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
            }
		},
		clearInfo(state,user){
			state.userInfo = {};
		},
		setUser(state,user){
			if(user){
				state.userInfo = user.adminInfo;
				state.userRoute = user.menuList
			}else{
				;
			}
		},
	}
	const actions = {
		actUserSignIn({commit}, user){
			return new Promise((resolve, reject) => {
				commit(setUserSignIn, user)
				resolve(true)
			})
		},
		setUserInfo({commit}){
			return new Promise((resolve, reject) => {
				loginInfo({ route:'Index_index',token:sessionStorage.getItem('token') }).then(response => {
					commit('setUser',response.respData)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
	


export default {
	namespaced: true,
	state,
	mutations,
	actions
  }