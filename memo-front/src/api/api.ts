import axios, { AxiosRequestConfig } from 'axios'

const apiCall = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

//request interceptor
apiCall.interceptors.request.use(
  (config): any => {
    // console.log(`request config: ${config}`)

    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

apiCall.interceptors.response.use(
  (res) => {
    // console.log(`response: ${res}`)

    if (res.status === 200) {
      return res.data
    }

    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default apiCall
