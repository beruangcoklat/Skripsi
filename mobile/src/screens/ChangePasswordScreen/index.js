import React from 'react'
import { View, ScrollView } from 'react-native'
import * as util from './../../util'
import * as userService from './../../services/UserService'
import md5 from 'md5'
import CustomInput from './../../components/CustomInput'
import CustomButton from './../../components/CustomButton'
import CustomAlert from './../../components/CustomAlert'
import CustomLoadingIndicator from './../../components/CustomLoadingIndicator'

export default class UpdateProfileScreen extends React.Component {

  state = {
    token: '',
    me: null,
    old_pass: '',
    new_pass: '',
    confirm_pass: '',

    showAlert: false,
    titleAlert: '',
    messageAlert: '',
    loading: false
  }

  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }

  componentDidMount() {
    util.getToken().then(token => this.setState({ token }))
    util.getMe().then(r => {
      const me = JSON.parse(r)
      this.setState({
        me,
        berat: me.weight,
        tinggi: me.height,
        email: me.email
      })
    })
  }

  validate() {
    let { old_pass, new_pass, confirm_pass } = this.state

    if (old_pass.length === 0) return 'Old password must be filled'
    if (new_pass.length === 0) return 'New password must be filled'
    if (confirm_pass.length === 0) return 'Confirm password must be filled'

    old_pass = md5(old_pass.trim())
    new_pass = md5(new_pass.trim())
    confirm_pass = md5(confirm_pass.trim())

    if (new_pass !== confirm_pass) return 'New password not match'
    return ''
  }

  handleSave() {
    let { token, old_pass, new_pass, confirm_pass } = this.state
    old_pass = md5(old_pass.trim())
    new_pass = md5(new_pass.trim())
    confirm_pass = md5(confirm_pass.trim())

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
    userService.changePassword(token, old_pass, new_pass, confirm_pass)
      .then(r => {
        const messageAlert = r.data
        this.setState({
          showAlert: true,
          titleAlert: 'Success',
          messageAlert
        })
      })
      .catch(r => {
        const messageAlert = r.response.data
        this.setState({
          showAlert: true,
          titleAlert: 'Error',
          messageAlert
        })
      })
      .then(() => this.setState({ loading: false }))
  }

  render() {
    const color = '#000_#999'
    const { old_pass, new_pass, confirm_pass, showAlert, titleAlert, messageAlert, loading } = this.state
    const close = () => {
      this.setState({ showAlert: false })
      if (this.state.titleAlert === 'Success') {
        this.props.navigation.goBack()
      }
    }

    return (
      <React.Fragment>
        <View>
          <ScrollView>
            <CustomInput
              secureTextEntry={true}
              placeholder='Old password'
              onChangeText={old_pass => this.setState({ old_pass })}
              color={color}
              value={old_pass}
            />
            <CustomInput
              secureTextEntry={true}
              placeholder='New password'
              onChangeText={new_pass => this.setState({ new_pass })}
              color={color}
              value={new_pass}
            />
            <CustomInput
              secureTextEntry={true}
              placeholder='Confirm password'
              onChangeText={confirm_pass => this.setState({ confirm_pass })}
              color={color}
              value={confirm_pass}
            />
            <CustomButton text='Save' onPress={this.handleSave} />
          </ScrollView>
        </View>
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