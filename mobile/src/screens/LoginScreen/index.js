import React from 'react';
import * as authService from './../../services/AuthService'
import * as util from '../../util'
import * as constant from '../../constant'
import md5 from 'md5'
import CustomInput from './../../components/CustomInput'
import CustomLoadingIndicator from './../../components/CustomLoadingIndicator'
import CustomAlert from './../../components/CustomAlert'
import CustomButton from './../../components/CustomButton'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'

export default class LoginScreen extends React.Component {

  state = {
    email: '',
    password: '',
    loading: false,

    showAlert: false,
    titleAlert: '',
    messageAlert: ''
  }

  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  validate() {
    let { email, password } = this.state
    email = email.trim()
    password = password.trim()

    if (email.length === 0) return 'Email must be filled'
    if (password.length === 0) return 'Password must be filled'

    return ''
  }

  handleLogin() {
    let { email, password } = this.state
    email = email.trim()
    password = password.trim()

    const error = this.validate()
    if (error.length > 0) {
      this.setState({
        showAlert: true,
        titleAlert: 'Error',
        messageAlert: error
      })
      return
    }

    this.setState({ loading: true })
    authService.login(email, md5(password))
      .then(r => {
        util.setToken(r.data.token)
        util.setMe(JSON.stringify(r.data.user))
        util.navigate(this.props.navigation, 'Main')
      })
      .catch(r => {
        this.setState({
          showAlert: true,
          titleAlert: 'Error',
          messageAlert: r.response.data
        })
      })
      .then(() => this.setState({ loading: false }))
  }

  render() {
    const { email, password, showAlert, titleAlert, messageAlert, loading } = this.state

    const updateEmail = (email) => this.setState({ email })
    const updatePassword = (password) => this.setState({ password })
    const close = () => this.setState({ showAlert: false })

    return (
      <React.Fragment>
        <ImageBackground source={constant.LOGIN_WALLPAPER} style={styles.container}>
          <View style={styles.overlay}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <Text h3 style={{ color: '#FFF' }}>Login</Text>
              </View>
              <CustomInput placeholder='Email' onChangeText={updateEmail} value={email} />
              <CustomInput secureTextEntry={true} placeholder='Password' onChangeText={updatePassword} value={password} />
              <CustomButton text='Login' onPress={this.handleLogin} />
            </View>
          </View>
        </ImageBackground>
        <CustomLoadingIndicator show={loading} />
        <CustomAlert
          showAlert={showAlert}
          title={titleAlert}
          message={messageAlert}
          close={close}
        />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  containerButton: {
    margin: 10,
    width: '50%'
  }
})