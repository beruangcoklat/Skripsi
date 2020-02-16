import * as constant from './../constant'
import axios from 'axios'

export function insert(token, menu_category_id, keyword) {
  const headers = { Authorization: `Bearer ${token}` }
  const data = { menu_category_id, keyword }
  return axios.post(`${constant.API_URL}/searchHistory/insert`, data, { headers })
}