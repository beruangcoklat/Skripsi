import React from 'react';
import { FormInput } from 'react-native-elements'

export default class CustomInput extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { placeholder, onChangeText, secureTextEntry, onFocus, color, value } = this.props;

    let _color = '#FFF', _placeholderColor = '#FFF'
    if (color !== undefined) {
      const split = color.split('_')
      _color = split[0]
      _placeholderColor = split[1]
    }

    return (
      <FormInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        containerStyle={{ padding: 5 }}
        inputStyle={{ color: _color }}
        placeholderTextColor={_placeholderColor}
        onChangeText={onChangeText}
        onFocus={onFocus}
        value={value}
      />
    )
  }
}
