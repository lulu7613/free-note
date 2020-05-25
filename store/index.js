export const state = () => ({
  appTheme: 'night'
})

export const mutations = {
  CHANGE_APP_THEME(state, type) {
    state.appTheme = type
  },
}