import React from 'react'
import { NavigationEvents } from 'react-navigation'
import * as constant from './../../../../constant'
import * as authService from './../../../../services/AuthService'
import * as util from './../../../../util'
import { StyleSheet, View, FlatList, ScrollView, TouchableWithoutFeedback, Modal, Image } from 'react-native'
import { Avatar, Text, Divider, Icon } from 'react-native-elements'
import CustomHeader from './../../../../components/CustomHeader'
import * as eatService from './../../../../services/EatTransactionService'
import AwesomeAlert from 'react-native-awesome-alerts'

export default class ProfileFragment extends React.Component {

  state = {
    token: '',
    user: null,

    histories: [],

    need: 0, // calory yang dibutuhkan
    calory: 0,

    showConfirm: false,

    modalVisible: false,
    curr_menu: null
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    util.getToken().then(token => {
      this.setState({ token })

      eatService.todayStatistic(token).then(r => {
        let { done, need } = r.data
        need = Number(need).toFixed(2)
        const calory = Number(done).toFixed(2)
        this.setState({ calory, need })
      })

      util.getMe().then(_user => {
        const user = JSON.parse(_user)
        this.setState({ user })
        eatService.historyToday(token, user.id)
          .then(r => this.setState({ histories: r.data }))
          .catch(r => console.log(r))
      })

    })
  }

  refresh() {
    const { token } = this.state

    eatService.todayStatistic(token).then(r => {
      let { done, need } = r.data
      need = Number(need).toFixed(2)
      const calory = Number(done).toFixed(2)
      this.setState({ calory, need })
    })

    util.getMe().then(_user => {
      const user = JSON.parse(_user)
      this.setState({ user })
      eatService.historyToday(token, user.id).then(r => this.setState({ histories: r.data }))
        .catch(r => console.log(r))
    })
  }

  handleSetting = () => this.props.navigation.navigate('UpdateProfile')

  handleLogout = () => this.setState({ showConfirm: true })

  renderModal() {
    const { modalVisible, curr_menu } = this.state
    const toggleModal = () => this.setState({ modalVisible: !modalVisible })
    const modalReady = curr_menu !== null

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        {
          modalReady && curr_menu.type === 'menu' &&
          <React.Fragment>
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.8)' }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ margin: 10 }}>
                  <Image source={util.getUriImage(curr_menu.data.image)} style={styles.image_in_modal} resizeMode='stretch' />
                </View>
                <View style={{ margin: 10, flexWrap: "wrap", width: '60%' }}>
                  <Text style={{ color: '#FFF' }}>{curr_menu.menu_name}</Text>
                  <Text style={{ color: '#FFF' }}>{curr_menu.menu_calory} kcal</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name='watch-later' color='#FFF' />
                    <Text style={{ color: '#FFF' }}>{curr_menu.time}</Text>
                  </View>
                </View>
              </View>
            </View>
          </React.Fragment>
        }

        {
          modalReady && curr_menu.type === 'ingredient' &&
          <React.Fragment>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'stretch' }}>
              <View style={{ margin: 10, flexWrap: "wrap" }}>
                <Text style={{ color: '#FFF' }}>{curr_menu.menu_name}</Text>
                <Text style={{ color: '#FFF' }}>{curr_menu.menu_calory} kcal</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name='watch-later' color='#FFF' />
                  <Text style={{ color: '#FFF' }}>{curr_menu.time}</Text>
                </View>
                <ScrollView>
                  <FlatList
                    data={curr_menu.data}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (<Text style={{ color: '#FFF' }}>- {item.name}</Text>)}
                  />
                </ScrollView>
              </View>
            </View>
          </React.Fragment>
        }
      </Modal>
    )
  }

  renderRow(item) {
    const food_name = item.menu_name
    const food_calory = item.menu_calory
    const time = item.time

    return (
      <TouchableWithoutFeedback onPress={() => this.setState({ curr_menu: item, modalVisible: true })} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <Text style={{ color: '#333' }}>{food_name.substring(0, 10) + (food_name.length > 10 ? '...' : '')}</Text>
          <Text style={{ color: '#333' }}>{food_calory} kcal</Text>
          <View style={{ flexDirection: 'row' }}>
            <Icon name='watch-later' color='#333' />
            <Text style={{ color: '#333' }}>{time}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { calory, need, histories, user } = this.state
    const username = user === null ? '' : user.username
    const userImage = user === null ? '' : user.image

    return (
      <React.Fragment>

        <NavigationEvents onWillFocus={() => this.refresh()} />

        {this.renderModal()}

        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <CustomHeader
            leftIcon='settings'
            rightIcon='exit-to-app'
            handleIcon={this.handleSetting}
            handleIconRight={this.handleLogout.bind(this)}
            text={username}
          />

          <View style={styles.image_container}>
            <Avatar
              xlarge
              rounded
              source={util.getUriImage(userImage)}
              activeOpacity={0.7}
            />
          </View>

          <View style={styles.content}>
            <Text h4 style={{ color: '#333' }}>Today's Total</Text>

            <View style={styles.content_stat}>
              <View style={styles.content_stat_item}>
                <Text h5>{calory}/{need}</Text>
                <Text>kcal</Text>
              </View>
            </View>

            <Divider style={{ backgroundColor: '#333', flex: 0.01, width: '100%' }} />

            <View style={styles.content_last_meal}>
              <Text>Today Last Meal</Text>
              <View style={{ width: '90%' }}>
                <FlatList
                  data={histories}
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item }) => this.renderRow(item)}
                  style={{ backgroundColor: '#FFF' }}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <AwesomeAlert
          show={this.state.showConfirm}
          showProgress={false}
          title={'Are you sure want to logout now ?'}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => this.setState({ showConfirm: false })}
          onConfirmPressed={() => {
            util.getToken().then(token => authService.logout(token))
            util.navigate(this.props.navigation, 'Start')
          }}
        />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: constant.BACKGROUND_COLOR,
    flex: 1
  },
  image_container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: constant.MAIN_COLOR,
  },
  content: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content_stat: {
    flexDirection: 'row',
    margin: 5,
    flex: 1
  },
  content_stat_item: {
    flex: 1,
    alignItems: 'center'
  },
  content_last_meal: {
    flex: 3,
    width: '80%',
    alignItems: 'center',
    margin: 5
  },
  image_in_modal: {
    width: 100,
    height: 100
  }
})