import React, { Component } from 'react';
import { AppRegistry, Platform, StyleSheet, Text, View, TextInput, Button, ScrollView, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Amount from '../components/AmountPlayerScreen/Amount';
import { ADD_PLAYER_NAME } from '../../reducer/Actions';
import PropTypes from 'prop-types';
import { material, human } from 'react-native-typography';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


class ScreenEnterPlayerNames extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amountOfPlayer: this.props.playerAmount,
      errors: [{}]

    }
  }

  static navigationOptions = {
    title: 'Player Names',
  };

  componentDidMount() {
    this.setState({ errors: [] })
  }

  onPressStartTheGame() {
    console.log("Pushed button Start the Game!")
    const { players, playerAmount } = this.props;
    this.setState({ errors: [] })
    var validationOK = this.validateForms();
    if (validationOK) {
      Keyboard.dismiss()
      Actions.playScreen({})
    }
  }

  validateForms() {
    var arr = [];

    const { players, playerAmount } = this.props;
    for (var i = 0; i < playerAmount; i++) {
      console.log('i ist: ' + i);

      if (!players[i]) {
        console.log('Player is empty')
        arr.push(i)
      }
    }
    this.setState({ errors: arr })
    console.log('Arr' + arr)

    if (arr.length > 0) {
      console.log('State > 0 ')
    } else {
      Keyboard.dismiss()
      Actions.playScreen({})
    }
  }

  onChangeEnterNames(text, key) {
    console.log('in function onchangeenternames');
    console.log('text is:' + text);
    console.log('key is: ' + key);
    this.props.dispatch({ type: ADD_PLAYER_NAME, playerNumber: key + 1, playerName: text })
    this.setState({ playerName: text })
  }



  render() {
    console.log(this.state.errors)
    const { playerAmount } = this.props;
    var textBoxes = [];
    for (var i = 0; i < this.state.amountOfPlayer; i++) {
      var placeholderText = 'Player ' + (i + 1);
      // Key is same like playerIDs 
      const key = i;
      textBoxes.push(
        <View key={'View' + key}>
          <FormLabel key={'formLabel' + key}>{placeholderText}</FormLabel>
          <FormInput
            key={key}
            onChangeText={(text) => this.onChangeEnterNames(text, key)}
            placeholderTextColor="grey"
            autoCapitalize='words'
            onBlur={() => this.setState({ playerName: '' })}
          >
          </FormInput>
          {this.state.errors.includes(key) &&
            <FormValidationMessage key={'FormValidationMessage' + key}>
              Player name is requirred!
            </FormValidationMessage>
          }
        </View>
      );
    }
    //            onChangeText={(text) => { this.props.dispatch({ type: ADD_PLAYER_NAME, playerNumber: key + 1, playerName: text }) }}

    const btnStartGame =
      <Button
        title='Start the Game!'
        onPress={this.validateForms.bind(this)}
      />

    return (
      <View style={styles.viewMain}>
        <View style={styles.viewTxt}>
          <Text style={[material.headline, styles.TxtHeading]}>
            Please enter the names in sequence.
          </Text>

        </View>
        <ScrollView style={styles.viewTextBox}>
          {textBoxes}
        </ScrollView>

        <View style={styles.viewButton}>
          {btnStartGame}
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
    height: 50,
    justifyContent: 'center',
  },
  TxtHeading: {
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  viewTextBox: {
    flex: 5,
  },
  viewButton: {

    height: 100,
    justifyContent: 'center',
  },


})

ScreenEnterPlayerNames.propTypes = {
  players: PropTypes.array.isRequired
}

// Maps the state to the local props. Therefore I can access it in these functions for example
function mapStateToProps(state) {

  return {
    playerAmount: state.number,
    players: state.playerIDs.map(id => state.player[id]) || []
  }
}

export default connect(mapStateToProps)(ScreenEnterPlayerNames)