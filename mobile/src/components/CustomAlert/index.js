import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'

export default class CustomAlert extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { showAlert, title, message, close, closeable } = this.props;

    let _closable = true
    if (closeable !== undefined) _closable = closeable

    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={_closable}
        closeOnHardwareBackPress={_closable}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={close}
      />
    )
  }
}