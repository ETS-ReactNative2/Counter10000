import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, } from 'react-navigation';
import { Actions } from 'react-native-router-flux';
import Amount from '../components/AmountPlayerScreen/Amount';
import { connect } from 'react-redux'
import { material, human } from 'react-native-typography'

// Import Actions
import { ADD_AMOUNT_PLAYER } from '../../reducer/Actions'

import ScreenEnterPlayerNames from './ScreenEnterPlayerNames';

// Slider
import SliderAmountPlayer from '../components/SliderAmountPlayer'

// Button
import ButtonEnterNames from '../components/ButtonEnterNames'

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
    this.state = {
      value: 2,
    }
  }

  // Flux Navigator Title
  static navigationOptions = {
    title: 'Welcome',
  };

  onValueChangeSlider() {
    console.log(this.state.value);
  }
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


    return (
      <View style={styles.viewMain}>
        <View style={styles.viewTxt}>
          <Text style={[material.headline, styles.TxtHeading]}> How many players are playing today? </Text>
        </View>
        <View>
          <SliderAmountPlayer
            value={this.state.value}
            onValueChange={(value) => this.setState({ value })}
          />
        </View>
        <View style={{ paddingTop: 50 }}>
          <ButtonEnterNames
            title={'Enter the names of the player!'}
            onPress={() => { dispatch({ type: ADD_AMOUNT_PLAYER, amount: this.state.value }); Actions.names({}) }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewMain: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  viewTxt: {
    paddingBottom: 30,
    marginLeft: 10,
  },
})

function mapStateToProps(state) {

  return {
  }
}



export default connect()(ScreenAmountPlayer)