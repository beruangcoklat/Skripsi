import * as constant from './../constant'
import axios from 'axios'

export function register(username, email, password, gender, dob, weight, height, activity_id, diet_mode_id, eatCount) {
  const data = { username, email, password, gender, dob, weight, height, activity_id, diet_mode_id, eatCount }
  return axios.post(`${constant.API_URL}/user/register`, data)
}

export function changePassword(token, old, _new, confirm) {
  const headers = { Authorization: `Bearer ${token}`, }
  const data = { old, new: _new, confirm }
  return axios.post(`${constant.API_URL}/user/changePassword`, data, { headers })
}

export function updateProfile(token, email, weight, height, image, activity_id, diet_mode_id, eatCount) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data;'
  }

  const data = new FormData();
  if (image !== null) {
    data.append('image', {
      uri: image,
      name: 'filename.jpg',
      type: 'image/jpg'
    })
  }

  data.append('email', email)
  data.append('weight', weight)
  data.append('height', height)
  data.append('activity_id', activity_id)
  data.append('diet_mode_id', diet_mode_id)
  data.append('eatCount', eatCount)
  return axios.post(`${constant.API_URL}/user/updateProfile`, data, { headers })
}