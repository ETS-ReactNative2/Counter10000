import React, { Component } from 'react';
import {AppRegistry, Platform,  StyleSheet, Text, View, Button} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import {Actions} from 'react-native-router-flux';
import Amount from '../components/AmountPlayerScreen/Amount';


import ScreenEnterPlayerNames from './ScreenEnterPlayerNames';



export function addAmountPlayer(number) {
  return {
    type: ADD_AMOUNT_PLAYER,
    number
  }
}


export default class ScreenAmountPlayer extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
      title: 'Welcome',
    };

    onPressAmountPlayer(amountOfPlayer){
      console.log(amountOfPlayer);
     // () => this.props.navigation.navigate('ScreenEnterPlayerNames', {am: amountOfPlayer});
    };

  render() {
//onPress={() => this.onPressAmountPlayer(number[0])}
  // Amount
    const numbers= ["2","3","4","5","6","7","8"];
    const btnAmount = numbers.map((number) =>
      <View
        style={styles.button}
        key ={number.toString()}>
        <Button
          title={number[0]}
          onPress={() => Actions.names({am: number[0]})}
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
    flex:7,
  },
  viewTxt: {
    //flex:0.5,
    height:50,
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

AppRegistry.registerComponent('ScreenAmountPlayer', () => ScreenAmountPlayer);
