
export default {
	state: {
		userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {}
	},
	mutations:{
		setUserSignIn(state, user){
			if(user){
                state.userInfo = user
                sessionStorage.setItem('userInfo', JSON.stringify(state.userInfo))
            }else{
                state.userInfo = sessionStorage.getItem('userInfo') != null ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
            }
		}
	},
	actions:{
		actUserSignIn({commit}, user){
			return new Promise((resolve, reject) => {
				commit(setUserSignIn, user)
				resolve(true)
			})
		}
	}
}