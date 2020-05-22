import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:9527'
})

service.interceptors.response.use(
  response => {
    console.log(response)
    return response
  },
  error => {
    console.log('報錯了啦!!', error)
    return Promise.reject(error)
  }
)

export default service