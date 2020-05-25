export const state = () => ({
  appTheme: 'night',
  notesSort: 'desc',
  notesView: 'menu'
})

export const mutations = {
  CHANGE_APP_THEME(state, type) {
    state.appTheme = type
  },

  CHANGE_NOTES_SORT(state, type) {
    state.notesSort = type
  },

  CHANGE_NOTES_VIEW(state, type) {
    state.notesView = type
  }
}