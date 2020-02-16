import React from 'react';
import { FormLabel } from 'react-native-elements';

export default class CustomLabel extends React.Component {

  constructor(props) {
    super(props)
  }

  getSize(size) {
    if (size == 'big') return 30;
    else if (size == 'normal') return 13;
  }

  render() {
    const { text, fontSize } = this.props;
    return (
      <FormLabel
        labelStyle={{
          fontSize: this.getSize(fontSize)
        }}>
        {text}
      </FormLabel>
    );
  }
}
