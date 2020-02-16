import * as constant from '../constant'
import axios from 'axios'

export function all() {
  return axios.get(`${constant.API_URL}/activity/all`)
}