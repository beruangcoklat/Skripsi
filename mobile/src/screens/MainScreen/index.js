import React from 'react'
import * as constant from './../../constant'
import { createBottomTabNavigator } from 'react-navigation'
import HomeFragment from './fragments/HomeFragment'
import HistoryFragment from './fragments/HistoryFragment'
import ProfileFragment from './fragments/ProfileFragment'
import IngredientFragment from './fragments/IngredientFragment'
import { View, Image, StyleSheet } from 'react-native'

const RouteConfigs = {
  Home: {
    screen: HomeFragment,
    navigationOptions: {
      tabBarIcon: ({ focused }) => renderIcon(focused, constant.LOGO_HOME_ACTIVE, constant.LOGO_HOME)
    }
  },
  Ingredient: {
    screen: IngredientFragment,
    navigationOptions: {
      tabBarIcon: ({ focused }) => renderIcon(focused, constant.LOGO_INPUT_MENU_ACTIVE, constant.LOGO_INPUT_MENU)
    }
  },
  History: {
    screen: HistoryFragment,
    navigationOptions: {
      tabBarIcon: ({ focused }) => renderIcon(focused, constant.LOGO_HISTORY_ACTIVE, constant.LOGO_HISTORY)
    }
  },
  Profile: {
    screen: ProfileFragment,
    navigationOptions: {
      tabBarIcon: ({ focused }) => renderIcon(focused, constant.LOGO_PROFILE_ACTIVE, constant.LOGO_PROFILE)
    }
  }
}

const BottomTabNavigatorConfig = {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  initialRouteName: 'Home',
  tabBarOptions: {
    showLabel: false
  }
}

export default MainScreen = createBottomTabNavigator(RouteConfigs, BottomTabNavigatorConfig)

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30
  }
})

const renderIcon = (focused, active, noactive) => {
  const logo = focused ? active : noactive
  return (
    <View style={{ justifyContent: 'center', padding: 10 }}>
      <Image source={logo} style={styles.image} />
    </View>
  )
}