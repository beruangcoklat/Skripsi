import * as constant from './../constant'
import axios from 'axios'

export function insert(token, menu_id) {
  const headers = { Authorization: `Bearer ${token}`, }
  const data = { menu_id }
  return axios.post(`${constant.API_URL}/eatTransaction/insert`, data, { headers })
}

export function insertIngredients(token, ingredient_ids) {
  const headers = { Authorization: `Bearer ${token}`, }
  const data = { ingredient_ids }
  return axios.post(`${constant.API_URL}/eatTransaction/insertIngredients`, data, { headers })
}

export function historyToday(token, user_id) {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`${constant.API_URL}/eatTransaction/historyToday/${user_id}`, data)
}

export function history(token, month, year) {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`${constant.API_URL}/eatTransaction/history/${month}/${year}`, data)
}

export function todayStatistic(token) {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`${constant.API_URL}/eatTransaction/todayStatistic`, data)
}