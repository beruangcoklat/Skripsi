import * as constant from './../constant'
import axios from 'axios'

export function login(email, password) {
  const data = { email, password }
  return axios.post(`${constant.API_URL}/login`, data)
}

export function me(token) {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`${constant.API_URL}/me`, data)
}

export function logout(token) {
  const data = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return axios.get(`${constant.API_URL}/logout`, data)
}