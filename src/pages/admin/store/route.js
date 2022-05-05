// import { Promise } from "core-js";

const state = {
    pageTitle:'首页',
    sideBar:{expandBar:'home1',chosedBar:'home1'},//存导航栏展开和选中的项
}
const mutations = {
    setPageTitle(state,title){
        state.pageTitle = title;
    },
    setSideBar(state,barState){
        state.sideBar.expandBar = barState.expand;
        state.sideBar.chosedBar = barState.chosed;
    },
}
const actions = {
    actionsSetTitle({commit},title){
        return new Promise((resolve, reject) => {
                commit('setPageTitle',title)
                resolve()
            }).catch(error => {
                reject(error)
            })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}