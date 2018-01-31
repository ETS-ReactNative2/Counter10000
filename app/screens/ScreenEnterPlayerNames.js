import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, ScrollView, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'

import Amount from '../components/AmountPlayerScreen/Amount';
import { ADD_PLAYER_NAME } from '../../reducer/Actions'
import PropTypes from 'prop-types';


export function addPlayerName(playerNumber, playerName) {
  return {
    type: ADD_PLAYER_NAME,
    playerNumber,
    playerName,
  }
}

class ScreenEnterPlayerNames extends Component {

  constructor(props) {
    super(props);
    this.state = {amountOfPlayer: this.props.playerAmount}
  }

  static navigationOptions = {
    title: 'Player Names',
  };

  onPressStartTheGame() {
    console.log("Pushed button Start the Game!")
    const {players, playerAmount} = this.props;
    console.log(players)
    Keyboard.dismiss()
    Actions.playScreen({})

  }


  render() {
    const { playerAmount } = this.props;
    var textBoxes = [];
    for (var i = 0; i < this.state.amountOfPlayer; i++) {
      var placeholderText = 'Player ' + (i + 1);
      const key = i + 1;
      textBoxes.push(
        <TextInput
          key={key}
          onChangeText={(text) => { this.props.dispatch({ type: ADD_PLAYER_NAME, playerNumber: key, playerName: text }) }}
          placeholder={placeholderText}
          placeholderTextColor="grey"
          autoCapitalize='words'
        >
        </TextInput>

      );
    }

    const btnStartGame =
      <View>
        <Button
          title="Start the Game!"
          onPress={() => this.onPressStartTheGame()}
        />
      </View>

    return (
      <View style={styles.viewMain}>
        <View style={styles.viewTxt}>
          <Text style={styles.TxtHeading}>
            Please enter the names in sequence.
          </Text>
        </View>
        <ScrollView style={styles.viewTextBox}>
          {textBoxes}
        </ScrollView>

        <View style={styles.viewButton}>
          <Button
            title='Start the Game!'
            onPress={this.onPressStartTheGame.bind(this)}
          />
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
    //backgroundColor: 'red',
    justifyContent: 'center',
  },
  TxtHeading: {
    fontSize: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  viewTextBox: {
    flex: 5,
    backgroundColor: 'grey',
  },
  viewButton: {
    //flex: 0.5,
    //backgroundColor: 'blue',
    height: 100,
    justifyContent: 'center',
  },
  viewTextBox: {
    flexDirection: 'column',
    flex: 5
  },

})

ScreenEnterPlayerNames.propTypes = {
  players: PropTypes.array.isRequired
}

// Maps the state to the local props. Therefore I can access it in these functions for example
function mapStateToProps(state) {

  return {
    playerAmount: state.number,
    //players: state.playerIDs.map(id => state.player[id]) || []
  }
}

export default connect(mapStateToProps)(ScreenEnterPlayerNames)