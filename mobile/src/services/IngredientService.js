import * as constant from './../constant'
import axios from 'axios'

export function search(ingredient_name) {
  return axios.get(`${constant.API_URL}/ingredient/search/${ingredient_name}`)
}