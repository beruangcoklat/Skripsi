import React from 'react'
import AwesomeAlert from 'react-native-awesome-alerts'

export default class CustomAlert extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { show } = this.props;

    return (
      <AwesomeAlert
        show={show}
        showProgress={true}
        title={'Loading'}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />
    )
  }
}


// DEPRECATED
// import React from 'react';
// import { StyleSheet, View } from 'react-native'
// import Spinner from 'react-native-loading-spinner-overlay'
// export default class CustomLoadingIndicator extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <View style={{ display: 'flex' }}>
//         <Spinner
//           visible={this.props.show}
//           textContent={'Loading...'}
//           textStyle={styles.spinnerTextStyle}
//         />
//       </View>
//     )
//   }
// }
// const styles = StyleSheet.create({
//   spinnerTextStyle: {
//     color: '#FFF'
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5
//   }
// })