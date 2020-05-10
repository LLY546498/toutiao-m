import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 导出
export default request
