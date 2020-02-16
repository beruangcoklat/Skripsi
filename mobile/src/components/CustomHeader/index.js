import React from 'react';
import { Header, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import * as constant from './../../constant'

export default class CustomButtonGroup extends React.Component {

  state = {
    selectedIndex: 0
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { text, leftIcon, handleIcon, rightIcon, handleIconRight } = this.props

    let iconComponent = null
    if (leftIcon !== undefined) {
      iconComponent = (
        <TouchableOpacity onPress={() => handleIcon()}>
          <Icon name={leftIcon} color='#FFF' />
        </TouchableOpacity>
      )
    }

    let iconComponentRight = null
    if (rightIcon !== undefined) {
      iconComponentRight = (
        <TouchableOpacity onPress={() => handleIconRight()}>
          <Icon name={rightIcon} color='#FFF' />
        </TouchableOpacity>
      )
    }

    return (
      <Header
        leftComponent={iconComponent}
        rightComponent={iconComponentRight}
        centerComponent={{ text, style: { color: '#FFF', fontWeight: 'bold', fontSize: 25 } }}
        outerContainerStyles={{ borderBottomWidth: 0 }}
        backgroundColor={constant.MAIN_COLOR}
      />
    );
  }
}
