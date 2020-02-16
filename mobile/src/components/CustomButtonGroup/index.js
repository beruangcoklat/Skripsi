import React from 'react';
import { ButtonGroup } from 'react-native-elements'

export default class CustomButtonGroup extends React.Component {

  state = {
    selectedIndex: 0
  }

  constructor(props) {
    super(props);
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    this.props.onPress(this.props.buttons[selectedIndex]);
  }

  render() {
    const { selectedIndex } = this.state
    const { buttons } = this.props;
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
      />
    );
  }
}
