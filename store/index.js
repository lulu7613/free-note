export const state = () => ({
  appMode: 'night'
})

export const mutations = {
  CHANGE_MODE(state, type) {
    state.appMode = type
  }
}