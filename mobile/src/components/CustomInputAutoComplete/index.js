import React from 'react';
import { Text, SearchBar } from 'react-native-elements'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import * as constant from './../../constant'

export default class CustomInputAutoComplete extends React.Component {

  constructor(props) {
    super(props);
  }

  renderRow(item) {
    return (
      <TouchableOpacity onPress={() => this.props.handleAutoComplete(item)} style={styles.row_container}>
        <Text style={styles.row}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { placeholder, value, onChangeText, data } = this.props;

    return (
      <View styles={styles.container}>
        {/* <FormInput
          placeholder={placeholder}
          containerStyle={{ padding: 5 }}
          inputStyle={{ color: '#000' }}
          placeholderTextColor='#000'
          onChangeText={onChangeText}
          value={value}
        /> */}

        <SearchBar
          lightTheme
          placeholder={placeholder}
          containerStyle={styles.searchContainer}
          inputStyle={{ backgroundColor: '#FFF' }}
          value={value}
          onChangeText={onChangeText}
        />

        <View>
          <View style={styles.autocomplete_container}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => this.renderRow(item)}
              style={{ backgroundColor: '#EEE' }}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: constant.BACKGROUND_COLOR
  },
  row: {

  },
  row_container: {
    padding: 5,
  },
  autocomplete_container: {
    position: 'absolute',
    marginLeft: 15,
    zIndex: 2
  },
  searchContainer: {
    backgroundColor: constant.MAIN_COLOR,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  }
})