// import { Promise } from "core-js";

const state = {
    pageTitle:'首页'
}
const mutations = {
    setPageTitle(state,title){
        state.pageTitle = title;
    }
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
    state,
    mutations,
    actions
}