import axios from '~/plugins/axios.js'

export const state = () => ({
  myAllNotes: null
})

export const mutations = {
  SET_ALL_LIST(state, data) {
    state.myAllNotes = data
  }
}

export const actions = {
  async get_all_notes({commit}) {
    const url = '/api/notes/'
    const res = await axios.get(url)
    commit('SET_ALL_LIST', res)    
  }
}