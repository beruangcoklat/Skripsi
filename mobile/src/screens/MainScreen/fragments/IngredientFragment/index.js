import React from 'react'
import { ScrollView, View, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { ListItem, Text } from 'react-native-elements'
import * as constant from '../../../../constant'
import * as util from '../../../../util'
import * as ingredientService from './../../../../services/IngredientService'
import * as eatService from './../../../../services/EatTransactionService'
import CustomInputAutoComplete from './../../../../components/CustomInputAutoComplete'
import CustomLoadingIndicator from './../../../../components/CustomLoadingIndicator'
import CustomButton from './../../../../components/CustomButton'
import CustomAlert from './../../../../components/CustomAlert'
import AwesomeAlert from 'react-native-awesome-alerts'

export default class IngredientFragment extends React.Component {

  state = {
    token: '',
    loading: false,
    modalVisible: false,

    showAlert: false,
    titleAlert: '',
    messageAlert: '',
    showConfirm: false,
    max: 0,

    ingredient_name: '',
    ingredients: [],

    modal_ingredient: null,

    results: []
  }

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.updateIngredientName = this.updateIngredientName.bind(this)
    this.handleAutoComplete = this.handleAutoComplete.bind(this)
  }

  componentWillMount = () => {
    util.getToken().then(token => this.setState({ token }, () => {
      eatService.todayStatistic(token).then(r => {
        const { done, need } = r.data
        this.setState({ max: need - done })
      })
    }))
  }

  updateIngredientName(ingredient_name) {
    if (ingredient_name.trim().length <= 0) {
      this.setState({ ingredient_name, ingredients: [] })
      return
    }

    this.setState({ ingredient_name })
    ingredientService.search(ingredient_name)
      .then(r => {
        if (this.state.ingredient_name.trim().length <= 0) return
        this.setState({ ingredients: r.data })
      })
  }

  handleAutoComplete(item) {
    this.setState({
      ingredients: [],
      ingredient_name: '',
      results: [...this.state.results, Object.assign({}, item)]
    })
  }

  renderModal() {
    const { modalVisible, modal_ingredient, results } = this.state
    const toggleModal = () => this.setState({ modalVisible: !modalVisible })
    const removeResult = () => {
      results.splice(results.indexOf(modal_ingredient), 1)
      this.setState({
        modalVisible: false,
        modal_ingredient: null,
        results
      })
    }
    const modalReady = modal_ingredient !== null

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        {
          modalReady &&
          <React.Fragment>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ margin: 10, flexWrap: "wrap" }}>
                <Text style={{ color: '#FFF' }}>{modal_ingredient.name}</Text>
                <Text style={{ color: '#FFF' }}>{modal_ingredient.calory} kcal</Text>
                <Text style={{ color: '#FFF' }}>{modal_ingredient.size}</Text>
                <CustomButton
                  text={'Delete'}
                  onPress={removeResult}
                  backgroundColor='#D4302E'
                />
              </View>
            </View>
          </React.Fragment>
        }
      </Modal>
    )
  }

  renderRow(item) {
    return (
      <TouchableOpacity onPress={() => this.setState({ modal_ingredient: item, modalVisible: true })}>
        <ListItem
          title={item.name}
          subtitle={`${item.calory} kcal - ${item.size}`}
        />
      </TouchableOpacity>
    )
  }

  submit() {
    const { results, token } = this.state
    if (results.length === 0) {
      this.setState({
        showAlert: true,
        titleAlert: 'Error',
        messageAlert: 'No Data',
      })
      return
    }

    const dto = results.map(i => i.id)
    this.setState({ loading: false })
    eatService.insertIngredients(token, JSON.stringify(dto))
      .then(() => {
        this.setState({
          showAlert: true,
          titleAlert: 'Success',
          messageAlert: 'Thanks'
        })
      })
      .catch(r => {
        this.setState({
          showAlert: true,
          title: 'Error',
          messageAlert: 'Server error'
        })
      })
      .then(() => this.setState({ results: [], loading: false }))
  }

  render() {
    const { loading, showAlert, titleAlert, messageAlert, ingredient_name, ingredients, results, max } = this.state
    const closeAlert = () => this.setState({ showAlert: false })

    return (
      <React.Fragment>
        {this.renderModal()}

        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: constant.BACKGROUND_COLOR }}>
          <CustomInputAutoComplete
            placeholder='Ingredient Name...'
            value={ingredient_name}
            onChangeText={this.updateIngredientName}
            data={ingredients}
            handleAutoComplete={this.handleAutoComplete}
          />

          <ScrollView style={styles.result_list}>
            <FlatList
              data={results}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => this.renderRow(item)}
              style={{ backgroundColor: constant.BACKGROUND_COLOR }}
            />
            {
              results.length === 0 && <Text>No Data</Text>
            }
          </ScrollView>

          <CustomButton text='Submit' onPress={() => {
            let total_calory = 0
            results.forEach(i => total_calory += i.calory)
            if (total_calory > max) {
              this.setState({ showConfirm: true })
              return
            }
            this.submit()
          }} />
        </View>

        <CustomAlert
          showAlert={showAlert}
          title={titleAlert}
          message={messageAlert}
          close={closeAlert}
        />

        <CustomLoadingIndicator show={loading} />

        <AwesomeAlert
          show={this.state.showConfirm}
          showProgress={false}
          title={'Are you sure want to eat ?'}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => this.setState({ showConfirm: false })}
          onConfirmPressed={() => this.setState({ showConfirm: false }, () => setTimeout(this.submit, 1000))}
        />
      </React.Fragment>
    )
  }

}

const styles = StyleSheet.create({
  result_list: {
    padding: 10
  }
})