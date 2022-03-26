const state = {
  // 存储token
  token: window.localStorage.getItem('USER_TOKEN')
}
const getters = {}
const mutations = {
  // 设置用户token
  setUser (state, payload) {
    state.token = payload
    window.localStorage.setItem('USER_TOKEN', payload)
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
