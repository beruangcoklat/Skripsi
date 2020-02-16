import React from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-elements'
import * as constant from './../../constant'

export default class StartScreen extends React.Component {

  constructor(props) {
    super(props)
    this.gotoLogin = this.gotoLogin.bind(this)
    this.gotoRegister = this.gotoRegister.bind(this)
  }

  gotoLogin = () => this.props.navigation.navigate('Login')

  gotoRegister = () => this.props.navigation.navigate('Register')

  render() {
    const gotoLogin = this.gotoLogin
    const gotoRegister = this.gotoRegister

    return (
      <View style={styles.container}>
        <Image source={constant.LOGO} style={styles.image} resizeMode='stretch' />
        <Button
          title='Login'
          containerViewStyle={styles.containerButton}
          buttonStyle={{ backgroundColor: constant.MAIN_COLOR, borderRadius: 5 }}
          onPress={gotoLogin}
        />
        <Button
          title='Register'
          containerViewStyle={styles.containerButton}
          buttonStyle={{ backgroundColor: '#eee', borderRadius: 5 }}
          textStyle={{ color: '#000' }}
          onPress={gotoRegister}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constant.BACKGROUND_COLOR
  },
  containerButton: {
    margin: 10,
    width: '50%'
  },
  containerImage: {
    width: '100%'
  },
  image: {
    width: '70%',
    height: '50%'
  },
  label: {
    color: '#757575',
    textDecorationLine: 'underline'
  }
})