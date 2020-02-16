import React from 'react'
import * as restaurantService from './../../services/RestaurantService'
import * as menuService from './../../services/MenuService'
import * as eatService from './../../services/EatTransactionService'
import * as util from './../../util'
import * as constant from './../../constant'
import CustomList from './../../components/CustomList'
import CustomButton from './../../components/CustomButton'
import CustomAlert from './../../components/CustomAlert'
import { Card, Text } from 'react-native-elements'
import { View, StyleSheet, ImageBackground, Modal, Image } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'

export default class RestaurantDetailFragment extends React.Component {

  state = {
    token: '',
    restaurant: null,
    menus: [],
    page: 1,
    last_page: 2,
    loading: false,
    showConfirm: false,
    modalVisible: false,
    curr_menu: null,
    showAlert: false,
    titleAlert: '',
    messageAlert: '',
    menu_id: -1,
    max: 0
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.eat = this.eat.bind(this)
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    const restaurant_id = params.item.restaurant_id
    const menu_id = params.item.id

    this.setState({ menu_id })
    util.getToken().then(token => this.setState({ token }, () => {
      eatService.todayStatistic(token).then(r => {
        const { done, need } = r.data
        this.setState({ max: need - done })
      })
    }))

    restaurantService.find(restaurant_id).then(r => this.setState({ restaurant: r.data }))
    menuService.getByRestaurantId(restaurant_id, this.state.page, menu_id)
      .then(r => {
        const { data, last_page } = r.data
        this.setState({ last_page, menus: data })
      })
  }

  renderItem(item) {
    const showModal = () => this.setState({ modalVisible: true, curr_menu: item })
    const text = 'I Eat This!'

    return (
      <React.Fragment>
        {
          item.dummy === undefined &&
          <View style={{ width: '50%' }}>
            <Card image={util.getUriImage(item.image)} resizeMode='stretch' containerStyle={{ padding: 10 }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ marginBottom: 10 }}>{item.name}</Text>
                <Text style={{ marginBottom: 10 }}>{item.calory} kcal</Text>
                <CustomButton
                  text={text}
                  onPress={showModal}
                  backgroundColor='#D4302E'
                />
              </View>
            </Card>
          </View>
        }

        {
          item.dummy !== undefined &&
          <View style={{ width: '50%' }}>
          </View>
        }
      </React.Fragment>
    )
  }

  eat() {
    const { curr_menu, token } = this.state
    const menu_id = curr_menu.id

    eatService.insert(token, menu_id)
      .then(() => {
        this.setState({
          showAlert: true,
          titleAlert: 'Success',
          messageAlert: 'Thanks'
        })
      })
      .catch(() => {
        this.setState({
          showAlert: false,
          titleAlert: 'Error',
          messageAlert: 'Server Error'
        })
      })
      .then(() => this.setState({ modalVisible: false }))
  }

  renderModal() {
    const { modalVisible, curr_menu, max } = this.state
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
          modalReady &&
          <React.Fragment>
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.8)' }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                <View style={{ margin: 10 }}>
                  <Image source={util.getUriImage(curr_menu.image)} style={styles.image_in_modal} resizeMode='stretch' />
                </View>
                <View style={{ margin: 10, flexWrap: "wrap", width: '60%' }}>
                  <Text style={{ color: '#FFF' }}>{curr_menu.name}</Text>
                  <Text style={{ color: '#FFF' }}>{curr_menu.calory} kcal</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                <React.Fragment>
                  <Text style={{ margin: 10, color: '#FFF' }}>Are you eating this ?</Text>
                  <CustomButton
                    text='Yes'
                    backgroundColor='#D4302E'
                    onPress={() => {
                      if (curr_menu.calory > max)
                        this.setState({ showConfirm: true, modalVisible: false })
                      else
                        this.eat()
                    }}
                  />
                </React.Fragment>
              </View>
            </View>
          </React.Fragment>
        }
      </Modal>
    )
  }

  fetchData = () => {
    const { page, last_page, restaurant, menu_id } = this.state
    if (page > last_page) return

    this.setState({ loading: true })
    menuService.getByRestaurantId(restaurant.id, page, menu_id)
      .then(r => {
        const { data, last_page } = r.data
        this.setState({
          last_page,
          menus: [...this.state.menus, ...data],
          loading: false
        })
      })
      .catch(r => console.log(r))
  }

  handleEnd = () => this.setState(state => ({ page: state.page + 1 }), () => this.fetchData())

  render() {
    const { loading, menus, showAlert, titleAlert, messageAlert } = this.state
    const renderItem = this.renderItem
    const handleEnd = this.handleEnd
    let { restaurant } = this.state
    restaurant === null && (restaurant = {})

    const close = () => this.setState({ showAlert: false })

    return (
      <View style={styles.container}>
        {
          this.state.restaurant !== null &&
          <React.Fragment>

            {this.renderModal()}

            <ImageBackground
              source={util.getUriImage(restaurant.image)}
              style={styles.image_background}
              resizeMode='stretch'
              blurRadius={2}
            >
              <View style={styles.overlay}>
                <Text h3 style={styles.resto_name}>{restaurant.name}</Text>
              </View>
            </ImageBackground>

            <View style={{ flex: 2 }}>
              <CustomList
                loading={loading}
                horizontal={false}
                data={menus}
                renderItem={renderItem}
                onEndReached={handleEnd}
                numColumns={2}
              />
            </View>
          </React.Fragment>
        }

        <CustomAlert
          showAlert={showAlert}
          title={titleAlert}
          message={messageAlert}
          close={close}
        />

        <AwesomeAlert
          show={this.state.showConfirm}
          showProgress={false}
          title={'Are you sure want to eat ?'}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => this.setState({ showConfirm: false })}
          onConfirmPressed={() => this.setState({ showConfirm: false }, () => setTimeout(this.eat, 1000))}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.BACKGROUND_COLOR
  },
  image_background: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  resto_name: {
    color: '#FFF'
  },
  image_in_modal: {
    width: 100,
    height: 100
  }
})