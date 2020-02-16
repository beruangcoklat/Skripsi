import * as constant from './../constant'
import axios from 'axios'

export function find(id) {
  return axios.get(`${constant.API_URL}/restaurant/find/${id}`)
}

export function search(token, search) {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`${constant.API_URL}/restaurant/search/${search}`, data)
}