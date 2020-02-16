import React from 'react'
import * as constant from './../../../../constant'
import CustomButton from './../../../../components/CustomButton'
import { View, StyleSheet } from 'react-native'
import CustomHeader from './../../../../components/CustomHeader'
import { MonthSelectorCalendar } from './../../../../components/react-native-month-selector'
import moment from 'moment'

export default class HistoryFragment extends React.Component {

  state = {
    histories: [],
    page: 1,
    last_page: 2,
    loading: false,
    token: '',
    user: null,
    date: moment()
  }

  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const date = moment(this.state.date)
    const month = date.month() + 1
    const year = date.year()

    this.props.navigation.navigate('HistoryMonth', { month, year })
  }

  render() {
    const { date } = this.state
    const handleClick = () => this.handleClick()
    const updateDate = (date) => this.setState({ date })

    return (
      <View style={styles.container}>
        <CustomHeader text='Meal History' />

        <MonthSelectorCalendar
          selectedDate={date}
          monthTapped={updateDate}
          selectedBackgroundColor={constant.MAIN_COLOR}
        />

        <CustomButton text='View' onPress={handleClick} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1
  }
})