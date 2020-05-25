export const state = () => ({
  appTheme: 'night',
  notesView: 'menu'
})

export const mutations = {
  CHANGE_APP_THEME(state, type) {
    state.appTheme = type
  },

  CHANGE_NOTES_VIEW(state, type) {
    state.notesView = type
  }
}