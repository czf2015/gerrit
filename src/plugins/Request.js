import axios from 'axios'

axios.defaults.withCredentials = true

const service = axios.create({
    baseURL: '',
    timeout: 5000,
    withCredentials: true
})

service.interceptors.response.use(
    response => {
        const res = response.data
        return res
    },
    error => {
        console.warn('err' + error)
        return Promise.reject(error)
    }
)

export default service