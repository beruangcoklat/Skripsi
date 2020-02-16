import React from 'react'
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as util from './../../util'
import * as constant from './../../constant'
import ImagePicker from 'react-native-image-picker'
import * as userService from './../../services/UserService'
import * as authService from './../../services/AuthService'
import * as activityService from './../../services/ActivityService'
import * as dietModeService from './../../services/DietModeService'
import CustomInput from './../../components/CustomInput'
import CustomLabel from './../../components/CustomLabel'
import CustomButton from './../../components/CustomButton'
import CustomAlert from './../../components/CustomAlert'
import CustomLoadingIndicator from './../../components/CustomLoadingIndicator'
import { Dropdown } from 'react-native-material-dropdown'

export default class UpdateProfileScreen extends React.Component {

  state = {
    token: '',
    me: null,
    email: '',
    berat: '',
    tinggi: '',
    image: null,
    imageUpdated: false,

    activity_id: -1,
    activities: [],
    eatCount: '',
    diet_mode_id: -1,
    dietModes: [],

    showAlert: false,
    titleAlert: '',
    messageAlert: '',
    loading: false
  }

  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
    this.gotoChangePassword = this.gotoChangePassword.bind(this)
    this.imagePicker = this.imagePicker.bind(this)
  }

  componentDidMount() {
    activityService.all().then(r => this.setState({ activities: r.data }))
    dietModeService.all().then(r => this.setState({ dietModes: r.data }))
    util.getToken().then(token => this.setState({ token }))
    util.getMe().then(r => {
      console.log(r)
      const me = JSON.parse(r)
      this.setState({
        me,
        berat: me.weight,
        tinggi: me.height,
        email: me.email,
        image: `${constant.API_URL}/images/${me.image}`,
        activity_id: me.activity_id,
        diet_mode_id: me.diet_mode_id,
        eatCount: me.eatCount
      })
    })
  }

  gotoChangePassword = () => this.props.navigation.navigate('ChangePassword')

  validate() {
    let { email, berat, tinggi } = this.state

    email = email.trim()
    berat = berat.toString().trim()
    tinggi = tinggi.toString().trim()

    if (email.length === 0) return 'Email must be filled'
    if (berat.length === 0) return 'Weight must be filled'
    if (tinggi.length === 0) return 'Height must be filled'
    if (isNaN(berat)) return 'Weight must be a number'
    if (isNaN(tinggi)) return 'Height must be a number'

    return ''
  }

  handleSave() {
    let { token, email, berat, tinggi, image, imageUpdated, activity_id, diet_mode_id, eatCount } = this.state

    email = email.trim()
    berat = berat.toString().trim()
    tinggi = tinggi.toString().trim()

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
    userService.updateProfile(token, email, berat, tinggi, imageUpdated ? image : null, activity_id, diet_mode_id, eatCount)
      .then(r => {
        this.setState({
          showAlert: true,
          titleAlert: 'Success',
          messageAlert: r.data
        })

        authService.me(token).then(r => util.setMe(JSON.stringify(r.data)))
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

  imagePicker() {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: { skipBackup: true, path: 'images' }
    }

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel || response.error) { }
      else {
        this.setState({ image: response.uri, imageUpdated: true })
      }
    })
  }

  renderProfilePicture() {
    const { image, me } = this.state
    const ready = me !== null

    return (
      <React.Fragment>
        {
          ready &&
          <TouchableOpacity style={styles.image_container} onPress={this.imagePicker}>
            <Image source={{ uri: image }} style={styles.image} resizeMode='stretch' />
          </TouchableOpacity>
        }
      </React.Fragment>
    )
  }

  render() {
    const color = '#000_#999'
    const { email, berat, tinggi, showAlert, messageAlert, titleAlert, loading, activity_id, eatCount, diet_mode_id } = this.state
    const close = () => {
      this.setState({ showAlert: false })
      if (this.state.titleAlert === 'Success') {
        this.props.navigation.goBack()
      }
    }

    let activityValue = ''
    const activities = this.state.activities.map(i => {
      const value = i.name
      i.id == activity_id && (activityValue = i.name)
      return { value }
    })

    let dietModeValue = ''
    const dietModes = this.state.dietModes.map(i => {
      const value = i.name
      i.id == diet_mode_id && (dietModeValue = i.name)
      return { value }
    })
    const updateActivity = (_, idx) => this.setState({ activity_id: this.state.activities[idx].id })
    const updateDietMode = (_, idx) => this.setState({ diet_mode_id: this.state.dietModes[idx].id })


    return (
      <React.Fragment>
        <View>
          <ScrollView styles={{ backgroundColor: '#FFF' }}>
            {this.renderProfilePicture()}
            <CustomLabel text='Email' fontSize='normal' />
            <CustomInput
              placeholder='Input Email'
              onChangeText={email => this.setState({ email })}
              color={color}
              value={email}
            />
            <CustomLabel text='Weight (kg)' fontSize='normal' />
            <CustomInput
              placeholder='Input Weight'
              onChangeText={berat => this.setState({ berat })}
              color={color}
              value={berat.toString()}
            />
            <CustomLabel text='Height (cm)' fontSize='normal' />
            <CustomInput
              placeholder='Input Height'
              onChangeText={tinggi => this.setState({ tinggi })}
              color={color}
              value={tinggi.toString()}
            />
            <CustomLabel text='How many times you eat in 1 day' fontSize='normal' />
            <CustomInput
              placeholder='How many times you eat in 1 day'
              onChangeText={eatCount => this.setState({ eatCount })}
              color={color}
              value={eatCount.toString()}
            />

            <View style={{ padding: 10 }}>
              <Dropdown
                value={activityValue}
                label='Exercise Level'
                data={activities}
                onChangeText={updateActivity}
              />
            </View>

            <View style={{ padding: 10 }}>
              <Dropdown
                value={dietModeValue}
                label='Diet Mode'
                data={dietModes}
                onChangeText={updateDietMode}
              />
            </View>


            <CustomButton text='Save' onPress={this.handleSave} />
            <CustomButton text='Change Password' onPress={this.gotoChangePassword} />
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

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  },
  image_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  }
})