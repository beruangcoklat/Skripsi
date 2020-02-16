import React from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import * as eatService from './../../services/EatTransactionService'
import * as util from './../../util'
import CustomAlert from './../../components/CustomAlert'

export default class HistoryMonthScreen extends React.Component {

  state = {
    histories: [],
    month: -1,
    year: -1,
    showAlert: false
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    const { month, year } = params

    this.setState({ month, year })

    util.getToken().then(token => {
      eatService.history(token, month, year)
        .then(r => {
          const histories = r.data
          this.setState({ histories })

          if (histories.length === 0) {
            this.setState({ showAlert: true })
          }
        })
    })
  }

  convertDate(day) {
    const { month, year } = this.state
    return `${day}/${month}/${year}`
  }

  renderRow(item) {
    const date = this.convertDate(item.Day)

    return (
      <View style={styles.item}>
        <View style={styles.sub_item}>
          <View>
            <Text>{Number(item.Calory).toFixed(2)} kcal</Text>
          </View>
        </View>
        <View style={styles.sub_item}>
          <Text>{date}</Text>
        </View>
        <View style={styles.sub_item}>
          <TouchableOpacity style={styles.circle_button}>
            <Text>Target</Text>
            <Text>{Number(item.Target).toFixed(2)} kcal</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { histories, showAlert } = this.state

    return (
      <React.Fragment>
        <View style={styles.container}>
          <FlatList
            data={histories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => this.renderRow(item)}
            style={{ backgroundColor: '#FFF' }}
          />
        </View>
        <CustomAlert
          showAlert={showAlert}
          title={'No Data'}
          closeable={false}
          close={() => this.props.navigation.goBack()}
        />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  sub_item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle_button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 100,
  }
})