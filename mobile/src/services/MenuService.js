import * as constant from './../constant'
import axios from 'axios'

export function getRecommendation(token, page) {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`${constant.API_URL}/menu/recommendation?page=${page}`, data)
}

export function getSearch(search) {
  return axios.get(`${constant.API_URL}/menu/search/${search}`)
}

export function getSearchAll(token, search, page) {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`${constant.API_URL}/menu/searchAll/${search}?page=${page}`, data)
}

export function getByRestaurantId(restaurant_id, page, menu_id) {
  return axios.get(`${constant.API_URL}/menu/restaurant/${restaurant_id}/${menu_id}/?page=${page}`)
}

export function find(menu_id) {
  return axios.get(`${constant.API_URL}/menu/find/${menu_id}`)
}