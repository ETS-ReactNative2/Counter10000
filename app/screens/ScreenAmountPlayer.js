import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import Amount from '../components/AmountPlayerScreen/Amount';
import { connect } from 'react-redux'
import { ADD_AMOUNT_PLAYER } from '../../reducer/Reducer'

import ScreenEnterPlayerNames from './ScreenEnterPlayerNames';



export function addAmountPlayer(number) {
  return {
    type: ADD_AMOUNT_PLAYER,
    number
  }
}

class ScreenAmountPlayer extends Component {

  // Standard Constructor
  constructor(props) {
    super(props);
  }

  // Flux Navigator Title
  static navigationOptions = {
    title: 'Welcome',
  };



  render() {
    // Get dispatch from props
    const { dispatch } = this.props;
    const numbers = ["2", "3", "4", "5", "6", "7", "8"];
    const btnAmount = numbers.map((number) =>
      <View
        style={styles.button}
        key={number.toString()}>
        <Button
          title={number[0]}
          onPress={() => { dispatch({ type: ADD_AMOUNT_PLAYER, amount: number[0] }); Actions.names({}) }}
        />
      </View>
    );
    //onPress= {store.dispatch("INCREMENT")}
    // onPress={() => this.props.navigation.navigate('ScreenEnterPlayerNames', {am: number[0]})}



    return (
      <View style={styles.viewMain}>
        <View style={styles.viewTxt}>
          <Text style={styles.TxtHeading}> How many players? </Text>
        </View>
        <View style={styles.viewAmount}>
          {btnAmount}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewMain: {
    flexDirection: 'column',
    flex: 7,
  },
  viewTxt: {
    //flex:0.5,
    height: 50,
  },
  viewAmount: {
    flex: 5,
    //backgroundColor: 'grey',
    justifyContent: 'space-between',
  },
  TxtHeading: {
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    padding: 10,
  }

})

function mapStateToProps(state) {

  return {
  }
}



export default connect()(ScreenAmountPlayer)