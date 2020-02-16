import React from 'react'
import { NavigationEvents } from 'react-navigation'
import * as menuService from './../../../../services/MenuService'
import * as constant from './../../../../constant'
import * as util from './../../../../util'
import CustomList from './../../../../components/CustomList'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, SearchBar, Text } from 'react-native-elements'

export default class HomeFragment extends React.Component {

  state = {
    menus: [],
    page: 1,
    loading: false,
    finish: false,
    token: ''
  }

  constructor(props) {
    super(props)
    this.gotoSearch = this.gotoSearch.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.renderItem = this.renderItem.bind(this)
  }

  componentWillMount = () => util.getToken().then(token => this.setState({ token }, this.fetchData))

  fetchData = () => {
    if (this.state.finish) return

    this.setState({ loading: true })
    util.getToken().then(token => {
      menuService.getRecommendation(token, this.state.page)
        .then(r => {
          const menus = r.data
          this.setState({
            menus: [...this.state.menus, ...menus],
            loading: false,
            finish: menus.length < 10
          })
        })
        .catch(r => console.log(r))
    })
  }

  handleEnd = () => this.setState(state => ({ page: state.page + 1 }), () => this.fetchData())
  handleMenu = (item) => () => this.props.navigation.navigate('RestaurantDetail', { item })
  gotoSearch = () => this.props.navigation.navigate('SearchMenu')
  refresh = () => this.setState({ page: 1, menus: [], finish: false }, this.fetchData)

  renderItem(item) {
    const description = this.state.guest ? '' : `${item.calory} kcal (${item.eatTimes} Times Eat)`

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

  render() {
    const { loading, menus } = this.state
    const renderItem = this.renderItem
    const handleEnd = this.handleEnd
    const gotoSearch = this.gotoSearch

    return (
      <React.Fragment>

        <NavigationEvents onWillFocus={() => this.refresh()} />

        <View style={styles.container}>
          <SearchBar
            lightTheme
            onFocus={gotoSearch}
            placeholder='Food Name...'
            containerStyle={styles.searchContainer}
            inputStyle={{ backgroundColor: '#FFF' }}
          />

          {
            menus.length === 0 &&
            <View style={{ padding: 10 }}>
              <Text>No Data</Text>
            </View>
          }

          <CustomList
            loading={loading}
            horizontal={false}
            data={menus}
            renderItem={renderItem}
            onEndReached={handleEnd}
            numColumns={1}
          />


        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: constant.BACKGROUND_COLOR,
    flex: 1,
    justifyContent: 'center'
  },
  searchContainer: {
    backgroundColor: constant.MAIN_COLOR,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  }
})