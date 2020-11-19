import axios from 'axios'

const apiAdapter = baseURL => {
  return axios.create({
    baseURL: baseURL
  })
}

export default apiAdapter
