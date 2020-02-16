import React from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native'

export default class CustomList extends React.Component {

  constructor(props) {
    super(props)
    this.renderFooter = this.renderFooter.bind(this)
  }

  renderFooter = (loading) => {
    return <View>
      {
        !loading
          ? null
          : <ActivityIndicator size="large" animating />
      }
      <View style={{ height: 150 }}></View>
    </View>
  }

  render() {
    const { horizontal, onEndReached, renderItem, data, loading, numColumns } = this.props
    const containerStyle = numColumns > 1 ? styles.container : null

    if (numColumns > 1 && data.length % 2 === 1) {
      data.push({ dummy: true })
    }

    return (
      <FlatList
        contentContainerStyle={containerStyle}
        horizontal={horizontal}
        data={data}
        numColumns={numColumns}
        renderItem={({ item }) => (renderItem(item))}
        onEndReached={onEndReached}
        ListFooterComponent={this.renderFooter(loading)}
        onEndReachedThreshold={1}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})