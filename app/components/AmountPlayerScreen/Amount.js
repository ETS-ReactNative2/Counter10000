import React, { Component } from 'react';
import {AppRegistry, Platform,  StyleSheet, Text, View, Button, Alert} from 'react-native';
import {StackNavigator,} from 'react-navigation';

import ScreenEnterPlayerNames from '../../screens/ScreenEnterPlayerNames';

export default class Amount extends Component {

  constructor(props) {
    super(props);
  }

  onPressAmountPlayer(amountOfPlayer){
    console.log(amountOfPlayer);
    () => this.props.navigation.navigate('ScreenEnterPlayerNames');
  };
  render() {
    const numbers= ["2","3","4","5","6","7","8"];
    const btnAmount = numbers.map((number) =>
      <View
        style={styles.button}
        key ={number.toString()}>
        <Button
          title={number[0]}
          onPress={() => this.onPressAmountPlayer(number[0])}

        />
      </View>
    );
    return (
      <View style={styles.button}>
        {btnAmount}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'column',
  }
})

AppRegistry.registerComponent('Amount', () => Amount);
