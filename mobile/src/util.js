import { StackActions, NavigationActions } from 'react-navigation'
import { Alert, AsyncStorage } from 'react-native'
import * as constant from './constant'

export function navigate(navigation, routeName) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })],
  })
  navigation.dispatch(resetAction)
}

export function alert(title, message) {
  Alert.alert(
    title,
    message,
    [{ text: 'OK' }],
  )
}

export function clone(data) {
  return JSON.parse(JSON.stringify(data))
}

export function getToken() {
  return AsyncStorage.getItem('token')
}

export function removeToken() {
  AsyncStorage.removeItem('token')
}

export function setToken(token) {
  AsyncStorage.setItem('token', token)
}

export function getMe() {
  return AsyncStorage.getItem('me')
}

export function setMe(me) {
  AsyncStorage.setItem('me', me)
}

export function removeMe() {
  AsyncStorage.removeItem('me')
}

export function getUriImage(filename) {
  return {
    uri: `${constant.API_URL}/images/${filename}`
  }
}