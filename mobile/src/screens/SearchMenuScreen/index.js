import React from 'react'
import * as menuService from './../../services/MenuService'
import * as searchHistoryService from './../../services/SearchHistoryService'
import * as constant from './../../constant'
import * as util from './../../util'
import { View, FlatList, StyleSheet } from 'react-native'
import { SearchBar, ListItem } from 'react-native-elements'

export default class HomeFragment extends React.Component {

  state = {
    search: '',
    menus: [],
    search_bar: null,
    token: ''
  }

  constructor(props) {
    super(props)
    this.onChangeText = this.onChangeText.bind(this)
    this.handleMenu = this.handleMenu.bind(this)
    this.doSearch = this.doSearch.bind(this)
  }

  componentDidMount() {
    setTimeout(() => this.refs.search_bar.focus(), 1)
    util.getToken().then(token => this.setState({ token }))
  }

  onChangeText(search) {
    this.setState({ search })
    if (search.trim().length === 0) {
      this.setState({
        search,
        menus: []
      })
      return
    }

    menuService.getSearch(search.trim())
      .then(r => {
        if (this.state.search.trim().length === 0) return
        this.setState({ menus: r.data })
      })
  }

  doSearch = () => this.props.navigation.navigate('SearchResult', { keyword: this.state.search })

  handleMenu = (item) => () => {
    const { token, search } = this.state
    const menu_id = item.id
    searchHistoryService.insert(token, menu_id, search)
    this.props.navigation.navigate('RestaurantDetail', { item })
  }

  renderRow(item) {
    const subtitle = `${item.calory} kcal`
    return (
      <ListItem
        roundAvatar
        title={item.name}
        subtitle={subtitle}
        avatar={util.getUriImage(item.image)}
        containerStyle={styles.cardStyle}
        onPress={this.handleMenu(item)}
      />
    )
  }

  render() {
    const { menus } = this.state

    return (
      <View style={styles.container}>
        <SearchBar
          ref='search_bar'
          lightTheme
          onChangeText={this.onChangeText}
          placeholder='Food Name...'
          containerStyle={styles.searchContainer}
          inputStyle={{ backgroundColor: '#FFF' }}
          onSubmitEditing={this.doSearch}
        />
        <FlatList
          data={menus}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => this.renderRow(item)}
          style={{ backgroundColor: '#FFF' }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  searchContainer: {
    backgroundColor: constant.MAIN_COLOR,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  cardStyle: {
    backgroundColor: '#FFF'
  }
})