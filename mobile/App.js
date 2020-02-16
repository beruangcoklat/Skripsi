import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { StyleSheet, View, Image } from 'react-native'
import * as authService from './src/services/AuthService'
import * as util from './src/util'
import * as constant from './src/constant'
import StartScreen from './src/screens/StartScreen'
import LoginScreen from './src/screens/LoginScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import MainScreen from './src/screens/MainScreen'
import SearchMenuScreen from './src/screens/SearchMenuScreen'
import RestaurantDetailScreen from './src/screens/RestaurantDetailScreen'
import HistoryMonthScreen from './src/screens/HistoryMonthScreen'
import UpdateProfileScreen from './src/screens/UpdateProfileScreen'
import ChangePasswordScreen from './src/screens/ChangePasswordScreen'
import SearchResultScreen from './src/screens/SearchResultScreen'

console.disableYellowBox = true

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { navigation } = this.props

    util.getToken().then(token => {
      authService.me(token)
        .then(r => {
          util.setMe(JSON.stringify(r.data))
          util.navigate(navigation, 'Main')
        })
        .catch(() => {
          util.setMe('-')
          util.navigate(navigation, 'Start')
        })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={constant.LOGO} style={styles.image} resizeMode='stretch' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constant.BACKGROUND_COLOR,
  },
  image: {
    width: '70%',
    height: '50%'
  }
})

const RouteConfigs = {
  App: {
    screen: App,
    navigationOptions: { header: null }
  },
  Start: {
    screen: StartScreen,
    navigationOptions: { header: null }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: { header: null }
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: { header: null }
  },
  Main: {
    screen: MainScreen,
    navigationOptions: { header: null }
  },
  SearchMenu: {
    screen: SearchMenuScreen,
    navigationOptions: { header: null }
  },
  SearchResult: {
    screen: SearchResultScreen,
    navigationOptions: {
      title: 'Back',
      headerStyle: { backgroundColor: constant.MAIN_COLOR },
      headerTintColor: 'white'
    }
  },
  RestaurantDetail: {
    screen: RestaurantDetailScreen,
    navigationOptions: {
      title: 'Back',
      headerStyle: { backgroundColor: constant.MAIN_COLOR },
      headerTintColor: 'white'
    }
  },
  HistoryMonth: {
    screen: HistoryMonthScreen,
    navigationOptions: {
      title: 'History',
      headerStyle: { backgroundColor: constant.MAIN_COLOR },
      headerTintColor: 'white'
    }
  },
  UpdateProfile: {
    screen: UpdateProfileScreen,
    navigationOptions: {
      title: 'Update Profile',
      headerStyle: { backgroundColor: constant.MAIN_COLOR },
      headerTintColor: 'white'
    }
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: {
      title: 'Change Password',
      headerStyle: { backgroundColor: constant.MAIN_COLOR },
      headerTintColor: 'white'
    }
  }
}

const StackNavigatorConfig = {

}

export default createStackNavigator(RouteConfigs, StackNavigatorConfig)