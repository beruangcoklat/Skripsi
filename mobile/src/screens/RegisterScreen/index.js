import React from 'react'
import md5 from 'md5'
import CustomInput from './../../components/CustomInput'
import CustomButton from './../../components/CustomButton'
import CustomButtonGroup from './../../components/CustomButtonGroup'
import CustomLoadingIndicator from './../../components/CustomLoadingIndicator'
import CustomAlert from './../../components/CustomAlert'
import * as userService from './../../services/UserService'
import * as authService from './../../services/AuthService'
import * as activityService from '../../services/ActivityService'
import * as dietModeService from '../../services/DietModeService'
import * as util from './../../util'
import * as constant from './../../constant'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import DatePicker from 'react-native-datepicker'
import CustomHeader from './../../components/CustomHeader'

export default class RegisterScreen extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    gender: 'Male',
    dob: '',
    weight: '',
    height: '',
    activity_id: -1,
    activities: [],
    eatCount: '',
    diet_mode_id: -1,
    dietModes: [],

    loading: false,
    showAlert: false,
    titleAlert: '',
    messageAlert: ''
  }

  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount() {
    activityService.all().then(r => this.setState({ activities: r.data }))
    dietModeService.all().then(r => this.setState({ dietModes: r.data }))
  }

  handleRegister() {
    const { username, email, password, gender, dob, weight, height, activity_id, diet_mode_id, eatCount } = this.state
    const hash = md5(password)

    this.setState({ loading: true })
    userService.register(username, email, hash, gender, dob, weight, height, activity_id, diet_mode_id, eatCount)
      .then(() => {
        authService.login(email, hash)
          .then(r => {
            util.setToken(r.data.token)
            util.setMe(JSON.stringify(r.data.user))
            util.navigate(this.props.navigation, 'Main')
          })
      })
      .catch(r => {
        this.setState({
          showAlert: true,
          titleAlert: 'Error',
          messageAlert: JSON.stringify(r.response.data)
        })
      })
      .then(() => this.setState({ loading: false }))
  }

  render() {
    const { username, email, password, weight, height, showAlert, titleAlert, messageAlert, eatCount, loading, dob } = this.state

    const close = () => this.setState({ showAlert: false })
    const updateUsername = (username) => this.setState({ username })
    const updateEmail = (email) => this.setState({ email })
    const updatePassword = (password) => this.setState({ password })
    const updateDob = (dob) => this.setState({ dob })
    const updateGender = (gender) => this.setState({ gender })
    const updateWeight = (weight) => this.setState({ weight })
    const updateHeight = (height) => this.setState({ height })
    const updateEatCount = (eatCount) => this.setState({ eatCount })
    const updateActivity = (_, idx) => this.setState({ activity_id: this.state.activities[idx].id })
    const updateDietMode = (_, idx) => this.setState({ diet_mode_id: this.state.dietModes[idx].id })

    const handleRegister = this.handleRegister
    const activities = this.state.activities.map(i => ({ value: i.name }))
    const dietModes = this.state.dietModes.map(i => ({ value: i.name }))

    const color = '#000_#999'

    return (
      <React.Fragment>
        <View style={styles.container}>
          <CustomHeader text='Register' />

          <ScrollView>
            <CustomInput placeholder='Username' onChangeText={updateUsername} color={color} value={username} />
            <CustomInput placeholder='Email' onChangeText={updateEmail} color={color} value={email} />
            <CustomInput placeholder='Password' onChangeText={updatePassword} secureTextEntry={true} color={color} value={password} />
            <CustomInput placeholder='Weight (kg)' onChangeText={updateWeight} color={color} value={weight} />
            <CustomInput placeholder='Height (cm)' onChangeText={updateHeight} color={color} value={height} />
            <CustomInput placeholder='How many times you eat in 1 day' onChangeText={updateEatCount} color={color} value={eatCount} />

            <CustomButtonGroup buttons={['Male', 'Female']} onPress={updateGender} color={color} />

            <View style={{ padding: 10 }}>
              <Dropdown
                label='Exercise Level'
                data={activities}
                onChangeText={updateActivity}
              />
            </View>

            <View style={{ padding: 10 }}>
              <Dropdown
                label='Diet Mode'
                data={dietModes}
                onChangeText={updateDietMode}
              />
            </View>

            <View style={styles.datepicker}>
              <DatePicker
                date={dob}
                mode='date'
                placeholder='Date of Birth'
                format='YYYY-MM-DD'
                confirmBtnText='Confirm'
                cancelBtnText='Cancel'
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={updateDob}
              />
            </View>

            <CustomButton text='Register' onPress={handleRegister} />
            <CustomLoadingIndicator show={loading} />
            <View style={{ height: 100 }}></View>
          </ScrollView>
        </View>
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
    backgroundColor: constant.BACKGROUND_COLOR
  },
  datepicker: {
    alignItems: 'center',
    margin: 10
  }
})