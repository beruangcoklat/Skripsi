import React from 'react';
import * as constant from './../../constant'
import { StyleSheet, View, Text } from 'react-native'

export default class CustomTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props

    return (
      <View style={styles.table}>
        {
          data.map((item, index) => {
            return (
              <View style={styles.row} key={index}>
                {
                  item.map((text, index) => {
                    const cellStyle = Object.assign({}, styles.cell)
                    return (
                      <View style={cellStyle} key={index}>
                        <Text>{text}</Text>
                      </View>
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#fff'
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    // justifyContent: 'space-around'
  },
  cell: {
    flex: 1,
    padding: 10,
  }
})