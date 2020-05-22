import axios from '~/plugins/axios.js'

export function create_note(data) {
  return axios ({
    url: '/api/notes/',
    method: 'post',
    data
  })
}

export function update_note(data) {
  return axios ({
    url: `/api/notes/${data.id}`,
    method: 'put',
    data
  })
}