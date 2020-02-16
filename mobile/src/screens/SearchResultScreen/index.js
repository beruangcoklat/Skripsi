import React from 'react'
import * as menuService from './../../services/MenuService'
import * as searchHistoryService from './../../services/SearchHistoryService'
import * as constant from './../../constant'
import * as util from './../../util'
import CustomList from './../../components/CustomList'
import CustomAlert from './../../components/CustomAlert'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Text } from 'react-native-elements'

export default class SearchResultScreen extends React.Component {

  state = {
    token: '',
    menus: [],
    page: 1,
    last_page: 2,
    loading: false,

    showAlert: false,
    titleAlert: ''
  }

  constructor(props) {
    super(props)
    this.handleMenu = this.handleMenu.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentWillMount = () => util.getToken().then(token => this.setState({ token }, this.fetchData))

  fetchData = () => {
    if (this.state.page > this.state.last_page) return
    this.setState({ loading: true })

    const { page, token } = this.state
    menuService.getSearchAll(token, this.props.navigation.state.params.keyword, page)
      .then(r => {
        const menus = r.data.data
        const last_page = r.data.last_page
        if (menus.length === 0) {
          this.setState({
            showAlert: true,
            titleAlert: 'No Data'
          })
          return
        }
        this.setState({
          menus: [...this.state.menus, ...menus],
          last_page,
          loading: false
        })
      })
      .catch(r => console.log(r))
  }

  handleEnd = () => this.setState(state => ({ page: state.page + 1 }), () => this.fetchData())
  handleMenu = (item) => () => {
    const { token } = this.state
    const menu_category_id = item.menu_category_id
    const keyword = this.props.navigation.state.params.keyword
    searchHistoryService.insert(token, menu_category_id, keyword)
    this.props.navigation.navigate('RestaurantDetail', { item })
  }

  renderItem(item) {
    const description = `${item.calory} kcal (${item.eatTimes} Times Eat)`
    return (
      <TouchableOpacity onPress={this.handleMenu(item)}>
        <Card
          image={util.getUriImage(item.image)}
          imageProps={{ resizeMode: 'stretch' }}>
          <View style={{ alignItems: 'center' }}>
            <Text>{item.name}</Text>
            <Text>{description}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }

  refresh() {
    const data = {
      page: 1,
      last_page: 2,
      menus: []
    }
    this.setState(data, this.fetchData)
  }

  render() {
    const { loading, menus, showAlert, titleAlert } = this.state
    const renderItem = this.renderItem
    const handleEnd = this.handleEnd
    const close = () => {
      this.setState({ showAlert: false })
      this.props.navigation.goBack()
    }

    return (
      <React.Fragment>
        <View style={styles.container}>
          <CustomList
            loading={loading}
            horizontal={false}
            data={menus}
            renderItem={renderItem}
            onEndReached={handleEnd}
            numColumns={1}
          />
        </View>
        <CustomAlert
          showAlert={showAlert}
          title={titleAlert}
          close={close}
        />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: constant.BACKGROUND_COLOR
  }
})