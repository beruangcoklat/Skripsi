import React from 'react';
import * as constant from './../../constant'
import { Button } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'

export default class CustomButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { text, onPress, backgroundColor } = this.props;
    const bc = backgroundColor === undefined ? constant.MAIN_COLOR : backgroundColor

    return (
      <Button
        backgroundColor={bc}
        buttonStyle={styles.buttonStyle}
        onPress={() => onPress()}
        title={text} />
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 5,
    borderRadius: 5
  }
})